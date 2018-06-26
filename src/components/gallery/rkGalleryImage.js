import React from 'react';
import {
  Modal,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import { RkComponent } from '../rkComponent';
import { RkModalImageBehavior } from "./rkModalImageBehavior";

export class RkModalImage extends RkComponent {
  static propTypes = {
    source: PropTypes.object.isRequired,
    onContainerClick: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
    this.state = {
      imageSize: {
        width: screenWidth,
        height: screenHeight,
      },
    };
  }

  onContainerClicked = () => {
    this.props.onContainerClick(this.props.source);
  };

  render() {
    return (
      <RkModalImageBehavior
        isModal={}
        source={}
        onRenderThumb={}
        onRenderModal={}/>
      < Modal >
      < TouchableOpacity
    onPress = { this.onContainerClicked
  }>
  <
    Image
    source = { this.props.source
  }
    style = {
    {
      width: this.state.imageSize.width,
        height
    :
      this.state.imageSize.height,
    }
  }
    />
  </TouchableOpacity>
  <
    /Modal>
  )
    ;
  }
}
