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
  ChildrenWithProps,
  Overwrite,
  LiteralUnion,
} from '../../devsupport';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import {
  RadioElement,
  RadioProps,
} from '../radio/radio.component';

type RadioGroupStyledProps = Overwrite<StyledComponentProps, {
  appearance?: LiteralUnion<'default'>;
}>;

export interface RadioGroupProps extends ViewProps, RadioGroupStyledProps {
  children?: ChildrenWithProps<RadioProps>;
  selectedIndex?: number;
  onChange?: (index: number) => void;
}

export type RadioGroupElement = React.ReactElement<RadioGroupProps>;

/**
 * Provides to select a single state from multiple options.
 * RadioGroup should contain Radio components to provide a useful component.
 *
 * @extends React.Component
 *
 * @property {number} selectedIndex - Index of currently checked radio.
 *
 * @property {(number) => void} onChange - Called when one of the radios is pressed.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example RadioGroupSimpleUsage
 */
@styled('RadioGroup')
export class RadioGroup extends React.Component<RadioGroupProps> {

  static defaultProps: Partial<RadioGroupProps> = {
    selectedIndex: -1,
  };

  private onRadioChange = (index: number): void => {
    this.props.onChange && this.props.onChange(index);
  };

  private getComponentStyle = (source: StyleType) => {
    const { itemMarginVertical, ...containerParameters } = source;

    return {
      container: containerParameters,
      item: {
        marginVertical: itemMarginVertical,
      },
    };
  };

  private renderRadioElements = (source: ChildrenWithProps<RadioProps>, style: StyleType): RadioElement[] => {
    return React.Children.map(source, (element: RadioElement, index: number): RadioElement => {
      return React.cloneElement(element, {
        key: index,
        style: [style, element.props.style],
        checked: this.props.selectedIndex === index,
        onChange: () => this.onRadioChange(index),
      });
    });
  };

  public render(): React.ReactElement<ViewProps> {
    const { eva, style, children, ...viewProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    const radioElements: RadioElement[] = this.renderRadioElements(children, evaStyle.item);

    return (
      <View
        {...viewProps}
        style={[evaStyle.container, style]}>
        {radioElements}
      </View>
    );
  }
}
