import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  Radio,
} from 'react-native-ui-kitten';

export class RadioSimpleUsageShowcase extends React.Component {

  state = {
    checked: false,
  };

  onChange = (checked) => {
    this.setState({ checked });
  };

  render() {
    return (
      <Layout style={styles.container}>
        <Radio
          style={styles.radio}
          text='Active'
          checked={this.state.checked}
          onChange={this.onChange}
        />
        <Radio
          style={styles.radio}
          text='Disabled'
          disabled={true}
        />
        <Radio
          style={styles.radio}
          text='Checked Disabled'
          checked={true}
          disabled={true}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  radio: {
    marginVertical: 4,
    marginHorizontal: 4,
  },
});

