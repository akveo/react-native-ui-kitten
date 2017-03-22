import React, {Component}from 'react';
import {
  Image,
  View,
  Text,
  PixelRatio
} from 'react-native'
import {RkComponent} from 'react-native-ui-kitten'

export class Avatar extends RkComponent {

  componentName = "Avatar";
  typeMapping = {
    container: {
      backgroundColor: 'backgroundColor',
      borderColor: 'borderColor',
      borderWidth: 'borderWidth',
      borderRadius: 'borderRadius'
    },
    image: {
      imageWidth: 'width',
      imageHeight: 'height',
      imageBorderColor: 'borderColor',
      imageBorderWidth: 'borderWidth',
      imageBorderRadius: 'borderRadius'
    },
    label: {
      color: 'color',
      fontSize: 'fontSize'
    }
  };

  constructor(props) {
    super(props);
  }

  render() {

    let {container, image, label} = this.defineStyles();

    let width = PixelRatio.getPixelSizeForLayoutSize(image.width || 40);
    let height = PixelRatio.getPixelSizeForLayoutSize(image.height || 40);

    url = `https://lorempixel.com/${width}/${height}/cats/`;

    return (
      <View style={[container, this.props.style]}>
        <Image source={{uri: url}} style={image}/>
        <Text style={label}>{this.props.name}</Text>
      </View>
    )
  }
}