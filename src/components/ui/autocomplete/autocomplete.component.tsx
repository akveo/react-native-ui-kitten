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
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import { ChildrenWithProps } from '../../devsupport';
import {
  Input,
  InputElement,
  InputProps,
} from '../input/input.component';
import { List } from '../list/list.component';
import {
  Popover,
  PopoverElement,
} from '../popover/popover.component';
import {
  AutocompleteItemElement,
  AutocompleteItemProps,
} from './autocompleteItem.component';

export interface AutocompleteProps extends InputProps {
  children?: ChildrenWithProps<AutocompleteItemProps>;
  onSelect?: (index: number) => void;
  placement?: string;
}

export type AutocompleteElement = React.ReactElement<AutocompleteProps>;

interface State {
  listVisible: boolean;
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
 * @property {ReactElement<AutocompleteItemProps> | ReactElement<AutocompleteItemProps>[]} children -
 * Options displayed within list.
 *
 * @property {(number) => void} onSelect - Called when option is pressed.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *basic*.
 * Useful for giving user a hint on the input validity.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {string} size - Size of the component.
 * Can be `small`, `medium` or `large`.
 * Defaults to *medium*.
 *
 * @property {ReactText | (TextProps) => ReactElement} label - String, number or a function component
 * to render to top of the input field.
 * If it is a function, expected to return a Text.
 *
 * @property {(ImageProps) => ReactElement} accessoryLeft - Function component
 * to render to start of the text.
 * Expected to return an Image.
 *
 * @property {(ImageProps) => ReactElement} accessoryRight - Function component
 * to render to end of the text.
 * Expected to return an Image.
 *
 * @property {string | PopoverPlacement} placement - Position of the options list relative to the input field.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Defaults to *bottom*.
 *
 * @property {() => void} onFocus - Called when options list becomes visible.
 *
 * @property {() => void} onBlur - Called when options list becomes invisible.
 *
 * @property {InputProps} ...InputProps - Any props applied to Input component.
 *
 * @overview-example AutocompleteSimpleUsage
 * Autocomplete may contain options to be rendered within suggestions list.
 * Options should be provided by passing them to children.
 *
 * @overview-example AutocompleteAccessories
 * Autocomplete may contain accessories by passing `accessoryLeft` or `accessoryRight` props.
 * By default, we expect it to be images.
 *
 * @example AutocompleteHandleKeyboard
 * On mobile devices, options may be overlapped by keyboard.
 * It can be handled with `placement` property.
 *
 * @example AutocompleteAsync
 * For requesting a real-world data by typing, http requests may be sent with debounce.
 */
export class Autocomplete extends React.Component<AutocompleteProps, State> {

  public state: State = {
    listVisible: false,
  };

  private popoverRef = React.createRef<Popover>();
  private inputRef = React.createRef<Input>();

  private get data(): any[] {
    return React.Children.toArray(this.props.children || []);
  }

  public show = (): void => {
    this.popoverRef.current?.show();
  };

  public hide = (): void => {
    this.popoverRef.current?.hide();
  };

  public focus = (): void => {
    this.inputRef.current?.focus();
  };

  public blur = (): void => {
    this.inputRef.current?.blur();
  };

  public isFocused = (): boolean => {
    return this.inputRef.current?.isFocused();
  };

  public clear = (): void => {
    this.inputRef.current?.clear();
  };

  public componentDidUpdate(prevProps: AutocompleteProps): void {
    const isChildCountChanged: boolean = this.data.length !== React.Children.count(prevProps.children);
    const shouldBecomeVisible: boolean = !this.state.listVisible && this.isFocused() && isChildCountChanged;

    shouldBecomeVisible && this.setState({ listVisible: shouldBecomeVisible });
  }

  private onInputFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>): void => {
    this.setOptionsListVisible();
    this.props.onFocus && this.props.onFocus(event);
  };

  private onInputSubmitEditing = (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>): void => {
    this.setOptionsListInvisible();
    this.props.onSubmitEditing && this.props.onSubmitEditing(e);
  };

  private onBackdropPress = (): void => {
    this.blur();
    this.setOptionsListInvisible();
  };

  private onItemPress = (index: number): void => {
    if (this.props.onSelect) {
      this.setOptionsListInvisible();
      this.props.onSelect(index);
    }
  };

  private setOptionsListVisible = (): void => {
    const hasData: boolean = this.data.length > 0;
    hasData && this.setState({ listVisible: true });
  };

  private setOptionsListInvisible = (): void => {
    this.setState({ listVisible: false });
  };

  private renderItem = (info: ListRenderItemInfo<AutocompleteItemElement>): AutocompleteItemElement => {
    return React.cloneElement(info.item, { onPress: () => this.onItemPress(info.index) });
  };

  private renderInputElement = (props: InputProps): InputElement => {
    return (
      <View>
        <Input
          {...props}
          ref={this.inputRef}
          onFocus={this.onInputFocus}
          onSubmitEditing={this.onInputSubmitEditing}
        />
      </View>
    );
  };

  public render(): PopoverElement {
    const { placement, children, testID, ...inputProps } = this.props;

    return (
      <Popover
        ref={this.popoverRef}
        style={styles.popover}
        placement={placement}
        testID={testID}
        visible={this.state.listVisible}
        fullWidth={true}
        anchor={() => this.renderInputElement(inputProps)}
        onBackdropPress={this.onBackdropPress}>
        <List
          style={styles.list}
          keyboardShouldPersistTaps='always'
          data={this.data}
          bounces={false}
          renderItem={this.renderItem}
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
  list: {
    flexGrow: 0,
    overflow: 'hidden',
  },
});

