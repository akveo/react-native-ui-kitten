import React from 'react';
import { StyleSheet } from 'react-native';
import { Interaction } from '@kitten/theme';
import {
  TopNavigationAction as RNTopNavigationAction,
  TopNavigationActionElement as RNTopNavigationActionElement,
  TopNavigationActionProps as RNTopNavigationActionProps,
  // @ts-ignore
} from './topNavigationAction.component.tsx';
import {
  WebEventResponder,
  WebEventResponderCallbacks,
  WebEventResponderInstance,
} from '../support/services';

export type TopNavigationActionProps = RNTopNavigationActionProps & WebEventResponderCallbacks;
export type TopNavigationActionElement = React.ReactElement<TopNavigationActionProps>;

export class TopNavigationAction extends React.Component<TopNavigationActionProps>
  implements WebEventResponderCallbacks {

  private topNavigationActionRef: React.RefObject<any> = React.createRef();
  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);

  public onMouseEnter = (): void => {
    this.topNavigationActionRef.current.props.dispatch([Interaction.HOVER]);

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter();
    }
  };

  public onMouseLeave = (): void => {
    this.topNavigationActionRef.current.props.dispatch([]);

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave();
    }
  };

  public onFocus = (): void => {
    this.topNavigationActionRef.current.props.dispatch([Interaction.FOCUSED]);

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  public onBlur = (): void => {
    this.topNavigationActionRef.current.props.dispatch([]);

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  public render(): RNTopNavigationActionElement {
    const { style, ...restProps } = this.props;

    return (
      <RNTopNavigationAction
        {...restProps}
        {...this.webEventResponder.eventHandlers}
        ref={this.topNavigationActionRef}
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
