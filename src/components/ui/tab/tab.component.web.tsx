import React from 'react';
import { StyleSheet } from 'react-native';
import { Interaction } from '@kitten/theme';
import {
  Tab as RNTab,
  TabElement as RNTabElement,
  TabProps as RNTabProps,
  // @ts-ignore
} from './tab.component.tsx';
import {
  WebEventResponder,
  WebEventResponderCallbacks,
  WebEventResponderInstance,
} from '../support/services';

export type TabProps = RNTabProps & WebEventResponderCallbacks;
export type TabElement = React.ReactElement<TabProps>;

export class Tab extends React.Component<TabProps> implements WebEventResponderCallbacks {

  private tabRef: React.RefObject<any> = React.createRef();
  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);

  public onMouseEnter = (): void => {
    this.tabRef.current.props.dispatch([Interaction.HOVER]);

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter();
    }
  };

  public onMouseLeave = (): void => {
    this.tabRef.current.props.dispatch([]);

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

  public render(): RNTabElement {
    const { style, ...restProps } = this.props;

    return (
      <RNTab
        {...restProps}
        {...this.webEventResponder.eventHandlers}
        ref={this.tabRef}
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
