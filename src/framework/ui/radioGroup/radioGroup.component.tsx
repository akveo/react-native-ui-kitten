/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { Props as RadioProps } from '../radio/radio.component';

type RadioElement = React.ReactElement<RadioProps>;

interface RadioGroupProps {
  children: RadioElement | RadioElement[];
  selectedIndex?: number;
  onChange?: (index: number) => void;
}

export type Props = RadioGroupProps & StyledComponentProps & ViewProps;

export class RadioGroup extends React.Component<Props> {

  static styledComponentName: string = 'RadioGroup';

  static defaultProps: Partial<Props> = {
    selectedIndex: -1,
  };

  private onChildSelected = (index: number) => {
    if (this.props.onChange) {
      this.props.onChange(index);
    }
  };

  private getComponentStyle = (style: StyleType): StyleType => {
    return {
      container: {
        padding: style.padding,
      },
    };
  };

  private renderComponentChild = (element: RadioElement, index: number): RadioElement => {
    return React.cloneElement(element, {
      ...element.props,
      key: index,
      checked: this.props.selectedIndex === index,
      onChange: () => this.onChildSelected(index),
    });
  };

  private renderComponentChildren = (source: RadioElement | RadioElement[]): RadioElement[] => {
    return React.Children.map(source, this.renderComponentChild);
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, themedStyle, children, ...derivedProps } = this.props;
    const { container }: StyleType = this.getComponentStyle(themedStyle);

    const componentChildren: RadioElement[] = this.renderComponentChildren(children);

    return (
      <View
        {...derivedProps}
        style={[style, container]}>
        {componentChildren}
      </View>
    );
  }
}
