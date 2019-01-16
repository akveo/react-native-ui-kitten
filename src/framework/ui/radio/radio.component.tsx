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

interface RadioProps {
  checked?: boolean;
  onChange?: (selected: boolean) => void;
  appearance?: string | 'default';
  status?: string | 'error';
  size?: string | 'big' | 'small';
}

export type Props = RadioProps & StyledComponentProps & TouchableOpacityProps;

export class Radio extends React.Component<Props> {

  onPress = () => {
    this.props.onChange && this.props.onChange(this.props.checked);
  };

  onPressIn = () => {
    this.props.dispatch([Interaction.ACTIVE]);
  };

  onPressOut = () => {
    this.props.dispatch([]);
  };

  getComponentStyle = (style: StyleType): StyleType => ({
    border: {
      width: style.size,
      height: style.size,
      borderRadius: style.size / 2,
      borderWidth: style.borderWidth,
      borderColor: style.borderColor,
    },
    select: {
      width: style.innerSize,
      height: style.innerSize,
      borderRadius: style.innerSize / 2,
      backgroundColor: style.selectColor,
    },
    highlight: {
      width: style.highlightSize,
      height: style.highlightSize,
      borderRadius: style.highlightSize / 2,
      backgroundColor: style.highlightColor,
      opacity: style.highlightOpacity,
    },
  });

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
            <View style={componentStyle.select}/>
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
