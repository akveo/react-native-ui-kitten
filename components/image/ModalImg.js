import React, {Component} from 'react';

import {
  View,
  TouchableWithoutFeedback,
  Image,
  Text,
  Modal,
  ListView,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

import {
  RkStyle
} from '../../util/style';

import {
  RkButton
} from '../button/Button';

import {
  RkBarBg
} from '../status/BarBg';

export class RkModalImg extends Component {

  static name = 'image';

  constructor(props) {
    super(props);
    let {height, width} = Dimensions.get('window');
    this.state = {
      opacity: new Animated.Value(1),
      visible: false,
      width,
      height,
      index: props.index || 0,
    }
  }

  componentDidUpdate() {
    if (this.state.openUpdate && this.refs.listView) {
      this.refs.listView.scrollTo({x: +this.props.index * this.state.width});
      this.setState({openUpdate: false, index: +this.props.index});
    }
  }

  render() {
    let {
      containerStyle,
      renderHeader,
      renderFooter,
      visible,
      animationType,
      transparent,
      modalContainerStyle,
      imageInModalStyle,
      source,
      delimiter,
      index,
      ...imgProps,
    } = this.props;
    renderHeader = renderHeader || this._renderHeader.bind(this);
    renderFooter = renderFooter || this._renderFooter.bind(this);
    animationType = animationType || 'fade';
    delimiter = delimiter || '/';
    transparent = transparent === undefined ? false : transparent;
    visible = visible === undefined ? this.state.visible : visible;
    modalContainerStyle = [RkStyle.flex1, RkStyle.blackBg, modalContainerStyle];
    if (visible) imgProps.style = [imgProps.style, {
      height: this.state.height,
      width: this.state.width
    }, imageInModalStyle];
    let closeImage = this._closeImage.bind(this);
    let pageNumber = +this.state.index + 1;
    let totalPages = this.props.source.length;
    let basicSource = Array.isArray(source) ? source[index] : source;
    return (
      <View>
        <TouchableWithoutFeedback style={containerStyle}
                                  onPress={() => this.setState({visible: true, openUpdate: true})}>
          <Image source={basicSource} {...imgProps}/>
        </TouchableWithoutFeedback>
        <Modal
          animationType={animationType}
          transparent={transparent}
          visible={visible}>
          <View style={modalContainerStyle}>
            { Array.isArray(source) ? this._renderList(source, index, imgProps) : this._renderImage(basicSource, imgProps)}
            <Animated.View style={[styles.header, {opacity: this.state.opacity}]}>
              {renderHeader(closeImage, pageNumber, totalPages, delimiter)}
            </Animated.View>
            <Animated.View style={[styles.footer, {opacity: this.state.opacity}]}>
              {renderFooter(closeImage, pageNumber, totalPages, delimiter)}
            </Animated.View>

            <RkBarBg style={styles.bar}/>
          </View>
        </Modal>
      </View>
    );
  }

  _renderList(source, index, props) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return <ListView
      ref='listView'
      onScroll={(e)=>this._onScroll(e)}
      style={RkStyle.flex1}
      dataSource={ds.cloneWithRows(source.map((s)=> {
        return {img: s}
      }))}
      renderRow={(source)=> this._renderImage(source.img, props)}
      horizontal
      pagingEnabled
      renderSeparator={()=>null}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      directionalLockEnabled
      scrollEventThrottle={100}
    />
  }

  _renderImage(source, props) {
    return (
      <TouchableWithoutFeedback style={{height: this.state.height, width: this.state.width}}
                                onPress={()=> this._toggleControls()}>
        <Image source={source} {...props}/>
      </TouchableWithoutFeedback>
    )
  }

  _toggleControls() {
    Animated.timing(this.state.opacity, {
      toValue: this.state.opacity._value ? 0 : 1
    }).start()
  }


  _renderFooter(closeImage, pageNumber, totalPages, delimiter) {
    return (
      <View style={{height: 40}}/>
    );
  }

  _renderHeader(closeImage, pageNumber, totalPages, delimiter) {
    return (
      <View style={styles.innerHeaderContainer}>
        <RkButton innerStyle={RkStyle.whiteText} rkType={'clear'}
                  onPress={closeImage}>Close</RkButton>
        <Text style={styles.headerText}>{this._renderPageNumbers(delimiter)}</Text>
        <RkButton rkType='clear' innerStyle={RkStyle.transparentText}>Close</RkButton>
      </View>
    );
  }

  _renderPageNumbers(delimiter) {
    if (Array.isArray(this.props.source)) {
      let pageText = +this.state.index + +1;
      pageText += delimiter;
      pageText += this.props.source.length;
      return (
        <Text style={RkStyle.whiteText}>
          {pageText}
        </Text>
      )
    } else return null;
  }

  _onScroll(e) {
    let imageIndex = Math.round(e.nativeEvent.contentOffset.x / this.state.width);
    if (imageIndex >= 0 &&
      imageIndex <= this.props.source.length &&
      imageIndex != this.state.index) {
      this.setState({
        index: imageIndex
      })
    }
  }

  _closeImage() {
    this.setState({visible: false})
  }

}


const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    backgroundColor: '#212121',
  },
  innerHeaderContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#212121',
  },
  headerText:{
    textAlign: 'center',
    fontSize: 16
  },
  bar:{
    backgroundColor: '#212121',
  }
});