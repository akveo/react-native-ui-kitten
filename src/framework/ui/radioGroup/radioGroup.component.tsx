/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { RadioProps } from '../radio/radio.component';

type RadioElement = React.ReactElement<RadioProps>;
type ChildrenProp = RadioElement | RadioElement[];

interface ComponentProps {
  children: ChildrenProp;
  selectedIndex?: number;
  onChange?: (index: number) => void;
}

export type RadioGroupProps = StyledComponentProps & ViewProps & ComponentProps;

class RadioGroupComponent extends React.Component<RadioGroupProps> {

  static styledComponentName: string = 'RadioGroup';

  static defaultProps: Partial<RadioGroupProps> = {
    selectedIndex: -1,
  };

  private onRadioChange = (index: number) => {
    if (this.props.onChange) {
      this.props.onChange(index);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const { style } = this.props;

    return {
      ...source,
      ...StyleSheet.flatten(style),
    };
  };

  private renderRadioElement = (element: RadioElement, index: number): RadioElement => {
    return React.cloneElement(element, {
      key: index,
      checked: this.props.selectedIndex === index,
      onChange: () => this.onRadioChange(index),
    });
  };

  private renderRadioElements = (source: RadioElement | RadioElement[]): RadioElement[] => {
    return React.Children.map(source, this.renderRadioElement);
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, themedStyle, children, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    const radioElements: RadioElement[] = this.renderRadioElements(children);

    return (
      <View
        {...derivedProps}
        style={componentStyle}>
        {radioElements}
      </View>
    );
  }
}

export const RadioGroup = styled<RadioGroupProps>(RadioGroupComponent);
