/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  findNodeHandle,
  LayoutChangeEvent,
  NativeModules,
  Platform,
  UIManager,
  StatusBar,
} from 'react-native';
import { Frame } from './type';

interface DeviceInfoConstants {
  isEdgeToEdge?: boolean;
}

interface DeviceInfoModule {
  getConstants?: () => DeviceInfoConstants;
}

interface ReactNativeVersion {
  major: number;
  minor: number;
}

interface PlatformConstantsWithVersion {
  reactNativeVersion?: ReactNativeVersion;
}

/**
 * Whether React Native draws the Android app edge-to-edge (React Native 0.81+ reports it through
 * the `DeviceInfo` constants). In that mode every native `Modal` window is presented edge-to-edge
 * as well, so its coordinate space starts at the top of the screen, while `measureInWindow`
 * keeps reporting positions relative to the visible window frame, i.e. below the status bar.
 *
 * Read through `NativeModules` rather than `TurboModuleRegistry`: bridgeless React Native forwards
 * it to the TurboModule registry, and react-native-web ships a `NativeModules` shim but no
 * `TurboModuleRegistry` export, so a named import breaks every web bundler that checks exports.
 */
const isAndroidEdgeToEdge = (): boolean => {
  if (Platform.OS !== 'android') {
    return false;
  }
  const deviceInfo = NativeModules.DeviceInfo as DeviceInfoModule | null | undefined;
  const constants = deviceInfo?.getConstants?.();
  return constants?.isEdgeToEdge === true;
};

/**
 * Whether Android `measureInWindow` still reports positions below the status bar in edge-to-edge
 * mode. React Native 0.81 through 0.85 subtract the visible display frame from the root view
 * offset, so an edge-to-edge window is measured from under the status bar while its `Modal`
 * windows start at the top of the screen. React Native 0.86 stopped subtracting anything when
 * edge-to-edge is on (`RootViewUtil.getViewportOffset`), so both coordinate spaces already match
 * and adding the status bar height again pushes every popover down by one bar (#1894).
 */
const measuresBelowStatusBarInEdgeToEdge = (): boolean => {
  const constants = Platform.constants as PlatformConstantsWithVersion | undefined;
  const version = constants?.reactNativeVersion;
  if (!version) {
    return true;
  }
  return version.major === 0 && version.minor < 86;
};

const needsStatusBarOffset = (): boolean => {
  return isAndroidEdgeToEdge() && measuresBelowStatusBarInEdgeToEdge();
};

export interface MeasureElementProps {
  /**
   * Whether the element is measured on layout. When `false` the child keeps its place in the tree
   * and its ref, but nothing is measured (on web the DOM node is still captured for a later forced
   * measurement). Lets a caller keep the tree shape stable while measuring only when needed.
   * Defaults to `true`.
   */
  enabled?: boolean;
  force?: boolean;
  shouldUseTopInsets?: boolean;
  onMeasure: (frame: Frame) => void;
  children: React.ReactElement<{
    ref?: React.Ref<unknown>;
    onLayout?: (_event: LayoutChangeEvent) => void;
  }>;
}

export type MeasuringElement = React.ReactElement;
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
  enabled = true,
  force,
  shouldUseTopInsets = false,
  onMeasure,
  children,
}): MeasuringElement => {

  const ref = React.useRef({} as any);
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
      // Modal windows with a translucent status bar (and every modal on edge-to-edge Android
      // before React Native 0.86) start at the top of the screen while the measurement does not,
      // so the status bar height has to be added to land the measured frame in the modal
      // coordinate space.
      const useTopInsets = shouldUseTopInsets || needsStatusBarOffset();
      const originY = useTopInsets ? y + (StatusBar.currentHeight || 0) : y;
      // Snap to whole points. Native layout lands fractional sizes on the pixel grid, so a content
      // view measured at a fractional origin comes back a fraction narrower or wider than the last
      // time; consumers that position the view from its measured frame then re-lay it out, and the
      // two measurements alternate forever (Modal flickering by 1px, #1767 / #1802).
      const frame: Frame = bindToWindow(
        new Frame(Math.round(x), Math.round(originY), Math.round(w), Math.round(h)),
        Frame.window(),
      );
      onMeasure(frame);
    }
  };

  // Get a DOM element for measurement on web.
  // Prefers ref.current if it's a DOM element (forwardRef components),
  // falls back to the DOM node captured from onLayout events (class components).
  const getWebDomElement = (): HTMLElement | null => {
    const current = ref.current;
    if (current && typeof current.getBoundingClientRect === 'function') {
      return current as unknown as HTMLElement;
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
      const node: number = findNodeHandle(ref.current);
      if (node) {
        UIManager.measureInWindow(node, onUIManagerMeasure);
      }
    }
  };

  // On web, handle onLayout events by extracting the DOM element from the event target.
  // RNW's onLayout fires via ResizeObserver and provides the actual DOM node as event target,
  // along with viewport-relative coordinates (left, top) from UIManager.measure.
  const handleLayoutWeb = (event: any): void => {
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
      onUIManagerMeasure(left, top, layout.width, layout.height);
    } else {
      measureSelf();
    }
  };

  // Use useLayoutEffect to measure synchronously after render when force is true
  // This avoids "Cannot update during an existing state transition" warning
  React.useLayoutEffect(() => {
    if (enabled && force) {
      measureSelf();
    }
  });

  // Disabled: keep the ref (and, on web, the DOM node a later forced measurement needs), measure nothing.
  const captureWebDomNode = (event: any): void => {
    const target = event?.nativeEvent?.target;
    if (target instanceof HTMLElement) {
      webDomNodeRef.current = target;
    }
  };

  const disabledLayoutHandler = Platform.OS === 'web' ? captureWebDomNode : undefined;
  const enabledLayoutHandler = Platform.OS === 'web' ? handleLayoutWeb : measureSelf;
  const onLayoutHandler = enabled ? enabledLayoutHandler : disabledLayoutHandler;

  return React.cloneElement(children, { ref, onLayout: onLayoutHandler });
};
