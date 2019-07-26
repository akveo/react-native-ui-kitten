/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  View,
  ViewProps,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type ChildElement = React.ReactElement<any>;
type ChildrenProp = ChildElement | ChildElement[];

interface ComponentProps {
  visible: boolean;
  children: ChildrenProp;
  allowBackdrop: boolean;
  onBackdropPress: () => void;
}

export type ModalResolverProps = ViewProps & ComponentProps;

export class ModalResolver extends React.Component<ModalResolverProps> {

  static defaultProps: Partial<ModalResolverProps> = {
    visible: false,
  };

  private onBackdropPress = (): void => {
    const { allowBackdrop, onBackdropPress } = this.props;

    if (allowBackdrop) {
      onBackdropPress();
    }
  };

  private onStartShouldSetResponder = (): boolean => {
    return true;
  };

  private onResponderRelease = (): void => {
    return;
  };

  private onStartShouldSetResponderCapture = (): boolean => {
    return false;
  };

  private renderComponentChild = (source: React.ReactElement<any>): React.ReactElement<any> => {
    return React.cloneElement(source, {
      style: [source.props.style, this.props.style],
    });
  };

  private renderComponentChildren = (source: React.ReactNode): React.ReactElement<any>[] => {
    return React.Children.map(source, this.renderComponentChild);
  };

  private renderWithBackDrop = (component: React.ReactElement<ViewProps>):
    React.ReactElement<TouchableOpacityProps> => {

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.onBackdropPress}
        activeOpacity={1}>
        {component}
      </TouchableOpacity>
    );
  };

  private renderWithoutBackDrop = (component: React.ReactElement<ViewProps>): React.ReactElement<ViewProps> => {
    return (
      <View style={styles.notVisibleWrapper}>
        <View
          style={styles.container}
          pointerEvents='none'/>
        {component}
      </View>
    );
  };

  private renderComponent = (): React.ReactElement<TouchableOpacityProps | ViewProps> => {
    const { children, allowBackdrop, ...derivedProps } = this.props;
    const componentChildren: React.ReactElement<any>[] = this.renderComponentChildren(children);

    const dialog: React.ReactElement<ViewProps> =
      <View
        {...derivedProps}
        style={styles.contentWrapper}
        onStartShouldSetResponder={this.onStartShouldSetResponder}
        onResponderRelease={this.onResponderRelease}
        onStartShouldSetResponderCapture={this.onStartShouldSetResponderCapture}
        pointerEvents='box-none'>
        {componentChildren}
      </View>;

    return allowBackdrop ?
      this.renderWithBackDrop(dialog) : this.renderWithoutBackDrop(dialog);
  };

  public render(): React.ReactElement<ViewProps | TouchableOpacityProps> | null {
    return this.props.visible ? this.renderComponent() : null;
  }
}

const styles = StyleSheet.create({
  container: StyleSheet.absoluteFillObject,
  notVisibleWrapper: {
    position: 'absolute',
    width: 0,
    height: 0,
  },
  contentWrapper: {
    alignSelf: 'flex-start',
  },
});
