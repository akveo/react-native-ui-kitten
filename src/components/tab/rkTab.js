import React from 'react';

import {
  View,
} from 'react-native';

export class RkTab extends React.Component {
  componentName = 'RkTab';

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{flex: 1}}>{this.props.children}</View>
    );
  }
}
