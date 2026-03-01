/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { Backdrop, BackdropPresentingConfig } from '@ui-kitten/components/theme/backdrop/backdrop.component';

export type RNModalProps =
  Pick<ReactNativeModalProps, 'animationType' | 'hardwareAccelerated' | 'supportedOrientations' | 'onShow'>;

export interface ModalProps extends ViewProps, BackdropPresentingConfig, RNModalProps {
  visible?: boolean;
  shouldUseContainer?: boolean;
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
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example ModalSimpleUsage
 * Modals accept content views as child elements and are displayed in the screen center.
 * To display a modal, a `visible` property should be used.
 *
 * @overview-example ModalWithBackdrop
 * To configure underlying view, `backdropStyle` and `onBackdropPress` properties may be used.
 */
export const Modal: React.FC<ModalProps> = ({
  style,
  visible = false,
  shouldUseContainer = true,
  children,
  backdropStyle,
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

  if (!visible) {
    return null;
  }

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
      <Backdrop
        visible={visible}
        backdropStyle={backdropStyle}
        onBackdropPress={onBackdropPress}
      >
        {shouldUseContainer ? renderMeasuringContentElement() : children}
      </Backdrop>
    </RNModal>
  );
};

Modal.displayName = 'Modal';

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
  },
});
