import React from 'react';
import {
  TouchableWithoutFeedback,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@rk-kit/theme';

interface SampleProps {
  text?: string;
  disabled?: boolean;
}

export type Props = SampleProps & StyledComponentProps;

interface State {
  active: boolean;
}

export class Sample extends React.Component<Props, State> {
  static defaultProps: Props = {
    text: `This is React Native UI Kitten playground`,
  };

  state: State = {
    active: false,
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

  isStateStyle = (): boolean => this.state.active || this.props.disabled;

  getStateStyle = (): StyleType => {
    const activeDescription = this.state.active ? 'active' : undefined;
    const disabledDescription = this.props.disabled ? 'disabled' : undefined;
    return this.props.requestStateStyle([activeDescription, disabledDescription]);
  };

  getComponentStyle = (): StyleType => {
    const style = this.isStateStyle() ? this.getStateStyle() : this.props.themedStyle;
    return ({
      container: {
        backgroundColor: style.backgroundColor,
      },
      text: {
        color: style.textColor,
      },
    });
  };

  render() {
    const componentStyle = this.getComponentStyle();
    return (
      <TouchableWithoutFeedback
        disabled={this.props.disabled}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <View style={[styles.container, componentStyle.container]}>
          <Text style={[styles.text, componentStyle.text]}>{this.props.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
});
