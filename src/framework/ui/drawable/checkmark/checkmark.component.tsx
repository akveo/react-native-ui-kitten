import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';

type Props = ViewProps;

// TODO(ui): checkmark component

export class CheckMark extends React.Component<Props> {

  render() {
    return (
      <View {...this.props}/>
    );
  }
}
