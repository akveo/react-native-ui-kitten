/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { ListRenderItemInfo, View } from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import { Text } from '../text/text.component';
import {
  DropdownItem,
  DropdownItemProps,
  DropdownItemType,
} from './droppdownItem.component';
import { SelectionStrategy } from './selection.strategy';

type ItemElement = React.ReactElement<DropdownItemProps>;

interface ComponentProps {
  multiSelect?: boolean;
  strategy: SelectionStrategy;
  renderItem?: (item: ListRenderItemInfo<DropdownItemType>) => React.ReactElement<any>;
}

type DropdownGroupProps = ComponentProps & Partial<DropdownItemProps> & StyledComponentProps;

export class DropdownGroupComponent extends React.Component<DropdownGroupProps> {

  static styledComponentName: string = 'DropdownGroup';

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      itemMarginLeft,
      textColor,
      textFontSize,
      textFontWeight,
      textLineHeight,
      textMarginHorizontal,
      ...containerStyles
    } = source;

    return {
      container: containerStyles,
      item: {
        marginLeft: itemMarginLeft,
      },
      text: {
        color: textColor,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        lineHeight: textLineHeight,
        marginHorizontal: textMarginHorizontal,
      },
    };
  };

  private renderSubItem = (option: DropdownItemType, index: number): ItemElement => {
    const { item, renderItem, strategy, ...restProps } = this.props;
    const returningOption: ListRenderItemInfo<DropdownItemType> = {
      item: option,
      index: index,
      separators: null,
    };
    const selected: boolean = strategy.isSelected(option);

    return renderItem ? renderItem(returningOption) : (
      <DropdownItem
        {...restProps}
        selected={selected}
        item={option}
      />
    );
  };

  public render(): React.ReactNode {
    const { item, themedStyle } = this.props;
    const { container, item: itemStyle, text: textStyle } = this.getComponentStyle(themedStyle);

    const subItemsElements: ItemElement[] = item.items
      .map((option: DropdownItemType, index: number) => {
        const element: ItemElement = this.renderSubItem(option, index);

        return React.cloneElement(element, {
          ...option,
          style: [element.props.style, itemStyle],
          key: index,
        });
      });

    return (
      <View style={container}>
        <Text style={[textStyle, item.textStyle]}>{item.text}</Text>
        {subItemsElements}
      </View>
    );
  }
}

export const DropdownGroup = styled<DropdownGroupProps>(DropdownGroupComponent);

