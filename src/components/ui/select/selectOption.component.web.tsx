import React from 'react';
import { StyleSheet } from 'react-native';
import { Interaction } from '@kitten/theme';
import {
  SelectOption as RNSelectOption,
  SelectOptionElement as RNSelectOptionElement,
  SelectOptionProps as RNSelectOptionProps,
  // @ts-ignore
} from './selectOption.component.tsx';
import {
  WebEventResponder,
  WebEventResponderCallbacks,
  WebEventResponderInstance,
} from '../support/services';

export type SelectOptionProps = RNSelectOptionProps & WebEventResponderCallbacks;
export type SelectOptionElement = React.ReactElement<SelectOptionProps>;

export class SelectOption extends React.Component<SelectOptionProps> implements WebEventResponderCallbacks {

  private selectOptionRef: React.RefObject<any> = React.createRef();
  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);

  public onMouseEnter = (): void => {
    this.selectOptionRef.current.props.dispatch([Interaction.HOVER]);

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter();
    }
  };

  public onMouseLeave = (): void => {
    this.selectOptionRef.current.props.dispatch([]);

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave();
    }
  };

  public onFocus = (): void => {
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  public onBlur = (): void => {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  public render(): RNSelectOptionElement {
    const { textStyle, ...restProps } = this.props;

    return (
      <RNSelectOption
        {...restProps}
        {...this.webEventResponder.eventHandlers}
        ref={this.selectOptionRef}
        style={[textStyle, styles.element]}
      />
    );
  }
}

const styles = StyleSheet.create({
  element: {
    // @ts-ignore
    outlineWidth: 0,
  },
});
