import React from 'react';
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@rk-kit/theme';

const STATE_SELECTED = 'selected';
const STATE_ACTIVE = 'active';
const STATE_DISABLED = 'disabled';

interface RadioProps {
  onChange?: (selected: boolean) => void;
  selected?: boolean;
  disabled?: boolean;
  variant?: string | 'default' | 'small' | 'large';
}

export type Props = RadioProps & StyledComponentProps;

interface State {
  active: boolean;
}

export class Radio extends React.Component<Props, State> {

  static defaultProps: Props = {
    selected: false,
    disabled: false,
  };

  state: State = {
    active: false,
  };

  onPress = () => {
    this.props.onChange && this.props.onChange(this.props.selected);
  };

  onPressIn = () => {
    this.setState({
      active: true,
    });
  };

  onPressOut = () => {
    this.setState({
      active: false,
    });
  };

  isStateStyle = (): boolean => this.state.active || this.props.selected || this.props.disabled;

  getStateStyle = (): StyleType => this.props.requestStateStyle([
    this.props.selected && STATE_SELECTED,
    this.state.active && STATE_ACTIVE,
    this.props.disabled && STATE_DISABLED,
  ]);

  getComponentStyle = (): StyleType => {
    const style = this.isStateStyle() ? this.getStateStyle() : this.props.themedStyle;
    return ({
      container: {
        width: style.size,
        height: style.size,
        borderRadius: style.size / 2,
        borderWidth: style.borderWidth,
        borderColor: style.borderColor,
      },
      selection: {
        width: style.size / 2,
        height: style.size / 2,
        borderRadius: style.size / 4,
        backgroundColor: style.tintColor,
        opacity: this.props.selected ? 1.0 : 0.0,
      },
    });
  };

  render() {
    const componentStyle = this.getComponentStyle();
    return (
      <TouchableWithoutFeedback
        disabled={this.props.disabled}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <View style={[styles.container, componentStyle.container]}>
          <View style={[styles.selection, componentStyle.selection]}/>
        </View>
      </TouchableWithoutFeedback>
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
