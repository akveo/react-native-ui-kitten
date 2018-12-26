import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableOpacityProps,
} from 'react-native';
import {
  APPEARANCE_DEFAULT,
  StyledComponentProps,
  StyleType,
} from '@rk-kit/theme';

interface RadioProps {
  checked?: boolean;
  onChange?: (selected: boolean) => void;
  appearance?: string | 'default';
  status?: string | 'error';
  size?: string | 'big' | 'small';
}

export type Props = RadioProps & StyledComponentProps & TouchableOpacityProps;

interface State {
  active: boolean;
}

export class Radio extends React.Component<Props, State> {

  static defaultProps: Props = {
    appearance: APPEARANCE_DEFAULT,
    checked: false,
  };

  state: State = {
    active: false,
  };

  shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<State>, nextContext: any): boolean {
    const selectedChanged = nextProps.checked !== this.props.checked;
    const activeChanged = nextState.active !== this.state.active;
    const disabledChanged = nextProps.disabled !== this.props.disabled;
    return selectedChanged || activeChanged || disabledChanged;
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
      this.state.active && 'active',
      this.props.checked && 'checked',
      this.props.disabled && 'disabled',
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
      },
      highlight: {
        width: style.highlightSize,
        height: style.highlightSize,
        borderRadius: style.highlightSize / 2,
        backgroundColor: style.highlightColor,
        opacity: this.state.active ? 0.4 : 0.0,
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
