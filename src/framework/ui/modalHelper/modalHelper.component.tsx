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
  isBackDropAllowed?: boolean;
  identifier?: string;
  onCloseModal?: (index: string) => void;
}

export type ModalHelperProps = ViewProps & ComponentProps;

export class ModalHelper extends React.Component<ModalHelperProps> {

  static defaultProps: Partial<ModalHelperProps> = {
    visible: false,
    isBackDropAllowed: false,
  };

  private closeModal: () => void = (): void => {
    if (this.props.onCloseModal) {
      this.props.onCloseModal(this.props.identifier);
    }
  };

  private closeOnBackdrop: () => void = () => {
    if (this.props.isBackDropAllowed) {
      this.closeModal();
    }
  };

  private onStartShouldSetResponder = (): boolean => true;

  private onResponderRelease = (): void => {
    return;
  };

  private onStartShouldSetResponderCapture = (): boolean => false;

  private renderComponentChild = (source: React.ReactElement<any>): React.ReactElement<any> => {
    return React.cloneElement(source, {
      ...source.props,
      onCloseModal: this.closeModal,
      style: {
        ...source.props.style,
        ...StyleSheet.flatten(this.props.style),
      },
    });
  };

  private renderComponentChildren = (source: React.ReactNode): React.ReactElement<any>[] => {
    return React.Children.map(source, this.renderComponentChild);
  };

  private renderWithBackDrop = (component: React.ReactElement<ViewProps>) => (
    <TouchableOpacity
      style={styles.container}
      onPress={this.closeOnBackdrop}
      activeOpacity={1}>
      {component}
    </TouchableOpacity>
  );

  private renderWithoutBackDrop = (component: React.ReactElement<ViewProps>) => (
    <View style={styles.notVisibleWrapper}>
      <View
        style={styles.container}
        pointerEvents='none'/>
      {component}
    </View>
  );

  private renderComponent = (): React.ReactElement<TouchableOpacityProps | ViewProps> => {
    const { children, isBackDropAllowed, ...derivedProps } = this.props;
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

    return isBackDropAllowed ?
      this.renderWithBackDrop(dialog) : this.renderWithoutBackDrop(dialog);
  };

  public render(): React.ReactElement<ViewProps | TouchableOpacityProps> | null {
    return this.props.visible ? this.renderComponent() : null;
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  notVisibleWrapper: {
    position: 'absolute',
    width: 0,
    height: 0,
  },
  contentWrapper: {
    alignSelf: 'flex-start',
  },
});
