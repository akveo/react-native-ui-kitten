import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { StyledComponentProps } from '@rk-kit/theme';

interface SampleProps {
  text?: string;
}
export type Props = SampleProps & StyledComponentProps;

export class Sample extends React.Component<Props, {}> {
  static defaultProps: Props = {
    text: `This is React Native UI Kitten playground.\n\n
      Create your awesome components inside
      ./src/framework dir
      which will be automatically synchronized with playground.
      Enjoy!`,
    variant: 'default',
  };

  render() {
    const { themedStyle } = this.props;
    return (
      <View style={[styles.container, { backgroundColor: themedStyle.backgroundColor }]}>
        <Text style={[styles.text, { color: themedStyle.textColor }]}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
});
