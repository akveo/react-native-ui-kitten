import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@rk-kit/theme';

interface RadioProps {
  onChange?: (selected: boolean) => void;
  selected?: boolean;
  variant?: string | 'default' | 'small' | 'large' | 'success' | 'info' | 'warning' | 'danger';
}

export type Props = RadioProps & StyledComponentProps;

export class Radio extends React.Component<Props> {

  static defaultProps: Props = {
    selected: false,
    variant: 'default',
  };

  onPress = () => {
    if (this.props.onChange !== undefined) {
      this.props.onChange(this.props.selected);
    }
  };

  getStateStyles = () => ({
    container: {},
    selection: {
      opacity: this.props.selected ? 1 : 0,
    },
  });

  getThemedStyles = (themedStyle: StyleType) => ({
    container: {
      width: themedStyle.size,
      height: themedStyle.size,
      borderRadius: themedStyle.size / 2,
      borderWidth: themedStyle.borderWidth,
      borderColor: themedStyle.borderColor,
    },
    selection: {
      width: themedStyle.size / 2,
      height: themedStyle.size / 2,
      borderRadius: themedStyle.size / 4,
      backgroundColor: themedStyle.tintColor,
    },
  });

  render() {
    const themedStyles = this.getThemedStyles(this.props.themedStyle);
    const stateStyles = this.getStateStyles();
    return (
      <TouchableOpacity activeOpacity={1.0} onPress={this.onPress}>
        <View style={[styles.container, themedStyles.container, stateStyles.container]}>
          <View style={[styles.selection, themedStyles.selection, stateStyles.selection]}/>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  selection: {},
});
