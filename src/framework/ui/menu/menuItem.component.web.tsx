import React from 'react';
import { StyleSheet } from 'react-native';
import { Interaction } from '@kitten/theme';
import {
  MenuItem as RNMenuItem,
  MenuItemElement as RNMenuItemElement,
  MenuItemProps as RNMenuItemProps,
  // @ts-ignore
} from './menuItem.component.tsx';
import {
  WebEventResponder,
  WebEventResponderCallbacks,
  WebEventResponderInstance,
} from '../support/services';

export type MenuItemProps = RNMenuItemProps & WebEventResponderCallbacks;
export type MenuItemElement = React.ReactElement<MenuItemProps>;

export class MenuItem extends React.Component<MenuItemProps> implements WebEventResponderCallbacks {

  private menuItemRef: React.RefObject<any> = React.createRef();
  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);

  public onMouseEnter = (): void => {
    this.menuItemRef.current.props.dispatch([Interaction.HOVER]);

    if (this.props.onMouseEnter) {
      this.props.onMouseEnter();
    }
  };

  public onMouseLeave = (): void => {
    this.menuItemRef.current.props.dispatch([]);

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave();
    }
  };

  public onFocus = (): void => {
    this.menuItemRef.current.props.dispatch([Interaction.FOCUSED]);

    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  public onBlur = (): void => {
    this.menuItemRef.current.props.dispatch([]);

    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  public render(): RNMenuItemElement {
    const { textStyle, ...restProps } = this.props;

    return (
      <RNMenuItem
        {...restProps}
        {...this.webEventResponder.eventHandlers}
        ref={this.menuItemRef}
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
