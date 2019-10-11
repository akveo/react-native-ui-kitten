import React from 'react';
import { StyleSheet } from 'react-native';
import { Interaction } from '@kitten/theme';
import {
  Select as RNSelect,
  SelectElement as RNSelectElement,
  SelectProps as RNSelectProps,
  // @ts-ignore
} from './select.component.tsx';
import {
  WebEventResponder,
  WebEventResponderCallbacks,
  WebEventResponderInstance,
} from '../support/services';

export type SelectProps = RNSelectProps & WebEventResponderCallbacks;
export type SelectElement = React.ReactElement<SelectProps>;

export class Select extends React.Component<SelectProps> implements WebEventResponderCallbacks {

  private selectRef: React.RefObject<any> = React.createRef();
  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);

  private get isVisible(): boolean {
    return this.selectRef.current.state.visible;
  }

  public onMouseEnter = (): void => {
    if (!this.isVisible) {
      this.selectRef.current.props.dispatch([Interaction.HOVER]);
    }

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter();
    }
  };

  public onMouseLeave = (): void => {
    if (!this.isVisible) {
      this.selectRef.current.props.dispatch([]);
    }

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave();
    }
  };

  public onFocus = (): void => {
    this.selectRef.current.props.dispatch([Interaction.FOCUSED]);

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  public onBlur = (): void => {
    this.selectRef.current.props.dispatch([]);

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  public render(): RNSelectElement {
    const { controlStyle, ...restProps } = this.props;

    return (
      <RNSelect
        {...restProps}
        {...this.webEventResponder.eventHandlers}
        ref={this.selectRef}
        controlStyle={[controlStyle, styles.element]}
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
