import React, {Component} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  StatusBar,
  Image,
  Text
} from 'react-native';

import ThemeService from '../util/ThemeService';


export default class LoginScreenBase extends Component {

  _renderMainScreen() {
    this.props.navigator.replace({screen: ThemeService.getMainScreen()});
  }

}

