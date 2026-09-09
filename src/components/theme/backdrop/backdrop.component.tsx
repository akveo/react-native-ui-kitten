/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  PanResponder,
  PanResponderInstance,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';

type ChildElement = React.ReactElement<{ style?: StyleProp<ViewStyle> }>;
type ChildrenProp = ChildElement | ChildElement[] | React.ReactNode;

export interface BackdropPresentingConfig {
  backdropStyle?: StyleProp<ViewStyle>;
  onBackdropPress?: () => void;
  /**
   * Accessible name for the dismissable backdrop, e.g. `'Close'`.
   * When omitted the backdrop is hidden from assistive technology, since an
   * unlabelled full-screen target is noise rather than information.
   * No default is provided: the library ships no translations, so a built-in
   * English string would be wrong for most apps.
   */
  backdropAccessibilityLabel?: string;
}

export interface BackdropProps extends ViewProps, BackdropPresentingConfig {
  visible: boolean;
  children: ChildrenProp;
  backdropStyle: StyleProp<ViewStyle>;
  onBackdropPress: () => void;
}

export class Backdrop extends React.Component<BackdropProps> {

  static defaultProps: Partial<BackdropProps> = {
    visible: false,
  };

  private panResponder: PanResponderInstance;
  private touchStartY: number = 0;
  private isMoved: boolean = false;

  constructor(props: BackdropProps) {
    super(props);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt: GestureResponderEvent) => {
        this.touchStartY = evt.nativeEvent.pageY;
        this.isMoved = false;
      },
      onPanResponderMove: (evt: GestureResponderEvent) => {
        const moveDistance = Math.abs(evt.nativeEvent.pageY - this.touchStartY);
        // If user moved more than 10 pixels, consider it a scroll attempt
        if (moveDistance > 10 && !this.isMoved) {
          this.isMoved = true;
          this.props.onBackdropPress?.();
        }
      },
      onPanResponderRelease: () => {
        // If it wasn't a move (scroll), treat it as a tap
        if (!this.isMoved) {
          this.props.onBackdropPress?.();
        }
      },
    });
  }

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
        <View
          style={[StyleSheet.absoluteFill, this.props.backdropStyle]}
          testID='@backdrop'
          // Only becomes an accessibility element once it has a name. Without
          // one it stays a plain View, which is not focusable by assistive
          // technology anyway — dismissal remains available via the iOS escape
          // gesture and the Android back button.
          accessible={this.props.backdropAccessibilityLabel ? true : undefined}
          role={this.props.backdropAccessibilityLabel ? 'button' : undefined}
          aria-label={this.props.backdropAccessibilityLabel}
          {...this.panResponder.panHandlers}
        />
        {componentChildren}
      </View>
    );
  };

  public render(): React.ReactElement<ViewProps> | undefined {
    return this.props.visible && this.renderComponent();
  }
}
