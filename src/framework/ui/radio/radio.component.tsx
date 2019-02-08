import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableOpacityProps,
  GestureResponderEvent,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
  Interaction,
} from '@kitten/theme';

interface RadioProps {
  checked?: boolean;
  status?: string;
  size?: string;
  onChange?: (selected: boolean) => void;
}

export type Props = RadioProps & StyledComponentProps & TouchableOpacityProps;

export class Radio extends React.Component<Props> {

  private onPress = () => {
    if (this.props.onChange) {
      this.props.onChange(!this.props.checked);
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
    return {
      border: {
        width: style.size,
        height: style.size,
        borderRadius: style.size / 2,
        borderWidth: style.borderWidth,
        borderColor: style.borderColor,
        ...strictStyles.border,
      },
      icon: {
        width: style.innerSize,
        height: style.innerSize,
        borderRadius: style.innerSize / 2,
        backgroundColor: style.selectColor,
        ...strictStyles.icon,
      },
      highlight: {
        width: style.highlightSize,
        height: style.highlightSize,
        borderRadius: style.highlightSize / 2,
        backgroundColor: style.highlightColor,
        opacity: style.highlightOpacity,
        ...strictStyles.highlight,
      },
    };
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, ...derivedProps } = this.props;
    const { border, icon, highlight } = this.getComponentStyle(themedStyle);

    return (
      <TouchableOpacity
        {...derivedProps}
        activeOpacity={1.0}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <View style={strictStyles.border}>
          <View style={highlight}/>
          <View style={border}>
            <View style={icon}/>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const strictStyles = StyleSheet.create({
  border: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {},
  highlight: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
