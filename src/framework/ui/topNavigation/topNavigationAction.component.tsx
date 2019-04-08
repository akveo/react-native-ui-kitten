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
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface TopNavigationActionProps {
  icon: (style: StyleType) => React.ReactElement<ImageProps>;
}

export type Props = StyledComponentProps & TouchableOpacityProps & TopNavigationActionProps;

export class TopNavigationAction extends React.Component<Props> {

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

  private getComponentStyle = (style: StyleType): StyleType => {
    const { iconTintColor, ...containerStyle } = style;

    return {
      container: {
        ...containerStyle,
        ...styles.container,
      },
      icon: {
        tintColor: iconTintColor,
        ...styles.icon,
      },
    };
  };

  private renderIcon(style: StyleType): React.ReactElement<ImageProps> {
    return this.props.icon(style);
  }

  public render(): React.ReactNode {
    const { style, themedStyle, icon, ...touchableProps } = this.props;

    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...touchableProps}
        style={[componentStyle.container, style]}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        {this.renderIcon(componentStyle.icon)}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  icon: {
    flex: 1,
  },
});
