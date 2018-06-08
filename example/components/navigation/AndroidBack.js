import React, {Component} from 'react';

import {
  BackAndroid
} from 'react-native';

export class AndroidBack extends Component{

  constructor(props){
    super(props);
    this.navigator = props.navigator;
    this._handleBackButtonBinded = this._handleBackButton.bind(this);
  }

  componentDidMount(){
    BackAndroid.addEventListener('hardwareBackPress', this._handleBackButtonBinded);
  }

  componentWillUnmount(){
    BackAndroid.removeEventListener('hardwareBackPress', this._handleBackButtonBinded)
  }

  _handleBackButton(){
    if (this.navigator && this.navigator.getCurrentRoutes().length > 1) {
      this.props.navigator.pop();
      return true;
    }

    return false;
  }

  render(){
    return null;
  }
}