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

/**
 * The `RadioGroup` component is a component for rendering group of radio-buttons.
 *
 * @extends React.Component
 *
 * @property {React.ReactElement<RadioProps>[]} children - Determines radio buttons in group. Can be passed through jsx.
 *
 * @property {number} selectedIndex - Determines the index of selected button
 *
 * @property {(index: number) => void} onChange - Triggered on onChange event.
 *
 * @property ViewProps
 *
 * @property StyledComponentProps
 *
 * @example RadioGroup API and usage example
 *
 * ```
 * import { Radio, RadioGroup } from '@kitten/ui';
 *
 * public state: State = {
 *   selectedIndexGroup: 0,
 * };
 *
 * private onGroupSelectionChange = (index: number) => {
 *   this.setState({ selectedIndexGroup: index });
 * };
 *
 * public render(): React.ReactNode {
 *   return (
 *     <RadioGroup
 *       selectedIndex={this.state.selectedIndexGroup}
 *       onChange={this.onGroupSelectionChange}>
 *       <Radio
 *         style={styles.radioButton}
 *         status='danger'
 *         size='small'
 *       />
 *       <Radio
 *         style={styles.radioButton}
 *         status='danger'
 *       />
 *       <Radio
 *         style={styles.radioButton}
 *         status='danger'
 *         size='large'
 *       />
 *     </RadioGroup>
 *   );
 * }
 * ```
 * */

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
