import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Image,
  Text,
  Modal,
  ListView,
  Animated,
  Dimensions,
  Platform
} from 'react-native';
import _ from 'lodash';
import {RkButton} from '../button/rkButton';
import {RkText} from '../text/rkText';
import {RkComponent} from '../rkComponent';
import {RkTheme} from '../../styles/themeManager';

/**
 * `RkModalImg` is extension of basic `Image` that also opens it in full screen on tap.
 *
 * @extends RkComponent
 *
 * @example Simple usage:
 *
 * ```
 * <RkModalImg source={require('../img/river.jpeg')}/>
 * ```
 *
 * @example Custom header and footer
 *
 * It's possible to render custom header and footer when image is in fullscreen mode. There are special props for this:
 * `renderHeader` and `renderFooter`. Functions passed as this props can accept `options` object described below.
 *
 * ```
 * _renderHeader(options){
 *   return (
 *     <View>
 *       <RkButton onPress={options.closeImage}>Custom Header</RkButton>
 *     </View>
 *    );
 * }
 *
 *  //...
 *
 *  <RkModalImg source={require('../img/river.jpeg')}
 *    renderHeader={this._renderHeader}/>
 * ```
 *
 * @example Gallery
 *
 * Also `RkModalImg` supports multi-image source.
 * This options allows to show several images in a gallery:
 *
 * ```javascript
 * import {RkModalImg} from 'react-native-ui-kitten';
 *
 * let images = [ require('../img/animal.jpeg'), require('../img/bird.jpeg')]
 *
 * //...
 *
 * <RkModalImg source={images} index={0}/>
 * <RkModalImg source={images} index={1}/>
 *
 * ```
 *
 * @example Define new rkTypes
 *
 * `RkModalImg` doesn't have predefined rkTypes. However, it's easy and very common to create new types.
 * Main point for all customization is `RkTheme` object. New rkTypes are defined using `setType` method of `RkTheme`.
 * `RkModalImg` consists from couple of base react component. Styles can be applied to each internal component:
 *
 * ```
 * RkTheme.setType('RkModalImg','small',{
 *   img:{
 *     width: 50,
 *     height: 50,
 *     borderRadius: 10
 *   }
 * });
 *
 *  //...
 *
 *  <RkModalImg rkType='small' source={require('../img/cat.jpeg')}/>
 * ```
 *
 * @styles Available components:
 * - `img` : `Image` - Image in regular (not modal) mode
 * - `imgContainer` : `TouchableWithoutFeedback` - container of `img` in regular (not modal) mode
 * - `modal` : `View` - Root view of `Modal` component
 * - `modalImg` : `Image` - Image in modal mode
 * - `header` : `View` - View container for header in modal mode. Here also will be set content returned form `renderHeader`
 * - `headerContent` : `View` - View container for header in modal mode (A child of `header` view). Only available if `renderHeader` not passed to component
 * - `headerText`: `RkText` - Text that render page number in header. Only available if `renderHeader` not passed to component
 * - `footer` : `View` - View container for footer in modal mode. Here also will be set content returned form `renderFooter` function
 * - `footerContent` : `View` - View container for footer in modal mode (A child of `footer` view). Only available if `renderFooter` not passed to component
 *
 * @example Inline Styling
 *
 * It's possible to set styles inline. Use props `style` for `img` component, `imgContainerStyle` for `imgContainer` component,
 * `modalStyle` for `modal` component, `modalImgStyle` for `modalImg` component, `headerStyle` for `header` component,
 * `footerStyle` for `footer` component.
 *
 * ```
 * <RkModalImg imgContainerStyle={{backgroundColor:'green'}} source={require('../img/cat.jpeg')}/>
 * ```
 *
 * @styles Options object passed to renderHeader and renderFooter functions
 * - `closeImage` : Function that closes modal
 * - `pageNumber` : Number of current page. Useful if component used as gallery
 * - `totalPages`: Number of total pages. Useful if component used as gallery
 *
 * @property {string} rkType - Types for component stylization
 * @property {style} style - Style for image in regular (not modal) mode
 * @property {Image.props} props - Props will be applied to image in regular and modal mods
 * @property {style} imgContainerStyle - Style for wrapper of image in regular (not modal) mode
 * @property {style} modalStyle - Style for root view of modal component
 * @property {style} modalImgStyle - Style for image in modal mode
 * @property {style} headerStyle - Style for header container in modal mode. Applied only if renderHeader prop is not set
 * @property {style} footerStyle - Style for footer container in modal mode. Applied only if renderFooter prop is not set
 * @property {bool} visible - true if modal is opened at the moment
 * @property {string} animationType - Type of animation for Modal component. Available values: 'none', 'slide', 'fade'
 * @property {bool} transparent - Prop will be passed to Modal component
 * @property {style} modalContainerStyle - Style passed to container inside of Modal component
 * @property {function} renderHeader - Function for rendering custom header
 * @property {function} renderFooter - Function for rendering custom footer
 * @property {number} index - Function for rendering custom footer
 *
 */

export class RkModalImg extends RkComponent {

  componentName = 'RkModalImg';
  typeMapping = {
    img: {},
    header: {},
    footerContent: {},
    headerContent: {},
    footer: {},
    headerText: {},
    imgContainer: {},
    modal: {}
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
    let updateScroll = () => {
      this.refs.listView.scrollTo({x: +this.props.index * this.state.width, animated: false});
      this.setState({openUpdate: false, index: +this.props.index});
    };
    if (this.state.openUpdate && this.refs.listView) {
      if (Platform.OS === 'ios') {
        updateScroll();
      } else {
        _.delay(updateScroll, 100);
      }
    }
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
    let footerStyle = this.styles ? this.styles.footerContent : {};

    return (
      <View style={footerStyle}/>
    );
  }

  _renderHeader(options) {
    let headerContent = this.styles ? this.styles.headerContent : {};
    let headerText = this.styles ? this.styles.headerText : {};
    return (
      <View style={headerContent}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <RkButton rkType='clear' onPress={options.closeImage}>Close</RkButton>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <RkText style={headerText}>{this._renderPageNumbers()}</RkText>
        </View>
        <View style={{flex: 1}}/>
      </View>
    );
  }

  _renderPageNumbers() {
    if (Array.isArray(this.props.source)) {
      let pageText = +this.state.index + +1;
      pageText += '/';
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

  render() {
    let {
      imgContainerStyle,
      renderHeader,
      renderFooter,
      visible,
      animationType,
      transparent,
      modalStyle,
      modalImgStyle,
      headerStyle,
      footerStyle,
      source,
      index,
      style: imgStyle,
      ...imgProps,
    } = this.props;

    let {
      header,
      footerContent,
      headerContent,
      footer,
      headerText,
      img,
      imgContainer,
      modal,
      modalImg
    } = this.defineStyles();

    this.styles = {
      header: [header, headerStyle],
      footerContent,
      headerContent,
      footer: [footer, footerStyle],
      headerText
    };

    renderHeader = renderHeader || this._renderHeader.bind(this);
    renderFooter = renderFooter || this._renderFooter.bind(this);
    animationType = animationType || 'fade';
    transparent = transparent === undefined ? false : transparent;
    visible = visible === undefined ? this.state.visible : visible;

    if (visible) {
      imgProps.style = [imgProps.style,
        {
          height: this.state.height,
          width: this.state.width
        },
        modalImg,
        modalImgStyle];
    }
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
          onRequestClose={closeImage}
          animationType={animationType}
          transparent={transparent}
          visible={visible}>
          <View style={[modal, modalStyle]}>
            { Array.isArray(source) ? this._renderList(source, index, imgProps) : this._renderImage(basicSource, imgProps)}
            <Animated.View style={[this.styles.header, {opacity: this.state.opacity}]}>
              {renderHeader({closeImage, pageNumber, totalPages})}
            </Animated.View>
            <Animated.View style={[this.styles.footer, {opacity: this.state.opacity}]}>
              {renderFooter({closeImage, pageNumber, totalPages})}
            </Animated.View>
          </View>
        </Modal>
      </View>
    );
  }
}