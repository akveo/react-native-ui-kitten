/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  LayoutChangeEvent,
  LayoutRectangle,
  View,
  ViewProps,
} from 'react-native';

interface ComponentProps extends ViewProps {
  onResult: (layout: LayoutRectangle) => void;
}

export type MeasureLayoutProps = ComponentProps;
export type MeasureLayoutElement = React.ReactElement<MeasureLayoutProps>;

export const MeasureLayout = (props?: MeasureLayoutProps): React.ReactElement<ViewProps> => {

  const onLayout = (event: LayoutChangeEvent) => {
    props.onResult(event.nativeEvent.layout);
  };

  return (
    <View
      style={props.style}
      onLayout={onLayout}
    />
  );
};
