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
} from '@rk-kit/theme';

const STATE_CHECKED = 'checked';
const STATE_DISABLED = 'disabled';
const STATE_ACTIVE_UNCHECKED = 'active-unchecked';
const STATE_ACTIVE_CHECKED = 'active-checked';

interface RadioProps {
  onChange?: (selected: boolean) => void;
  checked?: boolean;
  variant?: string | 'default' | 'error';
}

export type Props = RadioProps & StyledComponentProps & TouchableOpacityProps;

interface State {
  active: boolean;
}

export class Radio extends React.Component<Props, State> {

  static defaultProps: Props = {
    checked: false,
    disabled: false,
  };

  state: State = {
    active: false,
  };

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
    const checkedChanged = nextProps.checked !== this.props.checked;
    const activeChanged = nextState.active !== this.state.active;
    const disabledChanged = nextProps.disabled !== this.props.disabled;
    return checkedChanged || activeChanged || disabledChanged;
  }

  onPress = () => {
    this.props.onChange && this.props.onChange(this.props.checked);
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

  isStateStyle = (): boolean => {
    return this.state.active || this.props.checked || this.props.disabled;
  };

  getStateStyle = (): StyleType => {
    return this.props.requestStateStyle([
      this.props.checked && STATE_CHECKED,
      this.props.disabled && STATE_DISABLED,
      this.state.active && this.props.checked && STATE_ACTIVE_CHECKED,
      this.state.active && !this.props.checked && STATE_ACTIVE_UNCHECKED,
    ]);
  };

  getComponentStyle = (): StyleType => {
    const style = this.isStateStyle() ? this.getStateStyle() : this.props.themedStyle;
    return ({
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
        opacity: this.props.checked ? 1.0 : 0.0,
      },
      highlight: {
        width: style.highlightSize,
        height: style.highlightSize,
        borderRadius: style.highlightSize / 2,
        backgroundColor: style.highlightColor,
        opacity: 0.75,
      },
    });
  };

  render() {
    const componentStyle = this.getComponentStyle();
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
