/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  ListRenderItemInfo,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
  View,
} from 'react-native';
import {
  Input,
  InputElement,
  InputProps,
} from '../input/input.component';
import { List } from '../list/list.component';
import {
  ListItem,
  ListItemElement,
} from '../list/listItem.component';
import {
  Popover,
  PopoverElement,
} from '../popover/popover.component';
import { PopoverPlacement } from '../popover/type';

export interface AutocompleteOption {
  title: string;
}

type Option = AutocompleteOption;

export interface AutocompleteProps<O extends Option = Option> extends InputProps {
  data?: O[];
  placeholderData?: O[];
  onSelect?: (option: O) => void;
  renderItem?: (info: ListRenderItemInfo<O>) => React.ReactElement;
  placement?: string;
}

export type AutocompleteElement<O extends Option = Option> = React.ReactElement<AutocompleteProps<O>>;

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
 * @method {() => void} focus - Focuses an input field and sets data list visible.
 *
 * @method {() => void} blur - Removes focus from input field and sets data list invisible.
 *
 * @method {() => boolean} isFocused - Returns true if the input field is currently focused.
 *
 * @method {() => void} clear - Removes all text from the input field.
 *
 * @property {AutocompleteOption[]} data - Options displayed in component.
 * Each option can be any type, but should contain `title` property.
 *
 * @property {(option: AutocompleteOption) => void} onSelect - Called when option is pressed.
 *
 * @property {AutocompleteOption[]} placeholderData - Options displayed in component
 * when data is nullable of empty.
 *
 * @property {(info: ListRenderItemInfo<AutocompleteOption>) => ReactElement} renderItem - Takes an
 * item from `data` and renders it into the list.
 * If not provided, ListItem is rendered.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Default is `basic`.
 *
 * @property {string} size - Determines the size of the component.
 * Can be `small`, `medium` or `large`.
 * Default is `medium`.
 *
 * @property {string | (props: TextProps) => ReactElement} label - A string or a function component
 * to render to top of the input field.
 * If it is a function, it will be called with props provided by Eva.
 * Otherwise, renders a Text styled by Eva.
 *
 * @property {(props: ImageProps) => ReactElement} accessoryLeft - A function component
 * to render to start of the text.
 * Called with props provided by Eva.
 *
 * @property {(props: ImageProps) => ReactElement} accessoryRight - A function component
 * to render to end of the text.
 * Called with props provided by Eva.
 *
 * @property {string | PopoverPlacement} placement - Position of the options list relative to the input field.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Default is `bottom`.
 * Tip: use one of predefined placements instead of strings, e.g `PopoverPlacements.TOP`
 *
 * @property {() => void} onFocus - Called when options list becomes visible.
 *
 * @property {() => void} onBlur - Called when options list becomes invisible.
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
 * @example AutocompleteHandleKeyboard
 *
 * @example AutocompleteAsync
 */
export class Autocomplete<O extends Option = Option> extends React.Component<AutocompleteProps<O>, State> {

  public state: State = {
    optionsVisible: false,
  };

  private popoverRef: React.RefObject<Popover> = React.createRef();
  private inputRef: React.RefObject<any> = React.createRef();

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

  private onInputFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>): void => {
    this.setState({ optionsVisible: true });

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  };

  private onBackdropPress = (): void => {
    this.blur();
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
        onPress={() => this.onOptionPress(info.index)}>
        {this.props.renderItem && this.props.renderItem(info)}
      </ListItem>
    );
  };

  private renderInputElement = (props: InputProps): InputElement => {
    return (
      <View>
        <Input
          ref={this.inputRef}
          {...props}
          onFocus={this.onInputFocus}
        />
      </View>
    );
  };

  public render(): PopoverElement {
    const { data, renderItem, placeholderData, placement, ...inputProps } = this.props;

    return (
      <Popover
        ref={this.popoverRef}
        style={styles.popover}
        placement={placement}
        visible={this.state.optionsVisible}
        fullWidth={true}
        anchor={() => this.renderInputElement(inputProps)}
        onBackdropPress={this.onBackdropPress}>
        <List
          style={styles.optionList}
          data={this.data}
          bounces={false}
          renderItem={renderItem || this.renderOptionElement}
        />
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

