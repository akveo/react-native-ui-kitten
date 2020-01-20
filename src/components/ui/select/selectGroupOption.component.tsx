/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { View } from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  SelectOption,
  SelectOptionElement,
  SelectOptionType,
} from './selectOption.component';

export interface SelectGroupOptionProps extends StyledComponentProps {
  multi: boolean;
  item: SelectOptionType;
  isOptionSelected: (item: SelectOptionType) => boolean;
  onSelect: (item: SelectOptionType) => void;
}

export type SelectGroupOptionElement = React.ReactElement<SelectGroupOptionProps>;

class SelectGroupOptionComponent extends React.Component<SelectGroupOptionProps> {

  static styledComponentName: string = 'SelectGroupOption';

  private getComponentStyle = (source: StyleType): StyleType => {
    const { itemPaddingHorizontal, ...containerParameters } = source;

    return {
      container: containerParameters,
      item: {
        paddingHorizontal: itemPaddingHorizontal,
      },
    };
  };

  private getGroupOptionMainItemProps = (children: SelectOptionElement[]) => {
    const selectedItems: boolean[] = children.map(element => element.props.selected);

    const someSelected: boolean = selectedItems.some((item: boolean) => item === true);
    const everySelected: boolean = selectedItems.every((item: boolean) => item === true);

    if (someSelected && !everySelected) {
      return { selected: true, indeterminate: true };
    }

    if (!someSelected) {
      return { selected: false, indeterminate: false };
    }

    if (everySelected) {
      return { selected: true, indeterminate: false };
    }
  };

  private renderGroupOptionElement = (option: SelectOptionType, index: number): SelectOptionElement => {
    return (
      <SelectOption
        key={index}
        multi={this.props.multi}
        item={option}
        selected={this.props.isOptionSelected(option)}
        onSelect={this.props.onSelect}
      />
    );
  };

  private renderGroupOptionElements = (componentStyle: StyleType): SelectOptionElement[] => {
    return this.props.item.items.map((option: SelectOptionType, index: number) => {
      const optionElement: SelectOptionElement = this.renderGroupOptionElement(option, index);

      return React.cloneElement(optionElement, {
        style: [optionElement.props.style, componentStyle.item],
      });
    });
  };

  private renderSingleElement = (): SelectOptionElement => {
    return (
      <SelectOption
        key={0}
        multi={this.props.multi}
        item={this.props.item}
        selected={false}
        onSelect={this.props.onSelect}
        disabled={true}
      />
    );
  };

  private renderGroupElement = (children: SelectOptionElement[]): SelectOptionElement => {
    return (
      <SelectOption
        {...this.getGroupOptionMainItemProps(children)}
        key={0}
        multi={this.props.multi}
        item={this.props.item}
        onSelect={this.props.onSelect}
      />
    );
  };

  private renderComponentChildren = (componentStyle: StyleType): React.ReactNodeArray => {
    const groupOptions: SelectOptionElement[] = this.renderGroupOptionElements(componentStyle);

    return [
      this.props.multi ? this.renderGroupElement(groupOptions) : this.renderSingleElement(),
      groupOptions,
    ];
  };

  public render(): SelectGroupOptionElement {
    const { container, ...componentStyle } = this.getComponentStyle(this.props.themedStyle);
    const [mainElement, groupOptionElements] = this.renderComponentChildren(componentStyle);

    return (
      <View style={container}>
        {mainElement}
        {groupOptionElements}
      </View>
    );
  }
}

export const SelectGroupOption = styled<SelectGroupOptionProps>(SelectGroupOptionComponent);

