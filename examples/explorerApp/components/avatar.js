import React, {Component}from 'react';
import {
  Image,
  View,
  Text,
  PixelRatio
} from 'react-native'
import {RkComponent, RkText} from 'react-native-ui-kitten'

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
    },
    caption: {
      captionColor: 'color',
      captionFontSize: 'fontSize'
    }
  };

  constructor(props) {
    super(props);
  }

  render() {

    let {container, image, label, caption:captionStyle} = this.defineStyles();
    let caption = this.props.caption ? (<RkText style={captionStyle}>{this.props.caption}</RkText>) : <View/>;

    return (
      <View style={[container, this.props.style]}>
        <Image source={this.props.source} style={image}/>
        <View>
          <RkText rkType='bold' style={label}>{this.props.name}</RkText>
          {caption}
        </View>
      </View>
    )
  }
}