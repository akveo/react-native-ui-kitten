import React, {Component}from 'react';
import {
  Image,
  View,
  Text,
  PixelRatio
} from 'react-native'
import {RkComponent, RkText} from 'react-native-ui-kitten'

export class Avatar extends RkComponent {

  componentName = 'Avatar';
  typeMapping = {
    container: {},
    image: {},
    username: {},
    description: {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    let {container, image, username, description: descriptionStyle} = this.defineStyles();
    let description = this.props.description ? (<RkText style={descriptionStyle}>{this.props.description}</RkText>) :
      <View/>;

    return (
      <View style={container}>
        <Image style={image} source={this.props.source}/>
        <View>
          <RkText style={username}>{this.props.name}</RkText>
          {description}
        </View>
      </View>
    )
  }
}