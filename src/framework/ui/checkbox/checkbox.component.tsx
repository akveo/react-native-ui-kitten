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
import { CheckMark } from '../drawable/checkmark/checkmark.component';

interface CheckBoxProps {
  checked?: boolean;
  status?: string;
  size?: string;
  onChange?: (checked: boolean) => void;
}

export type Props = CheckBoxProps & StyledComponentProps & TouchableOpacityProps;

export class CheckBox extends React.Component<Props> {

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
        borderRadius: style.borderRadius,
        borderWidth: style.borderWidth,
        borderColor: style.borderColor,
        backgroundColor: style.backgroundColor,
        ...strictStyles.border,
      },
      icon: {
        width: style.size / 2,
        height: style.size / 8,
        backgroundColor: style.selectColor,
        ...strictStyles.icon,
      },
      highlight: {
        width: style.highlightSize,
        height: style.highlightSize,
        borderRadius: style.highlightBorderRadius,
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
            <CheckMark style={icon}/>
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
