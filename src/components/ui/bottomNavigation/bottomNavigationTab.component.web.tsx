import React from 'react';
import { StyleSheet } from 'react-native';
import { Interaction } from '@kitten/theme';
import {
  BottomNavigationTab as RNBottomNavigationTab,
  BottomNavigationTabElement as RNBottomNavigationTabElement,
  BottomNavigationTabProps as RNBottomNavigationTabProps,
  // @ts-ignore
} from './bottomNavigationTab.component.tsx';
import {
  WebEventResponder,
  WebEventResponderCallbacks,
  WebEventResponderInstance,
} from '../support/services';

export type BottomNavigationTabProps = RNBottomNavigationTabProps & WebEventResponderCallbacks;
export type BottomNavigationTabElement = React.ReactElement<BottomNavigationTabProps>;

export class BottomNavigationTab extends React.Component<BottomNavigationTabProps>
  implements WebEventResponderCallbacks {

  private bottomNavigationTabRef: React.RefObject<any> = React.createRef();
  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);

  public onMouseEnter = (): void => {
    this.bottomNavigationTabRef.current.props.dispatch([Interaction.HOVER]);

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter();
    }
  };

  public onMouseLeave = (): void => {
    this.bottomNavigationTabRef.current.props.dispatch([]);

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

  public render(): RNBottomNavigationTabElement {
    const { style, ...restProps } = this.props;

    return (
      <RNBottomNavigationTab
        {...restProps}
        {...this.webEventResponder.eventHandlers}
        ref={this.bottomNavigationTabRef}
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
