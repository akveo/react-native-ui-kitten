import React from 'react';
import {View, StyleSheet} from 'react-native'

import {RkButton, RkTheme, RkThemeProvider} from 'react-native-ui-kitten';

import {BlueTheme} from '../style/my-theme';
import {RkStyleSheet} from '../RkStyle';

let co = 'red';


export class TestScreen extends React.Component {
  static navigationOptions = {
    title: 'test'
  };

  constructor(props) {
    super(props);

    this.state = {color: 'purple'}
  }

  render() {


    return (
      <View style={[styles.container, styles.flex]}>
        <RkButton onPress={() => {
          RkTheme.setTheme(BlueTheme);
          RkStyleSheet._invalidate();
        }}>
          Hello!
        </RkButton>
      </View>
    )
  }
}
let f = true;

let styles = RkStyleSheet.create({
  container: {
    backgroundColor: RkTheme.current.colors.back.info
  },
  flex: {
    flex: 1
  }
});
// let styles = {
//   get container(){
//     f=!f;
//     if (f)
//       return {backgroundColor:'red'};
//       return {backgroundColor:'blue'}
//
//
//   }
// };
