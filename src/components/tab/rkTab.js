import React from 'react';

import {
  View,
} from 'react-native-web';

export class RkTab extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>{this.props.children}</View>
    );
  }
}
