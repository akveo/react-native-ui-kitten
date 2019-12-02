import React from 'react';
import { StyleSheet } from 'react-native';
import { Interaction } from '@kitten/theme';
import {
  Radio as RNRadio,
  RadioElement as RNRadioElement,
  RadioProps as RNRadioProps,
  // @ts-ignore
} from './radio.component.tsx';
import {
  WebEventResponder,
  WebEventResponderCallbacks,
  WebEventResponderInstance,
} from '../support/services';

export type RadioProps = RNRadioProps & WebEventResponderCallbacks;
export type RadioElement = React.ReactElement<RadioProps>;

export class Radio extends React.Component<RadioProps> implements WebEventResponderCallbacks {

  private radioRef: React.RefObject<any> = React.createRef();
  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);

  public onMouseEnter = (): void => {
    this.radioRef.current.props.dispatch([Interaction.HOVER]);

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter();
    }
  };

  public onMouseLeave = (): void => {
    this.radioRef.current.props.dispatch([]);

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave();
    }
  };

  public onFocus = (): void => {
    this.radioRef.current.props.dispatch([Interaction.FOCUSED]);

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  public onBlur = (): void => {
    this.radioRef.current.props.dispatch([]);

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  public render(): RNRadioElement {
    const { textStyle, ...restProps } = this.props;

    return (
      <RNRadio
        {...restProps}
        {...this.webEventResponder.eventHandlers}
        style={[textStyle, styles.element]}
        ref={this.radioRef}
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
