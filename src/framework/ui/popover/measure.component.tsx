import React from 'react';
import {
  findNodeHandle,
  UIManager,
  View,
  ViewProps,
  Dimensions,
  ScaledSize,
} from 'react-native';
import { Frame } from './type';

export type MeasuringElement = React.ReactElement<MeasuringElementProps>;
export type MeasuringElementProps = { tag: React.ReactText } & any;
export type MeasuringNode = React.ReactElement<MeasureNodeProps>;
export type MeasuringNodeProps = MeasureNodeProps & ViewProps;

export type MeasuredElementProps = MeasuringElementProps & { frame: Frame };
export type MeasuredElement = React.ReactElement<MeasuredElementProps>;

export interface MeasureResult {
  [tag: string]: Frame;
}

export interface MeasureElementProps {
  onResult: (result: MeasuredElement) => void;
  children: MeasuringElement;
}

export interface MeasureNodeProps {
  onResult: (result: MeasureResult) => void;
  children: MeasuringElement[];
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
 * <MeasureElement onResult={this.onMeasure}>
 *   <ElementToMeasure tag='@measure/measure-me!'/>
 * </MeasureElement>
 */
export const MeasureElement = (props: MeasureElementProps): MeasuringElement => {

  const ref: React.RefObject<any> = React.createRef();

  const { children, onResult } = props;

  const bindToWindow = (frame: Frame, window: ScaledSize): Frame => {
    if (frame.origin.x < window.width) {
      return frame;
    }

    const boundFrame: Frame = new Frame(
      frame.origin.x - window.width,
      frame.origin.y,
      frame.size.width,
      frame.size.height,
    );

    return bindToWindow(boundFrame, window);
  };

  const measureSelf = () => {
    const node: number = findNodeHandle(ref.current);

    UIManager.measureInWindow(node, (x: number, y: number, w: number, h: number) => {
      const window: ScaledSize = Dimensions.get('window');
      const frame: Frame = bindToWindow(new Frame(x, y, w, h), window);

      const measuredElement: MeasuredElement = React.cloneElement(children, { frame });

      onResult(measuredElement);
    });
  };

  return React.cloneElement(children, {
    ref,
    onLayout: measureSelf,
  });
};

/**
 * Measures passed child elements size and it's screen position asynchronously.
 * Returns measure result in `onResult` callback.
 *
 * Does the same as `MeasureElement` but calls `onResult` after all children are measured.
 *
 * Usage:
 *
 * const onMeasure = (result: MeasureResult): void => {
 *   const { [0]: firstElementFrame, [1]: secondElementFrame } = result;
 *   const { x, y, width, height } = firstElementFrame;
 *   ...
 * };
 *
 * <MeasureNode onResult={this.onMeasure}>
 *   <ElementToMeasure tag={0}/>
 *   <ElementToMeasure tag={1}/>
 * </MeasureNode>
 */
export const MeasureNode = (props: MeasuringNodeProps): MeasuringNode => {

  const result: MeasureResult = {};

  const { children, onResult, ...derivedProps } = props;

  const onChildMeasure = (element: MeasuredElement) => {
    const { tag, frame } = element.props;

    result[tag] = frame;

    if (Object.keys(result).length === children.length) {
      onResult(result);
    }
  };

  const renderMeasuringElement = (element: MeasuringElement, index: number): MeasuringElement => {
    return (
      <MeasureElement
        key={index}
        onResult={onChildMeasure}>
        {element}
      </MeasureElement>
    );
  };

  return (
    <View
      {...derivedProps}>
      {children.map(renderMeasuringElement)}
    </View>
  );
};
