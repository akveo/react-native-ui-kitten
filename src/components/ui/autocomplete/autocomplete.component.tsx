/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  ListRenderItemInfo,
  StyleSheet,
  View,
} from 'react-native';
import {
  Input,
  InputComponent,
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
 * @method {() => void} show - Sets data list visible.
 *
 * @method {() => void} hide - Sets data list invisible.
 *
 * @method {() => void} focus - Focuses Autocomplete and sets data list visible.
 *
 * @method {() => void} blur - Removes focus from Autocomplete and sets data list invisible.
 * This is the opposite of `focus()`.
 *
 * @method {() => boolean} isFocused - Returns true if the Autocomplete is currently focused and visible.
 *
 * @method {() => void} clear - Removes all text from the Autocomplete.
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

  private popoverRef: React.RefObject<Popover> = React.createRef();
  private inputRef: React.RefObject<InputComponent> = React.createRef();

  private get data(): O[] {
    const hasData: boolean = this.props.data && this.props.data.length > 0;
    return hasData && this.props.data || this.props.placeholderData;
  }

  public show = (): void => {
    this.popoverRef.current.show();
  };

  public hide = (): void => {
    this.popoverRef.current.hide();
  };

  public focus = (): void => {
    this.inputRef.current.focus();
  };

  public blur = (): void => {
    this.inputRef.current.blur();
  };

  public isFocused = (): boolean => {
    return this.inputRef.current.isFocused();
  };

  public clear = (): void => {
    this.inputRef.current.clear();
  };

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
        ref={this.inputRef}
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
        ref={this.popoverRef}
        style={styles.popover}
        visible={this.state.optionsVisible}
        fullWidth={true}
        content={listElement}
        onBackdropPress={this.onBackdropPress}>
        <View>
          {inputElement}
        </View>
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

