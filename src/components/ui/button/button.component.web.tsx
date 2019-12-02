import React from 'react';
import { StyleSheet } from 'react-native';
import { Interaction } from '@kitten/theme';
import {
  Button as RNButton,
  ButtonElement as RNButtonElement,
  ButtonProps as RNButtonProps,
  // @ts-ignore
} from './button.component.tsx';
import {
  WebEventResponder,
  WebEventResponderCallbacks,
  WebEventResponderInstance,
} from '../support/services';

export type ButtonProps = RNButtonProps & WebEventResponderCallbacks;
export type ButtonElement = React.ReactElement<ButtonProps>;

export class Button extends React.Component<ButtonProps> implements WebEventResponderCallbacks {

  private buttonRef: React.RefObject<any> = React.createRef();
  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);

  public onMouseEnter = (): void => {
    this.buttonRef.current.props.dispatch([Interaction.HOVER]);

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter();
    }
  };

  public onMouseLeave = (): void => {
    this.buttonRef.current.props.dispatch([]);

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave();
    }
  };

  public onFocus = (): void => {
    this.buttonRef.current.props.dispatch([Interaction.FOCUSED]);

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  public onBlur = (): void => {
    this.buttonRef.current.props.dispatch([]);

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  public render(): RNButtonElement {
    const { style, ...restProps } = this.props;

    return (
      <RNButton
        {...restProps}
        {...this.webEventResponder.eventHandlers}
        ref={this.buttonRef}
        style={[style, styles.element]}
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
