/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  findNodeHandle,
  UIManager,
} from 'react-native';
import { Frame } from './type';

export type MeasuringElement<P = any> = React.ReactElement;

export interface MeasureElementProps<P = any> {
  onMeasure: (frame: Frame) => void;
  children: React.ReactElement<P>;
}

/**
 * Measures child element size and it's screen position asynchronously.
 * Returns measure result in `onResult` callback.
 *
 * Usage:
 *
 * const onMeasure = (element: ElementToMeasure): void => {
 *   const { x, y, width, height } = element.props.frame;
 *   ...
 * };
 *
 * <MeasureElement onMeasure={onMeasure}>
 *   <ElementToMeasure />
 * </MeasureElement>
 */
export const MeasureElement = (props: MeasureElementProps): MeasuringElement => {

  const ref: React.RefObject<any> = React.useRef();

  let pending: boolean = true;

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
    const frame: Frame = bindToWindow(new Frame(x, y, w, h), Frame.window());
    props.onMeasure(frame);
  };

  const onLayout = (): void => {
    const node: number = findNodeHandle(ref.current);
    UIManager.measureInWindow(node, onUIManagerMeasure);
  };

  return React.cloneElement(props.children, { ref, onLayout });
};
