import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableOpacityProps,
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

  private onPressIn = () => {
    this.props.dispatch([Interaction.ACTIVE]);
  };

  private onPressOut = () => {
    this.props.dispatch([]);
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
      },
      icon: {
        width: style.size / 2,
        height: style.size / 8,
        backgroundColor: style.selectColor,
      },
      highlight: {
        width: style.highlightSize,
        height: style.highlightSize,
        borderRadius: style.highlightBorderRadius,
        backgroundColor: style.highlightColor,
        opacity: style.highlightOpacity,
      },
    };
  };

  public render(): React.ReactNode {
    const componentStyle: StyleType = this.getComponentStyle(this.props.themedStyle);

    return (
      <TouchableOpacity
        {...this.props}
        activeOpacity={1.0}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <View style={styles.border}>
          <View style={[styles.highlight, componentStyle.highlight]}/>
          <View style={[styles.border, componentStyle.border]}>
            <CheckMark style={componentStyle.icon}/>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  border: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlight: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
