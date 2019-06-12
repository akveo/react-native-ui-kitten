/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  GestureResponderEvent,
  ImageProps,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {
  Interaction,
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

type IconElement = React.ReactElement<ImageProps>;
type IconProp = (style: StyleType) => IconElement;

interface ComponentProps {
  icon: IconProp;
}

export type TopNavigationActionProps = StyledComponentProps & TouchableOpacityProps & ComponentProps;

/**
 * The `TopNavigationAction` component is a part of the TopNavigation component.
 * Top Navigation Actions should be used in TopNavigation to provide usable component.
 * See usage examples at TopNavigation component documentation.
 *
 * @extends React.Component
 *
 * @property {(style: StyleType) => React.ReactElement<ImageProps>} icon - Determines the icon of the tab.
 *
 * @property TouchableOpacityProps
 *
 * @property StyledComponentProps
 */

class TopNavigationActionComponent extends React.Component<TopNavigationActionProps> {

  static styledComponentName: string = 'TopNavigationAction';

  private onPress = (event: GestureResponderEvent) => {
    if (this.props.onPress) {
      this.props.onPress(event);
    }
  };

  private onPressIn = (event: GestureResponderEvent) => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent) => {
    this.props.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(event);
    }
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      iconTintColor,
      iconWidth,
      iconHeight,
      iconMarginHorizontal,
    } = source;

    const hitSlop: number = 40 - iconWidth;

    return {
      container: {
        marginHorizontal: iconMarginHorizontal,
        ...styles.container,
        ...StyleSheet.flatten(this.props.style),
      },
      icon: {
        tintColor: iconTintColor,
        width: iconWidth,
        height: iconHeight,
        ...styles.icon,
      },
      hitSlop: {
        top: hitSlop,
        left: hitSlop,
        bottom: hitSlop,
        right: hitSlop,
      },
    };
  };

  private renderIconElement = (style: StyleType): React.ReactElement<ImageProps> => {
    return this.props.icon(style);
  };

  public render(): React.ReactNode {
    const { themedStyle, icon, ...touchableProps } = this.props;

    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        hitSlop={componentStyle.hitSlop}
        {...touchableProps}
        style={componentStyle.container}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        {this.renderIconElement(componentStyle.icon)}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  icon: {},
});

export const TopNavigationAction = styled<TopNavigationActionProps>(TopNavigationActionComponent);
