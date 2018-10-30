import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

interface Props {
  text: string;
}

export class Sample extends React.Component<Props, {}> {
  static defaultProps = {
    text: 'This is React Native UI Kitten playground.\n\n' +
    'Create your awesome components inside ./src/framework dir ' +
    'which will be automatically synchronized with npm package.\n\n' +
    'Enjoy!',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.text}</Text>
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
