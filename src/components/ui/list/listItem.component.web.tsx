import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ListItem as RNListItem,
  ListItemElement as RNListItemElement,
  ListItemProps as RNListItemProps,
  // @ts-ignore
} from './listItem.component.tsx';
import {
  WebEventResponder,
  WebEventResponderCallbacks,
  WebEventResponderInstance,
} from '../support/services';

export type ListItemProps = RNListItemProps & WebEventResponderCallbacks;
export type ListItemElement = React.ReactElement<ListItemProps>;

export class ListItem extends React.Component<ListItemProps> implements WebEventResponderCallbacks {

  private listItemRef: React.RefObject<any> = React.createRef();
  private webEventResponder: WebEventResponderInstance = WebEventResponder.create(this);

  public onMouseEnter = (): void => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter();
    }
  };

  public onMouseLeave = (): void => {
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

  public render(): RNListItemElement {
    const { style, ...restProps } = this.props;

    return (
      <RNListItem
        {...restProps}
        {...this.webEventResponder.eventHandlers}
        ref={this.listItemRef}
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
