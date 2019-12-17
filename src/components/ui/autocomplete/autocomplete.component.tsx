/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  ListRenderItemInfo,
  StyleSheet,
} from 'react-native';
import {
  Input,
  InputElement,
  InputProps,
} from '../input/input.component';
import {
  List,
  ListElement,
  ListProps,
} from '../list/list.component';
import {
  ListItem,
  ListItemElement,
} from '../list/listItem.component';
import {
  Popover,
  PopoverElement,
} from '../popover/popover.component';
import { InputFocusEvent } from '../support/typings';

export interface AutocompleteOption {
  title: string;
}

export interface AutocompleteProps<O extends Option = Option> extends InputProps {
  data?: O[];
  placeholderData?: O[];
  onSelect?: (option: O) => void;
  renderItem?: (info: ListRenderItemInfo<O>) => React.ReactElement;
}

export type AutocompleteElement<O extends Option = Option> = React.ReactElement<AutocompleteProps<O>>;

type Option = AutocompleteOption;

interface State {
  optionsVisible: boolean;
}

/**
 * Autocomplete is a normal text input enhanced by a panel of suggested options.
 *
 * @extends React.Component
 *
 * @property {AutocompleteOption[]} data - Options displayed in component.
 * Each option can be any type, but should contain `title` property.
 *
 * @property {AutocompleteOption[]} placeholderData - Options displayed in component
 * when data is nullable of empty.
 *
 * @property {(option: AutocompleteOption) => void} onSelect - Emits when option is pressed.
 *
 * @property {(info: ListRenderItemInfo<AutocompleteOption>) => ReactElement} renderItem - Takes an
 * item from data and renders it into the list. If not provided, ListItem is rendered.
 *
 * @property {InputProps} ...InputProps - Any props applied to Input component.
 *
 * @overview-example AutocompleteSimpleUsage
 *
 * @overview-example AutocompleteStates
 *
 * @overview-example AutocompleteStatus
 *
 * @overview-example AutocompleteSize
 *
 * @overview-example AutocompleteWithIcon
 *
 * @overview-example AutocompleteWithLabel
 *
 * @example AutocompleteAsync
 */
export class Autocomplete<O extends Option = Option> extends React.Component<AutocompleteProps<O>, State> {

  public state: State = {
    optionsVisible: false,
  };

  private get data(): O[] {
    const hasData: boolean = this.props.data && this.props.data.length > 0;
    return hasData && this.props.data || this.props.placeholderData;
  }

  private onInputFocus = (e: InputFocusEvent): void => {
    this.setState({ optionsVisible: true });

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  private onBackdropPress = (): void => {
    this.setState({ optionsVisible: false });
  };

  private onOptionPress = (index: number): void => {
    if (this.props.onSelect) {
      this.props.onSelect(this.props.data[index]);
      this.setState({ optionsVisible: false });
    }
  };

  private renderOptionElement = (info: ListRenderItemInfo<O>): ListItemElement => {
    return (
      <ListItem
        title={info.item.title}
        onPress={this.onOptionPress}
      />
    );
  };

  private renderCustomOptionElement = (info: ListRenderItemInfo<O>): React.ReactElement => {
    return (
      <ListItem onPress={this.onOptionPress}>
        {this.props.renderItem(info)}
      </ListItem>
    );
  };

  private renderOptionListElement(props: Partial<ListProps>): ListElement {
    return (
      <List
        style={styles.optionList}
        {...props}
        data={this.data}
        bounces={false}
        renderItem={props.renderItem && this.renderCustomOptionElement || this.renderOptionElement}
      />
    );
  }

  private renderInputElement = (props: Partial<InputProps>): InputElement => {
    return (
      <Input
        {...props}
        onFocus={this.onInputFocus}
      />
    );
  };

  private renderComponentChildren = (props: AutocompleteProps): React.ReactElement[] => {
    const { data, renderItem, placeholderData, ...inputProps } = props;
    return [
      this.renderInputElement(inputProps),
      this.renderOptionListElement({ data, renderItem }),
    ];
  };

  public render(): PopoverElement {
    const [inputElement, listElement]: React.ReactElement[] = this.renderComponentChildren(this.props);

    return (
      <Popover
        style={styles.popover}
        visible={this.state.optionsVisible}
        fullWidth={true}
        content={listElement}
        onBackdropPress={this.onBackdropPress}>
        {inputElement}
      </Popover>
    );
  }
}

const styles = StyleSheet.create({
  popover: {
    maxHeight: 192,
    overflow: 'hidden',
  },
  optionList: {
    flexGrow: 0,
    overflow: 'hidden',
  },
});

