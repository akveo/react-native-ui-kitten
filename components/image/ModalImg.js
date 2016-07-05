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
  RkConfig
} from '../../config/config';

import {
  RkButton
} from '../button/Button';

export class RkModalImg extends Component {


  constructor(props) {
    super(props);
    let {height, width} = Dimensions.get('window');
    this.state = {
      opacity: new Animated.Value(1),
      visible: false,
      width,
      height,
      index: props.index,
    }
  }

  componentDidMount() {
    this.listView && this.listView.scrollTo({x: this.state.index * this.state.width})
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
      index,
      ...imgProps,
      } = this.props;
    renderHeader = renderHeader || this._renderHeader.bind(this);
    renderFooter = renderFooter || this._renderFooter.bind(this);
    animationType = animationType || 'fade';
    transparent = transparent === undefined ? false : transparent;
    visible = visible === undefined ? this.state.visible : visible;
    modalContainerStyle = [{
      backgroundColor: 'black',
      flex: 1,
    }, modalContainerStyle];
    if (visible) imgProps.style = [imgProps.style, {
      height: this.state.height,
      width: this.state.width
    }, imageInModalStyle];
    let basicSource = Array.isArray(source) ? source[index] : source;
    return (
      <View>
        <TouchableWithoutFeedback style={containerStyle} onPress={() => this.setState({visible: true})}>
          <Image source={basicSource} {...imgProps}/>
        </TouchableWithoutFeedback>
        <Modal
          animationType={animationType}
          transparent={transparent}
          visible={visible}>
          <View style={modalContainerStyle}>
            { Array.isArray(source) ? this._renderList(source, index, imgProps) : this._renderImage(basicSource, imgProps)}
            {renderHeader()}
            {renderFooter()}
          </View>
        </Modal>
      </View>
    );
  }

  _renderList(source, index, props) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return <ListView
      ref={listView => this.listView = listView}
      onScroll={(e)=>this._onScroll(e)}
      style={{flex: 1}}
      dataSource={ds.cloneWithRows(source.map((s)=>{return {img: s}}))}
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


  _renderFooter() {
    return (
      <Animated.View style={[styles.footer, {opacity: this.state.opacity}]}/>
    );
  }

  _renderHeader() {
    return (
      <Animated.View style={[styles.header, {opacity: this.state.opacity}]}>
        <RkButton innerStyle={{color: 'white'}} type={'clear'}
                  onPress={()=> this.setState({visible: false})}>Close</RkButton>
        <View>
          {Array.isArray(this.props.source) &&
          <Text style={{color: 'white'}}>
            {this.state.index + 1}/{this.props.source.length}
          </Text>}
        </View>
        <View/>
      </Animated.View>
    );
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

}


const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#212121',
    flexDirection: 'row',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#212121',
    height: 40
  }
});