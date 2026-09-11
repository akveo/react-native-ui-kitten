/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FlexStyle,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
  Modal as RNModal,
  ModalProps as ReactNativeModalProps,
} from 'react-native';
import {
  Frame,
  MeasureElement,
  MeasuringElement,
  Point,
} from '../../devsupport';
import { ModalService } from '../../theme';
import { Backdrop, BackdropPresentingConfig } from '../../theme/backdrop/backdrop.component';
import { MappingContext } from '../../theme/mapping/mappingContext';
import { ThemeContext } from '../../theme/theme/themeContext';
import { ThemeStoreContext } from '../../theme/theme/themeStore';
import {
  ModalPanelContext,
  ModalPanelItemContext,
  ModalPanelOutlet,
} from '../../theme/modal/modalPanel.component';

export type RNModalProps =
  Pick<ReactNativeModalProps, 'animationType' | 'hardwareAccelerated' | 'supportedOrientations' | 'onShow'>;

export interface ModalProps extends ViewProps, BackdropPresentingConfig, RNModalProps {
  visible?: boolean;
  shouldUseContainer?: boolean;
  /**
   * Render the native modal at the call site instead of through the `ApplicationProvider` panel.
   * Keeps every React context of the call site visible to the content, at the cost of the
   * content staying a React descendant of the enclosing list (first tap dismisses the keyboard).
   * Modals nested inside an inline modal render inline as well.
   */
  renderInline?: boolean;
  children?: React.ReactNode;
}

export type ModalElement = React.ReactElement<ModalProps>;

/**
 * A wrapper that presents content above an enclosing view.
 *
 * @extends React.FC
 *
 * @property {ReactNode} children - Component to render within the modal.
 *
 * @property {boolean} visible - Whether component is visible.
 * Defaults to false.
 *
 * @property {boolean} shouldUseContainer - Whether children should be wrapped into absolute positioned container.
 * Defaults to true.
 *
 * @property {boolean} renderInline - Whether the native modal is rendered at the call site instead of through the
 * root panel provided by `ApplicationProvider`. By default the content is presented from the root of the app,
 * so it is no longer a React descendant of the enclosing `ScrollView` and the first tap on it is never used to
 * dismiss the keyboard. This also means React contexts provided *below* `ApplicationProvider` are not visible
 * inside the modal; wrap the content in those providers, move them above `ApplicationProvider`, or set
 * `renderInline` to keep the previous behaviour for a given modal. Use it as well for a modal whose anchor is
 * inside your own React Native `Modal` (or wrap that modal's content in a nested `ApplicationProvider`),
 * because iOS presents a single chain of modals.
 * Defaults to false.
 *
 * @property {boolean} hardwareAccelerated - Controls whether to force hardware acceleration for the underlying window.
 * Defaults to false.
 *
 * @property {'none' | 'slide' | 'fade'} animationType - Controls how the modal animates.
 * Defaults to 'none'.
 *
 * @property {Array<'portrait' | 'portrait-upside-down' | 'landscape' | 'landscape-left' | 'landscape-right'>}
 * supportedOrientations -
 * Allows the modal to be rotated to any of the specified orientations.
 * On iOS, the modal is still restricted by what's specified
 * in your app's Info.plist's UISupportedInterfaceOrientations field
 *
 * @property {() => void} onBackdropPress - Called when the modal is visible and the view below it was touched.
 * Useful when needed to close the modal on outside touches.
 *
 * @property {(event: NativeSyntheticEvent<any>) => void} onShow -
 * Allows passing a function that will be called once the modal has been shown.
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Style of backdrop.
 *
 * @property {string} backdropAccessibilityLabel - Accessible name for the dismissable backdrop.
 * When omitted, the backdrop is hidden from assistive technology.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example ModalSimpleUsage
 * Modals accept content views as child elements and are displayed in the screen center.
 * To display a modal, a `visible` property should be used.
 *
 * @overview-example ModalWithBackdrop
 * To configure underlying view, `backdropStyle` and `onBackdropPress` properties may be used.
 */
let didWarnMissingPanel = false;

export const Modal: React.FC<ModalProps> = ({
  style,
  visible = false,
  shouldUseContainer = true,
  renderInline = false,
  children,
  backdropStyle,
  backdropAccessibilityLabel,
  onBackdropPress,
  animationType,
  hardwareAccelerated,
  supportedOrientations,
  onShow,
  ...viewProps
}) => {
  const [contentPosition, setContentPosition] = useState<Point>(Point.outscreen());
  const [forceMeasure, setForceMeasure] = useState(false);
  const prevVisibleRef = useRef(visible);

  const registry = useContext(ModalPanelContext);
  const parentItem = useContext(ModalPanelItemContext);
  const mapping = useContext(MappingContext);
  const theme = useContext(ThemeContext);
  const themeStore = useContext(ThemeStoreContext);
  const id = useId();
  const usePanel = !!registry && !renderInline;
  const itemContextValue = useMemo(() => ({ id }), [id]);

  if (registry === undefined && !renderInline && !didWarnMissingPanel && process.env.NODE_ENV !== 'production') {
    didWarnMissingPanel = true;
    console.warn(
      'Modal is rendered without an ApplicationProvider above it, so it falls back to rendering ' +
      'the native modal at the call site. Its content stays a React descendant of the enclosing ' +
      'ScrollView, whose first tap dismisses the keyboard instead of reaching the content. Wrap the ' +
      'app in ApplicationProvider, or pass renderInline to silence this warning.',
    );
  }

  useEffect(() => {
    if (!visible) {
      setContentPosition(Point.outscreen());
    }
  }, [visible]);

  useEffect(() => {
    if (visible && !forceMeasure) {
      setForceMeasure(true);
    }
    prevVisibleRef.current = visible;
  }, [visible, forceMeasure]);

  const contentFlexPosition = useMemo((): FlexStyle => {
    const derivedStyle: ViewStyle = StyleSheet.flatten(style || {});
    const { x: centerX, y: centerY } = contentPosition;
    return { left: derivedStyle.left || centerX, top: derivedStyle.top || centerY };
  }, [style, contentPosition]);

  const onContentMeasure = useCallback((contentFrame: Frame): void => {
    const displayFrame: Frame = contentFrame.centerOf(Frame.window());
    setContentPosition(displayFrame.origin);
  }, []);

  const renderContentElement = (): React.ReactElement<ViewProps> => {
    return (
      <View
        // Scopes VoiceOver to the modal contents on iOS, and emits
        // `aria-modal` on the web. Android already gets this from the
        // underlying native modal window.
        aria-modal={true}
        onAccessibilityEscape={onBackdropPress}
        {...viewProps}
        style={[style, styles.modalView, contentFlexPosition]}
      >
        {children}
      </View>
    );
  };

  const renderMeasuringContentElement = (): MeasuringElement => {
    return (
      <MeasureElement
        shouldUseTopInsets={ModalService.getShouldUseTopInsets}
        onMeasure={onContentMeasure}
      >
        {renderContentElement()}
      </MeasureElement>
    );
  };

  const renderRNModal = (): React.ReactElement => {
    const content = shouldUseContainer ? renderMeasuringContentElement() : children;

    return (
      <RNModal
        transparent={true}
        visible={visible}
        supportedOrientations={supportedOrientations}
        statusBarTranslucent={ModalService.getShouldUseTopInsets}
        animationType={animationType}
        hardwareAccelerated={hardwareAccelerated}
        onRequestClose={onBackdropPress}
        onShow={onShow}
      >
        {usePanel ? (
          <ModalPanelItemContext.Provider value={itemContextValue}>
            <Backdrop
              visible={visible}
              backdropStyle={backdropStyle}
              backdropAccessibilityLabel={backdropAccessibilityLabel}
              onBackdropPress={onBackdropPress}
            >
              {content}
            </Backdrop>
          </ModalPanelItemContext.Provider>
        ) : (
          // An inline modal is presented from the call site, so anything opened from inside it
          // has to stay inline too: hoisting it to the root panel would ask iOS to present a
          // second modal from a view controller that is already presenting.
          <ModalPanelContext.Provider value={null}>
            <Backdrop
              visible={visible}
              backdropStyle={backdropStyle}
              backdropAccessibilityLabel={backdropAccessibilityLabel}
              onBackdropPress={onBackdropPress}
            >
              {content}
            </Backdrop>
          </ModalPanelContext.Provider>
        )}
        {usePanel && <ModalPanelOutlet parentId={id} />}
      </RNModal>
    );
  };

  // The presented element leaves the call site, so the library contexts consumed by
  // `useStyled`, `useTheme` and `useThemeValue` are carried along explicitly. Nested
  // `ThemeProvider` overrides around the anchor therefore still apply inside the modal.
  const renderBridgedElement = (): React.ReactElement => (
    <MappingContext.Provider value={mapping}>
      <ThemeStoreContext.Provider value={themeStore}>
        <ThemeContext.Provider value={theme}>
          {renderRNModal()}
        </ThemeContext.Provider>
      </ThemeStoreContext.Provider>
    </MappingContext.Provider>
  );

  // No dependency list on purpose: every render pushes the current element so the panel stays
  // in sync with the call site. A layout effect makes the panel flush in the same commit,
  // before paint, so repositioned content never shows up one frame late.
  useLayoutEffect(() => {
    if (!usePanel) {
      return;
    }
    if (visible) {
      registry.show(id, renderBridgedElement(), parentItem ? parentItem.id : null);
    } else {
      registry.hide(id);
    }
  });

  useLayoutEffect(() => {
    return () => {
      registry?.hide(id);
    };
  }, [registry, id]);

  if (!visible || usePanel) {
    return null;
  }

  return renderRNModal();
};

Modal.displayName = 'Modal';

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
  },
});
