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

import {RkButton} from '../button/rkButton';
import {RkText} from '../text/rkText';
import {RkComponent} from '../rkComponent';
import {RkTheme} from '../../styles/theme'


export class RkModalImg extends RkComponent {

  componentName = 'RkModalImg';
  typeMapping = {
    img: {},
    header: {},
    footerContent: {},
    innerHeaderContainer: {},
    footer: {},
    headerText: {},
    bar: {},
    imgContainer: {}
  };

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
      imgContainerStyle,
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
      style:imgStyle,
      ...imgProps,
    } = this.props;

    let {
      header,
      footerContent,
      innerHeaderContainer,
      footer,
      headerText,
      bar,
      img,
      imgContainer
    } = this.defineStyles();

    this.styles = {};
    this.styles.header = header;
    this.styles.footerContent = footerContent;
    this.styles.innerHeaderContainer = innerHeaderContainer;
    this.styles.footer = footer;
    this.styles.headerText = headerText;
    this.styles.bar = bar;

    renderHeader = renderHeader || this._renderHeader.bind(this);
    renderFooter = renderFooter || this._renderFooter.bind(this);
    animationType = animationType || 'fade';
    delimiter = delimiter || '/';
    transparent = transparent === undefined ? false : transparent;
    visible = visible === undefined ? this.state.visible : visible;
    modalContainerStyle = [{flex: 1}, RkTheme.styles.blackBg, modalContainerStyle];

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
        <TouchableWithoutFeedback style={[imgContainer, imgContainerStyle]}
                                  onPress={() => this.setState({visible: true, openUpdate: true})}>
          <Image source={basicSource} style={[img, imgStyle]} {...imgProps}/>
        </TouchableWithoutFeedback>
        <Modal
          animationType={animationType}
          transparent={transparent}
          visible={visible}>
          <View style={modalContainerStyle}>
            { Array.isArray(source) ? this._renderList(source, index, imgProps) : this._renderImage(basicSource, imgProps)}
            <Animated.View style={[header, {opacity: this.state.opacity}]}>
              {renderHeader({closeImage, pageNumber, totalPages, delimiter})}
            </Animated.View>
            <Animated.View style={[footer, {opacity: this.state.opacity}]}>
              {renderFooter({closeImage, pageNumber, totalPages, delimiter})}
            </Animated.View>
          </View>
        </Modal>
      </View>
    );
  }

  _renderList(source, index, props) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return <ListView
      ref='listView'
      onScroll={(e) => this._onScroll(e)}
      style={RkTheme.styles.flex1}
      dataSource={ds.cloneWithRows(source.map((s) => {
        return {img: s}
      }))}
      renderRow={(source) => this._renderImage(source.img, props)}
      horizontal
      pagingEnabled
      renderSeparator={() => null}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      directionalLockEnabled
      scrollEventThrottle={100}
    />
  }

  _renderImage(source, props) {
    return (
      <TouchableWithoutFeedback style={{height: this.state.height, width: this.state.width}}
                                onPress={() => this._toggleControls()}>
        <Image source={source} {...props}/>
      </TouchableWithoutFeedback>
    )
  }

  _toggleControls() {
    Animated.timing(this.state.opacity, {
      toValue: this.state.opacity._value ? 0 : 1
    }).start()
  }


  _renderFooter(options) {
    let footerStyle = this.styles ? this.styles.footer : {};

    return (
      <View style={footerStyle}/>
    );
  }

  _renderHeader(options) {
    let innerHeaderContainer = this.styles ? this.styles.innerHeaderContainer : {};
    let headerText = this.styles ? this.styles.headerText : {};
    return (
      <View style={innerHeaderContainer}>
        <View style={{flex: 1}}>
          <RkButton rkType='clear' onPress={options.closeImage}>Close</RkButton>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <RkText style={headerText}>{this._renderPageNumbers(options.delimiter)}</RkText>
        </View>
        <View style={{flex: 1}}/>
      </View>
    );
  }

  _renderPageNumbers(delimiter) {
    if (Array.isArray(this.props.source)) {
      let pageText = +this.state.index + +1;
      pageText += delimiter;
      pageText += this.props.source.length;
      return (
        <Text style={RkTheme.styles.whiteText}>
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