/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  ListRenderItemInfo,
  View,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  SelectOption,
  SelectOptionElement,
  SelectOptionProps,
  SelectOptionType,
} from './selectOption.component';
import { SelectOption as SelectOptionProp} from './select.component';
import { SelectionStrategy } from './selection.strategy';

interface ComponentProps {
  multi?: boolean;
  strategy: SelectionStrategy<SelectOptionProp>;
  renderItem?: (item: ListRenderItemInfo<SelectOptionType>) => React.ReactElement;
}

interface MainItemStatus {
  selected: boolean;
  indeterminate: boolean;
}

export type SelectGroupOptionProps = ComponentProps & Partial<SelectOptionProps> & StyledComponentProps;
export type SelectGroupOptionElement = React.ReactElement<SelectGroupOptionProps>;

class SelectGroupOptionComponent extends React.Component<SelectGroupOptionProps> {

  static styledComponentName: string = 'SelectGroupOption';

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      itemPaddingHorizontal,
      ...containerStyles
    } = source;

    return {
      container: containerStyles,
      item: {
        paddingHorizontal: itemPaddingHorizontal,
      },
    };
  };

  private getMainItemStatus = (subItemsSelectedStatusArray: boolean[]): MainItemStatus => {
    const someSelected: boolean = subItemsSelectedStatusArray
      .some((item: boolean) => item === true);
    const everySelected: boolean = subItemsSelectedStatusArray
      .every((item: boolean) => item === true);

    switch (true) {
      case (someSelected && !everySelected):
        return { selected: true, indeterminate: true };
      case  !someSelected:
        return { selected: false, indeterminate: false };
      case everySelected:
        return { selected: true, indeterminate: false };
    }
  };

  private renderSubItem = (option: SelectOptionType, index: number): SelectOptionElement => {
    const { item, renderItem, strategy, ...restProps } = this.props;
    const returningOption: ListRenderItemInfo<SelectOptionType> = {
      item: option,
      index: index,
      separators: null,
    };
    const selected: boolean = strategy.isSelected(option);

    return renderItem ? renderItem(returningOption) : (
      <SelectOption
        {...restProps}
        selected={selected}
        item={option}
      />
    );
  };

  private renderSubItemsElements = (): SelectOptionElement[] => {
    const { item, themedStyle } = this.props;
    const { item: itemStyle } = this.getComponentStyle(themedStyle);

    return item.items
      .map((option: SelectOptionType, index: number) => {
        const element: SelectOptionElement = this.renderSubItem(option, index);

        return React.cloneElement(element, {
          ...option,
          style: [element.props.style, itemStyle],
          key: index,
        });
      });
  };

  private renderMultiSelectMainElement = (subItemsElements: SelectOptionElement[]): SelectOptionElement => {
    const { item, ...restProps } = this.props;
    const subItemsSelectedStatusArray: boolean[] = subItemsElements
      .map((subItem: SelectOptionElement) => subItem.props.selected);
    const itemStatus: MainItemStatus = this.getMainItemStatus(subItemsSelectedStatusArray);

    return (
      <SelectOption
        {...restProps}
        {...itemStatus}
        item={item}
      />
    );
  };

  private renderDefaultMainElement = (): SelectOptionElement => {
    const { item } = this.props;

    return (
      <SelectOption
        disabled={true}
        item={item}
      />
    );
  };

  private renderMainElement = (subItemsElements: SelectOptionElement[]): SelectOptionElement => {
    return this.props.multi ? this.renderMultiSelectMainElement(subItemsElements) : this.renderDefaultMainElement();
  };

  public render(): SelectGroupOptionElement {
    const { themedStyle } = this.props;
    const { container } = this.getComponentStyle(themedStyle);
    const subItemsElements: SelectOptionElement[] = this.renderSubItemsElements();
    const mainElement: SelectOptionElement = this.renderMainElement(subItemsElements);

    return (
      <View style={container}>
        {mainElement}
        {subItemsElements}
      </View>
    );
  }
}

export const SelectGroupOption = styled<SelectGroupOptionProps>(SelectGroupOptionComponent);

