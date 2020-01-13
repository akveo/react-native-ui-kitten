/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { ModalPresentingConfig } from './modal.service';

type ChildElement = React.ReactElement;
type ChildrenProp = ChildElement | ChildElement[];

export interface ModalResolverProps extends ViewProps, ModalPresentingConfig {
  visible: boolean;
  children: ChildrenProp;
  backdropStyle: StyleProp<ViewStyle>;
  onBackdropPress: () => void;
}

export class ModalResolver extends React.Component<ModalResolverProps> {

  static defaultProps: Partial<ModalResolverProps> = {
    visible: false,
  };

  private renderChildElement = (source: ChildElement): ChildElement => {
    return React.cloneElement(source, {
      style: [source.props.style, this.props.style],
    });
  };

  private renderComponentChildren = (source: ChildrenProp): ChildElement[] => {
    return React.Children.map(source, this.renderChildElement);
  };

  private renderComponent = (): React.ReactElement<ViewProps> => {
    const componentChildren = this.renderComponentChildren(this.props.children);

    return (
      <View style={StyleSheet.absoluteFill}>
        <TouchableOpacity
          style={[StyleSheet.absoluteFill, this.props.backdropStyle]}
          activeOpacity={1.0}
          onPress={this.props.onBackdropPress}
        />
        {componentChildren}
      </View>
    );
  };

  public render(): React.ReactElement<ViewProps> | undefined {
    return this.props.visible && this.renderComponent();
  }
}
