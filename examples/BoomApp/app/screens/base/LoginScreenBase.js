import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  StatusBar,
  Image,
  Text
} from 'react-native';

import ScreenService from '../../util/ScreenService';


export default class LoginScreenBase extends Component {

  _renderMainScreen() {
    this.props.navigator.replace({screen: ScreenService.getMainScreen()});
  }

}

