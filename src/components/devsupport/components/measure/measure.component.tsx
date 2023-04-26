/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  findNodeHandle,
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
export const MeasureElement: React.FC<MeasureElementProps> = (props): MeasuringElement => {

  const ref = React.useRef();

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
      measureSelf();
    } else {
      const originY = props.shouldUseTopInsets ? y + StatusBar.currentHeight || 0 : y;
      const frame: Frame = bindToWindow(new Frame(x, originY, w, h), Frame.window());
      props.onMeasure(frame);
    }
  };

  const measureSelf = (): void => {
    const node: number = findNodeHandle(ref.current);
    UIManager.measureInWindow(node, onUIManagerMeasure);
  };

  if (props.force) {
    measureSelf();
  }

  return React.cloneElement(props.children, { ref, onLayout: measureSelf });
};

MeasureElement.defaultProps = {
  shouldUseTopInsets: false,
};
