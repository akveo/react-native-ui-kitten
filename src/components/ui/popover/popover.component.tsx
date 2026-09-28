/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useState, useCallback, useMemo, useEffect, useRef, forwardRef, useImperativeHandle, memo } from 'react';
import {
  Keyboard,
  KeyboardEvent,
  Platform,
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import {
  Frame,
  MeasureElement,
  MeasureElementRef,
  MeasuringElement,
  Point,
  RenderFCProp,
} from '../../devsupport';
import { ModalService } from '../../theme';
import { Modal, ModalProps, RNModalProps } from '../modal/modal.component';
import {
  PopoverView,
  PopoverViewElement,
  PopoverViewProps,
} from './popoverView.component';
import { PopoverPlacementService } from './placement.service';
import {
  PlacementOptions,
  PopoverPlacement,
  PopoverPlacements,
} from './type';

type PopoverModalProps = Omit<ModalProps, 'children'>;

export interface PopoverProps extends PopoverViewProps, PopoverModalProps, RNModalProps {
  children?: React.ReactElement;
  placement?: PopoverPlacement | string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  anchor: RenderFCProp<any>;
  /**
   * Style of the view that wraps `anchor` and is measured for placement.
   * Layout props meant for the anchor's slot in its parent (`flex`, `alignSelf`, margins)
   * belong here: a `flex` on the anchor element itself only sizes it inside this wrapper.
   */
  anchorContainerStyle?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
  /**
   * Whether the popover blocks the screen behind it. With `false` the content floats above the
   * app without a backdrop: touches outside it reach the views underneath (so a neighbouring
   * button gets its first tap) and `onBackdropPress` never fires. See `Modal`.
   */
  blocking?: boolean;
  /**
   * Called when the actual placement changes.
   * This can differ from the requested placement if there's not enough space.
   * Useful for adjusting UI based on actual popover position.
   */
  onPlacementChange?: (placement: PopoverPlacement) => void;
}

export type PopoverElement = React.ReactElement<PopoverProps>;

// ============================================================================
// Custom Hook: usePopoverMeasurement
// Extracted for reusability in Tooltip, OverflowMenu, etc.
// ============================================================================

export interface UsePopoverMeasurementOptions {
  placement: PopoverPlacement | string;
  fullWidth: boolean;
  visible: boolean;
  /**
   * Whether the content blocks the screen behind it. A non-blocking popover leaves the anchor
   * scrollable, so its frame is tracked while the popover is open.
   */
  blocking?: boolean;
  onPlacementChange?: (placement: PopoverPlacement) => void;
}

export interface UsePopoverMeasurementResult {
  childFrame: Frame;
  actualPlacement: PopoverPlacement;
  contentPosition: Point;
  contentFlexPosition: StyleProp<ViewStyle>;
  forceMeasure: boolean;
  /** Attach to the anchor's `MeasureElement` so the hook can re-measure the anchor on demand. */
  anchorMeasureRef: React.RefObject<MeasureElementRef | null>;
  onChildMeasure: (frame: Frame) => void;
  onContentMeasure: (frame: Frame) => void;
}

/**
 * The area the content may occupy: the window minus the software keyboard. Keyboard events report
 * the keyboard height in the same points as the window, so the bottom edge moves up by that much.
 */
const boundsWithKeyboard = (keyboardHeight: number): Frame => {
  const window = Frame.window();
  return new Frame(0, 0, window.size.width, Math.max(0, window.size.height - keyboardHeight));
};

/**
 * Custom hook for popover measurement and placement logic.
 * Can be reused by Tooltip, OverflowMenu, and other popover-based components.
 */
export function usePopoverMeasurement({
  placement,
  fullWidth,
  visible,
  blocking = true,
  onPlacementChange,
}: UsePopoverMeasurementOptions): UsePopoverMeasurementResult {
  // State
  // Initialize position offscreen to prevent flash at (0,0) before measurement
  const [childFrame, setChildFrame] = useState<Frame>(Frame.zero());
  const [forceMeasure, setForceMeasure] = useState<boolean>(false);
  const [actualPlacement, setActualPlacement] = useState<PopoverPlacement>(() =>
    PopoverPlacements.parse(placement)
  );
  const [contentPosition, setContentPosition] = useState<Point>(Point.outscreen());

  // Refs for values needed in callbacks without causing re-renders
  const childFrameRef = useRef<Frame>(childFrame);
  const contentPositionRef = useRef<Point>(contentPosition);
  const actualPlacementRef = useRef<PopoverPlacement>(actualPlacement);
  const visibleRef = useRef<boolean>(visible);
  // The last measured content frame, kept so the placement can be redone when the anchor frame
  // arrives after the content was measured, or moves while the popover is open.
  const contentFrameRef = useRef<Frame | null>(null);
  // Height of the software keyboard, subtracted from the placement bounds (#1919).
  const keyboardHeightRef = useRef<number>(0);
  const anchorMeasureRef = useRef<MeasureElementRef | null>(null);

  // Keep refs in sync with state
  childFrameRef.current = childFrame;
  contentPositionRef.current = contentPosition;
  actualPlacementRef.current = actualPlacement;
  visibleRef.current = visible;

  // Service instance - stable across renders
  const placementService = useRef(new PopoverPlacementService()).current;

  // Computed preferred placement
  const preferredPlacement = useMemo(
    () => PopoverPlacements.parse(placement),
    [placement]
  );

  // When visible becomes true and forceMeasure is false, trigger measurement
  useEffect(() => {
    if (visible && !forceMeasure) {
      setForceMeasure(true);
    }
  }, [visible, forceMeasure]);

  // When becoming invisible, reset position to offscreen
  useEffect(() => {
    if (!visible) {
      contentFrameRef.current = null;
      if (!Point.outscreen().equals(contentPositionRef.current)) {
        setContentPosition(Point.outscreen());
      }
    }
  }, [visible]);

  // Notify when actual placement changes
  useEffect(() => {
    onPlacementChange?.(actualPlacement);
  }, [actualPlacement, onPlacementChange]);

  // Computed style for positioning
  // The content is laid out at `left`, where Yoga only offers it the width that remains to the
  // right (and, while it is still measured off screen, far more than the screen). Capping it at
  // the window width makes the measured width independent of where the content sits, so the
  // placement chosen from that measurement holds once the content moves there (#1693).
  const { width: windowWidth } = useWindowDimensions();

  const contentFlexPosition = useMemo((): StyleProp<ViewStyle> => {
    const { x: left, y: top } = contentPosition;
    return { left, top, maxWidth: windowWidth };
  }, [contentPosition, windowWidth]);

  // Helper to calculate placement options
  const findPlacementOptions = useCallback(
    (contentFrame: Frame, anchorFrame: Frame): PlacementOptions => {
      const width = fullWidth ? anchorFrame.size.width : contentFrame.size.width;
      const frame = new Frame(
        contentFrame.origin.x,
        contentFrame.origin.y,
        width,
        contentFrame.size.height
      );
      return new PlacementOptions(frame, anchorFrame, boundsWithKeyboard(keyboardHeightRef.current), Frame.zero());
    },
    [fullWidth]
  );

  // Places the content next to the anchor from the two measured frames.
  const placeContent = useCallback(
    (contentFrame: Frame, anchorFrame: Frame): void => {
      const placementOptions = findPlacementOptions(contentFrame, anchorFrame);

      // An anchor scrolled out of the window has nothing to attach to: keep the content off screen
      // rather than pinned to the window edge, and bring it back once the anchor returns. An anchor
      // that is only covered by the keyboard still gets its content, clamped above the keyboard.
      if (!anchorFrame.intersects(Frame.window())) {
        if (!Point.outscreen().equals(contentPositionRef.current)) {
          setContentPosition(Point.outscreen());
        }
        return;
      }

      const computedPlacement = placementService.find(preferredPlacement, placementOptions);

      // `find` falls back to the preferred placement when nothing fits; keep that frame on screen.
      const displayFrame = placementService.fit(computedPlacement.frame(placementOptions), placementOptions.bounds);
      const newContentPosition = displayFrame.origin;

      // A move of at most one point is ignored: a fractional content size measures one point
      // wider or narrower depending on where it sits, and following that re-measures forever.
      if (
        !newContentPosition.isNear(contentPositionRef.current) ||
        computedPlacement.rawValue !== actualPlacementRef.current.rawValue
      ) {
        setActualPlacement(computedPlacement);
        setContentPosition(newContentPosition);
      }
    },
    [findPlacementOptions, placementService, preferredPlacement]
  );

  // Callback when anchor element is measured
  const onChildMeasure = useCallback((frame: Frame): void => {
    if (frame.equals(childFrameRef.current)) {
      return;
    }
    childFrameRef.current = frame;
    setChildFrame(frame);
    // The content may have been measured before the anchor (the first open races the two
    // measurements, #1910), or the anchor may move while the popover is open: place it again
    // against the frame that just arrived.
    if (visibleRef.current && contentFrameRef.current) {
      placeContent(contentFrameRef.current, frame);
    }
  }, [placeContent]);

  // Places the content again from the frames already measured, e.g. after the bounds changed.
  const replaceContent = useCallback((): void => {
    if (visibleRef.current && contentFrameRef.current && !childFrameRef.current.equals(Frame.zero())) {
      placeContent(contentFrameRef.current, childFrameRef.current);
    }
  }, [placeContent]);

  // The keyboard shrinks the area the content may use, so a list that would open under it flips
  // to the other side of the anchor instead. The anchor is measured again as well: the keyboard
  // often scrolls or resizes the layout around it.
  useEffect(() => {
    const onKeyboardChange = (height: number) => (event?: KeyboardEvent): void => {
      const next = height === 0 ? 0 : (event?.endCoordinates?.height ?? 0);
      if (next === keyboardHeightRef.current) {
        return;
      }
      keyboardHeightRef.current = next;
      replaceContent();
      anchorMeasureRef.current?.measure();
    };
    const subscriptions = [
      Keyboard.addListener('keyboardWillShow', onKeyboardChange(1)),
      Keyboard.addListener('keyboardDidShow', onKeyboardChange(1)),
      Keyboard.addListener('keyboardWillHide', onKeyboardChange(0)),
      Keyboard.addListener('keyboardDidHide', onKeyboardChange(0)),
    ];
    return () => subscriptions.forEach((subscription) => subscription.remove());
  }, [replaceContent]);

  // A non-blocking popover leaves the screen behind it scrollable, so the anchor can move while the
  // content is open. Nothing reports a scroll to a descendant, so the anchor is measured once per
  // frame while visible; `onChildMeasure` ignores an unchanged frame.
  useEffect(() => {
    if (!visible || blocking) {
      return;
    }
    let handle: number | null = null;
    const tick = (): void => {
      anchorMeasureRef.current?.measure();
      handle = requestAnimationFrame(tick);
    };
    handle = requestAnimationFrame(tick);
    return () => {
      if (handle !== null) {
        cancelAnimationFrame(handle);
      }
    };
  }, [visible, blocking]);

  // Callback when popover content is measured
  const onContentMeasure = useCallback(
    (contentFrame: Frame): void => {
      contentFrameRef.current = contentFrame;
      // Until the anchor has been measured there is nothing to place the content against; it
      // stays off screen instead of being drawn at the window origin and jumping into place once
      // the anchor frame arrives (#1910).
      if (childFrameRef.current.equals(Frame.zero())) {
        return;
      }
      placeContent(contentFrame, childFrameRef.current);
    },
    [placeContent]
  );

  return {
    childFrame,
    actualPlacement,
    contentPosition,
    contentFlexPosition,
    forceMeasure,
    anchorMeasureRef,
    onChildMeasure,
    onContentMeasure,
  };
}

// ============================================================================
// Popover Component
// ============================================================================

/**
 * Displays a content positioned relative to another view.
 *
 * @extends React.FC
 *
 * @property {boolean} visible - Whether content component is visible.
 * Defaults to false.
 * The property is more specific that the show/hide methods, so do not use them at the same time.
 *
 * @property {() => ReactElement} anchor - A component relative to which content component will be shown.
 *
 * @property {StyleProp<ViewStyle>} anchorContainerStyle - Style of the view wrapping `anchor`.
 * Use it for the anchor's layout in its parent, e.g. `flex: 1` to share a row with other views.
 *
 * @property {ReactElement} children - A component displayed within the popover.
 *
 * @property {() => void} onBackdropPress - Called when popover is visible and the underlying view was touched.
 * Useful when needed to close the modal on outside touches.
 *
 * @property {boolean} fullWidth - Whether a content component should take the width of `anchor`.
 *
 * @property {boolean} blocking - Whether the popover blocks the screen behind it. With `false` the content
 * floats above the app without a backdrop: touches outside it reach the views underneath and
 * `onBackdropPress` is never called. Dismiss it from your own state (an input blur, a selection).
 * A non-blocking popover follows its anchor while the screen behind it scrolls, and hides the
 * content while the anchor is out of view.
 * Defaults to true.
 *
 * @property {string | PopoverPlacement} placement - Position of the content component relative to the `anchor`.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start`, `bottom end`, `inner`, `inner top` or `inner bottom`.
 * When the content does not fit on that side of the anchor within the window minus the software
 * keyboard, the opposite side is used; the placement is redone when the keyboard appears or hides.
 * Defaults to *bottom*.
 *
 * @property {(placement: PopoverPlacement) => void} onPlacementChange - Called when the actual placement changes.
 * This can differ from the requested placement if there's not enough space.
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
 * in your app's Info.plist's UISupportedInterfaceOrientations field.
 * Defaults to every orientation, so the popover follows the app.
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Style of backdrop.
 *
 * @property {string} backdropAccessibilityLabel - Accessible name for the dismissable backdrop.
 * When omitted, the backdrop is hidden from assistive technology.
 *
 * @property {(event: NativeSyntheticEvent<any>) => void} onShow -
 * Allows passing a function that will be called once the modal has been shown.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example PopoverSimpleUsage
 * Popover accepts it's content as child element and is displayed relative to `anchor` view.
 *
 * @overview-example PopoverPlacement
 * By default, it is displayed to the bottom of `anchor` view, but it is configurable with `placement` property.
 *
 * @overview-example PopoverFullWidth
 * Popover may take the full width of the anchor view by configuring `fullWidth` property.
 *
 * @overview-example PopoverStyledBackdrop
 * To style the underlying view, `backdropStyle` property may be used.
 */
const PopoverComponent = forwardRef<View, PopoverProps>(({
  children,
  placement = PopoverPlacements.BOTTOM,
  anchor,
  anchorContainerStyle,
  fullWidth = false,
  blocking = true,
  visible = false,
  backdropStyle,
  backdropAccessibilityLabel,
  animationType,
  hardwareAccelerated,
  supportedOrientations,
  onShow,
  onBackdropPress,
  onPlacementChange,
  contentContainerStyle,
  renderInline,
  ...viewProps
}, ref) => {
  // Use the extracted custom hook for measurement logic
  const {
    childFrame,
    actualPlacement,
    contentFlexPosition,
    forceMeasure,
    anchorMeasureRef,
    onChildMeasure,
    onContentMeasure,
  } = usePopoverMeasurement({
    placement,
    fullWidth,
    visible,
    blocking,
    onPlacementChange,
  });

  // The modal machinery is mounted the first time the popover becomes visible. The anchor stays
  // wrapped in `MeasureElement` from the start so the element tree keeps its shape (moving the
  // anchor into the wrapper on open remounted it, #1910), but the wrapper only measures once the
  // popover has been shown: a closed popover costs its anchor, and the first open measures the
  // anchor through the forced measurement (the content waits off screen until that frame arrives).
  const everVisibleRef = useRef<boolean>(visible);
  if (visible) {
    everVisibleRef.current = true;
  }

  // Ref for the container
  const containerRef = useRef<View>(null);

  // Forward ref to the container View
  useImperativeHandle(ref, () => containerRef.current as View, []);

  // Render helpers
  const renderContentElement = (): React.ReactElement => {
    const contentElement = children as React.ReactElement<{ style?: StyleProp<ViewStyle> }>;
    const fullWidthStyle = { width: childFrame.size.width };

    return React.cloneElement(contentElement, {
      style: [fullWidth && fullWidthStyle, contentElement.props.style],
    });
  };

  const renderPopoverElement = (): PopoverViewElement => {
    return (
      <PopoverView
        // Popover renders with `shouldUseContainer={false}`, so it bypasses
        // Modal's content wrapper and has to carry the modal semantics itself.
        aria-modal={true}
        onAccessibilityEscape={onBackdropPress}
        {...viewProps}
        contentContainerStyle={[contentContainerStyle, styles.popoverView, contentFlexPosition]}
        layoutDirection={PopoverPlacements.parse(actualPlacement).flex()}
      >
        {renderContentElement()}
      </PopoverView>
    );
  };

  const renderMeasuringPopoverElement = (): MeasuringElement => {
    return (
      <MeasureElement
        // On web, force-measure the content to avoid relying solely on
        // async ResizeObserver onLayout which may not fire reliably in
        // modal portals. On native, onLayout works fine without force.
        force={Platform.OS === 'web' ? forceMeasure : undefined}
        onMeasure={onContentMeasure}
      >
        {renderPopoverElement()}
      </MeasureElement>
    );
  };

  return (
    <View
      ref={containerRef}
      style={anchorContainerStyle}
    >
      <MeasureElement
        ref={anchorMeasureRef}
        enabled={everVisibleRef.current}
        force={forceMeasure}
        // The status bar compensation targets native modal windows; non-blocking content is laid
        // out in the same coordinate space the anchor is measured in.
        shouldUseTopInsets={blocking ? ModalService.getShouldUseTopInsets : false}
        onMeasure={onChildMeasure}
      >
        {anchor()}
      </MeasureElement>
      {everVisibleRef.current && (
        <Modal
          visible={visible}
          shouldUseContainer={false}
          backdropStyle={backdropStyle}
          backdropAccessibilityLabel={backdropAccessibilityLabel}
          animationType={animationType}
          hardwareAccelerated={hardwareAccelerated}
          supportedOrientations={supportedOrientations}
          onShow={onShow}
          onBackdropPress={onBackdropPress}
          renderInline={renderInline}
          blocking={blocking}
        >
          {renderMeasuringPopoverElement()}
        </Modal>
      )}
    </View>
  );
});

PopoverComponent.displayName = 'Popover';

export const Popover = memo(PopoverComponent);
Popover.displayName = 'Popover';

// Display name for debugging

const styles = StyleSheet.create({
  popoverView: {
    position: 'absolute',
  },
});
