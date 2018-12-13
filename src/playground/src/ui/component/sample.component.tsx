import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { StyledComponentProps, StyleType } from '@rk-kit/theme';

interface SampleProps {
  text?: string;
}

export type Props = SampleProps & StyledComponentProps;

interface State {
  active: boolean;
  description: string;
}

export class Sample extends React.Component<Props, State> {
  static defaultProps: Props = {
    text: `This is React Native UI Kitten playground.\n\n
      Create your awesome components inside
      ./src/framework dir
      which will be automatically synchronized with playground.
      Enjoy!`,
    variant: 'default',
  };

  state: State = {
    active: false,
    description: undefined,
  };

  onPressIn = () => {
    this.setState({
      active: true,
      description: 'active',
    });
  };

  onPressOut = () => {
    this.setState({
      active: false,
      description: undefined,
    });
  };

  getComponentStyle = (): StyleType => {
    const style = this.state.description === undefined ? this.props.themedStyle : this.getStateStyle();
    return ({
      container: {
        backgroundColor: style.backgroundColor,
      },
      text: {
        color: style.textColor,
      },
    });
  };

  getStateStyle = (): StyleType => this.props.requestStateStyle(this.state.description);

  render() {
    const componentStyle = this.getComponentStyle();
    return (
      <TouchableWithoutFeedback onPressIn={this.onPressIn} onPressOut={this.onPressOut}>
        <View style={[styles.container, componentStyle.container]}>
          <Text style={[styles.text, componentStyle.text]}>{this.props.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
});
