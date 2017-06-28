import React, {Component} from 'react';
import {Image} from 'react-native'

export class ImageIcon extends Component {

  static images = {
    plus: <Image source={require('../img/icons/plus.png')}/>,
    heart: <Image source={require('../img/icons/heart.png')}/>,
    phone: <Image source={require('../img/icons/phone.png')}/>,
    user: <Image source={require('../img/icons/user.png')}/>,
  };

  render() {
    let name = this.props.name;
    return React.cloneElement(ImageIcon.images[name]);
  }
}