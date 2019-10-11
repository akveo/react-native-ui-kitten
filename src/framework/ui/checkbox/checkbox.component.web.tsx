import React from 'react';
import { StyleSheet } from 'react-native';
import { Interaction } from '@kitten/theme';
import {
  CheckBox as RNCheckBox,
  CheckBoxElement as RNCheckBoxElement,
  CheckBoxProps as RNCheckBoxProps,
  // @ts-ignore
} from './checkbox.component.tsx';
import {
  WebEventResponder,
  WebEventResponderCallbacks,
  WebEventResponderInstance,
} from '../support/services';

export type CheckBoxProps = RNCheckBoxProps & WebEventResponderCallbacks;
export type CheckBoxElement = React.ReactElement<CheckBoxProps>;

export class CheckBox extends React.Component<CheckBoxProps> implements WebEventResponderCallbacks {

  private checkboxRef: React.RefObject<any> = React.createRef();
  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);

  public onMouseEnter = (): void => {
    this.checkboxRef.current.props.dispatch([Interaction.HOVER]);

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter();
    }
  };

  public onMouseLeave = (): void => {
    this.checkboxRef.current.props.dispatch([]);

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave();
    }
  };

  public onFocus = (): void => {
    this.checkboxRef.current.props.dispatch([Interaction.FOCUSED]);

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  public onBlur = (): void => {
    this.checkboxRef.current.props.dispatch([]);

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  public render(): RNCheckBoxElement {
    const { style, ...restProps } = this.props;

    return (
      <RNCheckBox
        {...restProps}
        {...this.webEventResponder.eventHandlers}
        ref={this.checkboxRef}
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
