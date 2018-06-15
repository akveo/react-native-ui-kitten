import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Image,
  Text,
  Modal,
  Animated,
  Dimensions,
  Platform,
  FlatList,
} from 'react-native';
import { RkButton } from '../button/rkButton';
import { RkText } from '../text/rkText';
import { RkComponent } from '../rkComponent';
import { RkTheme } from '../../styles/themeManager';

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
 * It's possible to render custom header and footer when image is in fullscreen mode.
 * There are special props for this:
 * `renderHeader` and `renderFooter`.
 * Functions passed as this props can accept `options` object described below.
 *
 * ```
 * renderHeader(options){
 *   return (
 *     <View>
 *       <RkButton onPress={options.closeImage}>Custom Header</RkButton>
 *     </View>
 *    );
 * }
 *
 * renderFooter(options){
 *   return (
 *     <View>
 *       <RkButton onPress={(x) => Alert.alert('I Like it!')}>Custom Footer</RkButton>
 *     </View>
 *    );
 * }
 *
 *  //...
 *
 *  <RkModalImg source={require('../img/river.jpeg')}
 *    renderHeader={this.renderHeader} renderFooter={this.renderFooter}/>
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
 * `RkModalImg` doesn't have predefined rkTypes.
 * However, it's easy and very common to create new types.
 * Main point for all customization is `RkTheme` object.
 * New rkTypes are defined using `setType` method of `RkTheme`.
 * `RkModalImg` consists from couple of base react component.
 * Styles can be applied to each internal component:
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
 * - `img` (Default): `Image` - Image in regular (not modal) mode
 * - `imgContainer` : `TouchableWithoutFeedback` - container of `img` in regular (not modal) mode
 * - `modal` : `View` - Root view of `Modal` component
 * - `modalImg` : `Image` - Image in modal mode
 * - `header` : `View` - View container for header in modal mode.
 * Here also will be set content returned form `renderHeader`
 * - `headerContent` : `View` - View container for header in modal mode (A child of `header` view).
 * Only available if `renderHeader` not passed to component
 * - `headerText`: `RkText` - Text that render page number in header.
 * Only available if `renderHeader` not passed to component
 * - `footer` : `View` - View container for footer in modal mode.
 * Here also will be set content returned form `renderFooter` function
 * - `footerContent` : `View` - View container for footer in modal mode (A child of `footer` view).
 * Only available if `renderFooter` not passed to component
 *
 * @example Inline Styling
 *
 * It's possible to set styles inline.
 * Use props `style` for `img` component, `imgContainerStyle` for `imgContainer` component,
 * `modalStyle` for `modal` component,
 * `modalImgStyle` for `modalImg` component,
 * `headerStyle` for `header` component,
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
 * @property {style} headerStyle - Style for header container in modal mode.
 * Applied only if renderHeader prop is not set
 * @property {style} footerStyle - Style for footer container in modal mode.
 * Applied only if renderFooter prop is not set
 * @property {bool} visible - true if modal is opened at the moment
 * @property {string} animationType - Type of animation for Modal component.
 * Available values: 'none', 'slide', 'fade'
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
    modal: {},
  };

  needUpdateScroll = false;

  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(1),
      visible: false,
      width: undefined,
      height: undefined,
      index: props.index || 0,
    };
  }

  componentDidUpdate() {
    if (this.needUpdateScroll && this.refs.list) {
      this.refs.list.scrollToOffset({
        offset: this.state.index * this.state.width,
        animated: false,
      });
      this.needUpdateScroll = false;
    }
  }

  renderList(source, index, props) {
    return (<FlatList
      ref={(ref) => {
        this.refs.list = ref;
      }}
      data={Array.from(this.props.source)}
      renderItem={({ item }) => this.renderImage(item, props)}
      horizontal
      pagingEnabled
      keyExtractor={() => index}
      extraData={this.state}
      onScroll={(e) => this.onListScroll(e)}
    />);
  }

  renderImage(source, props) {
    return (
      <TouchableWithoutFeedback
        style={{ flex: 1 }}
        onPress={() => this.toggleControls()}
      >
        <Image source={source} {...props} />
      </TouchableWithoutFeedback>
    );
  }

  toggleControls() {
    Animated.timing(this.state.opacity, {
      // eslint-disable-next-line no-underscore-dangle
      toValue: this.state.opacity._value ? 0 : 1,
    }).start();
  }

  renderFooter() {
    const footerStyle = this.styles ? this.styles.footerContent : {};
    return (
      <View style={footerStyle} />
    );
  }

  renderHeader(options) {
    const headerContent = this.styles ? this.styles.headerContent : {};
    const headerText = this.styles ? this.styles.headerText : {};
    return (
      <View style={headerContent}>
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <RkButton rkType='clear' onPress={options.closeImage}>Close</RkButton>
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <RkText style={headerText}>{this.renderPageNumbers()}</RkText>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  }

  renderPageNumbers() {
    if (Array.isArray(this.props.source)) {
      let pageText = +this.state.index + +1;
      pageText += '/';
      pageText += this.props.source.length;
      return (
        <Text style={RkTheme.styles.whiteText}>
          {pageText}
        </Text>
      );
    }
    return null;
  }

  onListScroll(e) {
    const imageIndex = Math.round(e.nativeEvent.contentOffset.x / this.state.width);
    if (imageIndex >= 0 &&
      imageIndex <= this.props.source.length &&
      imageIndex !== this.state.index) {
      this.setState({
        index: imageIndex,
      });
    }
  }

  closeImage() {
    this.setState({ visible: false });
  }

  onOrientationChange() {
    this.needUpdateScroll = true;
    this.forceUpdate();
  }

  updateDimensionsState() {
    const { height, width } = Dimensions.get('window');
    this.state.height = height;
    this.state.width = width;
  }

  render() {
    const {
      imgContainerStyle,
      modalStyle,
      modalImgStyle,
      headerStyle,
      footerStyle,
      source,
      index,
      style: imgStyle,
      ...imgProps
    } = this.props;

    const {
      header,
      footerContent,
      headerContent,
      footer,
      headerText,
      img,
      imgContainer,
      modal,
      modalImg,
    } = this.defineStyles();

    this.styles = {
      header: [header, headerStyle],
      footerContent,
      headerContent,
      footer: [footer, footerStyle],
      headerText,
    };

    const renderHeader = this.props.renderHeader || this.renderHeader.bind(this);
    const renderFooter = this.props.renderFooter || this.renderFooter.bind(this);
    const animationType = imgProps.animationType || 'fade';
    const transparent = imgProps.transparent === undefined ? false : imgProps.transparent;
    const visible = imgProps.visible === undefined ? this.state.visible : imgProps.visible;

    this.updateDimensionsState();

    if (visible) {
      imgProps.style = [imgProps.style,
        {
          height: this.state.height,
          width: this.state.width,
        },
        modalImg,
        modalImgStyle];
    }
    const closeImage = this.closeImage.bind(this);
    const pageNumber = +this.state.index + 1;
    const totalPages = this.props.source.length;
    const basicSource = Array.isArray(source) ? source[index] : source;
    return (
      <View>
        <TouchableWithoutFeedback
          style={[imgContainer, imgContainerStyle]}
          onPress={() => {
            this.needUpdateScroll = true;
            this.setState({ visible: true });
          }}
        >
          <Image source={basicSource} style={[img, imgStyle]} {...imgProps} />
        </TouchableWithoutFeedback>
        <Modal
          supportedOrientations={['portrait', 'landscape']}
          onRequestClose={closeImage}
          animationType={animationType}
          transparent={transparent}
          visible={visible}
          onOrientationChange={this.onOrientationChange.bind(this)}
        >
          <View
            style={[modal, modalStyle]}
            onLayout={Platform.OS === 'ios' ? null : this.onOrientationChange.bind(this)}
          >
            {Array.isArray(source) ?
              this.renderList(source, index, imgProps) : this.renderImage(basicSource, imgProps)}
            <Animated.View style={[this.styles.header, { opacity: this.state.opacity }]}>
              {renderHeader({ closeImage, pageNumber, totalPages })}
            </Animated.View>
            <Animated.View style={[this.styles.footer, { opacity: this.state.opacity }]}>
              {renderFooter({ closeImage, pageNumber, totalPages })}
            </Animated.View>
          </View>
        </Modal>
      </View>
    );
  }
}
