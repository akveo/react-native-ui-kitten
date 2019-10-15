import React from 'react';
import { StyleSheet } from 'react-native';
import { Interaction } from '@kitten/theme';
import {
  Input as RNInput,
  InputElement as RNInputElement,
  InputProps as RNInputProps,
  // @ts-ignore
} from './input.component.tsx';
import {
  WebEventResponder,
  WebEventResponderCallbacks,
  WebEventResponderInstance,
} from '../support/services';

export type InputProps = RNInputProps & WebEventResponderCallbacks;
export type InputElement = React.ReactElement<InputProps>;

export class Input extends React.Component<InputProps> implements WebEventResponderCallbacks {

  private inputRef: React.RefObject<any> = React.createRef();
  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);

  public onMouseEnter = (): void => {
    this.inputRef.current.props.dispatch([Interaction.HOVER]);

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter();
    }
  };

  public onMouseLeave = (): void => {
    this.inputRef.current.props.dispatch([]);

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

  public render(): RNInputElement {
    const { textStyle, ...restProps } = this.props;

    return (
      <RNInput
        {...restProps}
        {...this.webEventResponder.eventHandlers}
        ref={this.inputRef}
        textStyle={[textStyle, styles.text]}
      />
    );
  }
}

const styles = StyleSheet.create({
  text: {
    // @ts-ignore
    outlineWidth: 0,
  },
});
