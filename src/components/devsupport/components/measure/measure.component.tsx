/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  findNodeHandle,
  Platform,
  UIManager,
  StatusBar,
} from 'react-native';
import { Frame } from './type';

export interface MeasureElementProps {
  force?: boolean;
  shouldUseTopInsets?: boolean;
  onMeasure: (frame: Frame) => void;
  children: React.ReactElement;
}

export type MeasuringElement = React.ReactElement;

interface WebLayoutEvent {
  nativeEvent?: {
    target?: HTMLElement;
    layout?: {
      left?: number;
      top?: number;
      width?: number;
      height?: number;
    };
  };
}
/**
 * Measures child element size and it's screen position asynchronously.
 * Returns measure result in `onMeasure` callback.
 *
 * Usage:
 *
 * ```tsx
 * const onMeasure = (frame: Frame): void => {
 *   const { x, y } = frame.origin;
 *   const { width, height } = frame.size;
 *   ...
 * };
 *
 * <MeasureElement
 *   shouldUseTopInsets={ModalService.getShouldUseTopInsets}
 *   onMeasure={onMeasure}>
 *   <ElementToMeasure />
 * </MeasureElement>
 * ```
 *
 * By default, it measures each time onLayout is called,
 * but `force` property may be used to measure any time it's needed.
 * DON'T USE THIS FLAG IF THE COMPONENT RENDERS FIRST TIME OR YOU KNOW `onLayout` WILL BE CALLED.
 */
export const MeasureElement: React.FC<MeasureElementProps> = ({
  force,
  shouldUseTopInsets = false,
  onMeasure,
  children,
}): MeasuringElement => {

  const ref = React.useRef<React.Component | null>(null);
  // On web, store the actual DOM element from the onLayout event target.
  // This is needed because ref.current may be a class component instance
  // (e.g., TouchableWeb) rather than a DOM element, and getBoundingClientRect
  // only exists on DOM elements.
  const webDomNodeRef = React.useRef<HTMLElement | null>(null);

  const bindToWindow = (frame: Frame, window: Frame): Frame => {
    if (frame.origin.x < window.size.width) {
      return frame;
    }

    const boundFrame: Frame = new Frame(
      frame.origin.x - window.size.width,
      frame.origin.y,
      frame.size.width,
      frame.size.height,
    );

    return bindToWindow(boundFrame, window);
  };

  const onUIManagerMeasure = (x: number, y: number, w: number, h: number): void => {
    if (!w && !h) {
      if (Platform.OS === 'web') {
        // On web, getBoundingClientRect is synchronous, so recursive measureSelf
        // would cause an infinite loop. Schedule retry on next animation frame.
        requestAnimationFrame(() => measureSelf());
      } else {
        measureSelf();
      }
    } else {
      const originY = shouldUseTopInsets ? y + (StatusBar.currentHeight || 0) : y;
      const frame: Frame = bindToWindow(new Frame(x, originY, w, h), Frame.window());
      onMeasure(frame);
    }
  };

  // Get a DOM element for measurement on web.
  // Prefers ref.current if it's a DOM element (forwardRef components),
  // falls back to the DOM node captured from onLayout events (class components).
  const getWebDomElement = (): HTMLElement | null => {
    const current = ref.current as unknown;
    if (current && typeof (current as Record<string, unknown>).getBoundingClientRect === 'function') {
      return current as HTMLElement;
    }
    return webDomNodeRef.current;
  };

  const measureSelf = (): void => {
    if (Platform.OS === 'web') {
      // On web, use getBoundingClientRect for viewport-relative coordinates.
      // findNodeHandle is not supported in react-native-web 0.21+.
      const element = getWebDomElement();
      if (element) {
        const rect = element.getBoundingClientRect();
        onUIManagerMeasure(rect.left, rect.top, rect.width, rect.height);
      }
    } else {
      const node = findNodeHandle(ref.current);
      if (node) {
        UIManager.measureInWindow(node, onUIManagerMeasure);
      }
    }
  };

  // On web, handle onLayout events by extracting the DOM element from the event target.
  // RNW's onLayout fires via ResizeObserver and provides the actual DOM node as event target,
  // along with viewport-relative coordinates (left, top) from UIManager.measure.
  const handleLayoutWeb = (event: WebLayoutEvent): void => {
    // Capture the DOM element from the event target for use in force measurements
    const target = event?.nativeEvent?.target;
    if (target instanceof HTMLElement) {
      webDomNodeRef.current = target;
    }
    // Use the viewport-relative coordinates from RNW's UIManager.measure
    const layout = event?.nativeEvent?.layout;
    if (layout && (layout.width || layout.height)) {
      const left = layout.left !== undefined ? layout.left : 0;
      const top = layout.top !== undefined ? layout.top : 0;
      onUIManagerMeasure(left, top, layout.width ?? 0, layout.height ?? 0);
    } else {
      measureSelf();
    }
  };

  React.useLayoutEffect(() => {
    if (force) {
      measureSelf();
    }
  }, [force, shouldUseTopInsets]);

  const onLayoutHandler = Platform.OS === 'web' ? handleLayoutWeb : measureSelf;

  return React.cloneElement(children, { ref, onLayout: onLayoutHandler });
};
