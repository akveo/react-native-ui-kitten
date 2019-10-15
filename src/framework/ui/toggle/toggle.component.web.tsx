import React from 'react';
import { StyleSheet } from 'react-native';
import { Interaction } from '@kitten/theme';
import {
  Toggle as RNToggle,
  ToggleElement as RNToggleElement,
  ToggleProps as RNToggleProps,
  // @ts-ignore
} from './toggle.component.tsx';
import {
  WebEventResponder,
  WebEventResponderCallbacks,
  WebEventResponderInstance,
} from '../support/services';

export type ToggleProps = RNToggleProps & WebEventResponderCallbacks;
export type ToggleElement = React.ReactElement<ToggleProps>;

export class Toggle extends React.Component<ToggleProps> implements WebEventResponderCallbacks {

  private toggleRef: React.RefObject<any> = React.createRef();
  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);

  public onMouseEnter = (): void => {
    if (!this.props.disabled) {
      this.toggleRef.current.props.dispatch([Interaction.HOVER]);
    }

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter();
    }
  };

  public onMouseLeave = (): void => {
    if (!this.props.disabled) {
      this.toggleRef.current.props.dispatch([]);
    }

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave();
    }
  };

  public onFocus = (): void => {
    if (!this.props.disabled) {
      this.toggleRef.current.props.dispatch([Interaction.FOCUSED]);
    }

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  public onBlur = (): void => {
    if (!this.props.disabled) {
      this.toggleRef.current.props.dispatch([]);
    }

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  public render(): RNToggleElement {
    const { style, ...restProps } = this.props;

    return (
      <RNToggle
        {...restProps}
        {...this.webEventResponder.eventHandlers}
        ref={this.toggleRef}
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
