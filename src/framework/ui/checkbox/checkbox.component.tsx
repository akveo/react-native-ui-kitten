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
import { CheckMark } from '@kitten/ui/drawable/checkmark/checkmark.component';

interface CheckBoxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  appearance?: string | 'default';
  status?: string | 'error';
  size?: string | 'big' | 'small';
}

export type Props = CheckBoxProps & StyledComponentProps & TouchableOpacityProps;

export class CheckBox extends React.Component<Props> {

  onPress = () => {
    this.props.onChange && this.props.onChange(this.props.checked);
  };

  onPressIn = () => {
    this.props.dispatch([Interaction.ACTIVE]);
  };

  onPressOut = () => {
    this.props.dispatch([]);
  };

  // We don't use `check-mark` icon currently
  // FIXME: Use icon

  private getComponentStyle = (style: StyleType): StyleType => {
    return ({
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
    });
  };

  render() {
    const componentStyle = this.getComponentStyle(this.props.themedStyle);
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
