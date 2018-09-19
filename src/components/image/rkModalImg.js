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
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import { RkButton } from '../button/rkButton';
import { RkText } from '../text/rkText';
import { RkComponent } from '../rkComponent';
import { RkTheme } from '../../styles/themeManager';

/**
 * `RkModalImg` is extension of basic `Image` that also opens it in full screen on tap.
 *
 * @deprecated since version 3.1.0. Will be deleted in version 3.2.0.
 * Use `RkGallery` or `RkGalleryImage` instead.
 *
 * @extends React.Component
 *
 * @example Important notes
 *
 * Deprecated since version 3.1.0. Will be deleted in version 3.2.0.
 * Use `RkGallery` or `RkGalleryImage` instead.
 *
 * ```
 * <RkGalleryImage source={require('path/to/my-awesome-pic.jpg')}/>
 * ```
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
  static propTypes = {
    index: PropTypes.number,
    source: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]).isRequired,
    style: ViewPropTypes.style,
    imgContainerStyle: ViewPropTypes.style,
    modalStyle: ViewPropTypes.style,
    modalImgStyle: ViewPropTypes.style,
    headerStyle: ViewPropTypes.style,
    footerStyle: ViewPropTypes.style,
    renderHeader: PropTypes.func,
    renderFooter: PropTypes.func,
  };
  static defaultProps = {
    index: 0,
    style: null,
    imgContainerStyle: null,
    modalStyle: null,
    modalImgStyle: null,
    headerStyle: null,
    footerStyle: null,
    renderHeader: undefined,
    renderFooter: undefined,
  };

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

  state = {
    opacity: new Animated.Value(1),
    visible: false,
    width: undefined,
    height: undefined,
    index: 0,
  };

  needUpdateScroll = false;

  constructor(props) {
    super(props);
    this.state.index = props.index;
  }

  onContainerScroll = (event) => {
    const currentIndex = Math.round(event.nativeEvent.contentOffset.x / this.state.width);
    if (currentIndex >= 0 &&
      currentIndex <= this.props.source.length &&
      currentIndex !== this.state.index) {
      this.setState({
        index: currentIndex,
      });
    }
  };

  onRenderImageContainer = (source, index, props) => (
    <FlatList
      data={Array.from(source)}
      getItemLayout={this.onRenderItemLayout}
      renderItem={({ item }) => this.onRenderImage(item, props)}
      initialScrollIndex={index}
      horizontal={true}
      pagingEnabled={true}
      keyExtractor={(item, srcIndex) => srcIndex.toString()}
      onScroll={this.onContainerScroll}
    />
  );

  onRenderItemLayout = (item, index) => ({
    length: this.state.width,
    offset: this.state.width * index,
    index,
  });

  onRenderImage = (source, props) => (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={this.onImageClicked}>
      <Image source={source} {...props} />
    </TouchableWithoutFeedback>
  );

  onRenderHeader = (options) => {
    const content = this.styles ? this.styles.headerContent : {};
    const text = this.styles ? this.styles.headerText : {};
    return (
      <View style={content}>
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <RkButton
            rkType='clear'
            onPress={options.closeImage}>
            Close
          </RkButton>
        </View>
        <View style={{
          flex: 1,
          alignItems: 'center',
        }}>
          <RkText style={text}>{this.onRenderPageNumber()}</RkText>
        </View>
        <View style={{
          flex: 1,
        }}
        />
      </View>
    );
  };

  onRenderPageNumber = () => {
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
  };

  onRenderFooter = () => {
    const style = this.styles ? this.styles.footerContent : {};
    return (
      <View style={style} />
    );
  };

  onImageClicked = () => {
    // eslint-disable-next-line no-underscore-dangle
    const endValue = this.state.opacity._value ? 0 : 1;
    Animated.timing(this.state.opacity, {
      toValue: endValue,
    }).start();
  };

  onRootViewClicked = () => {
    this.needUpdateScroll = true;
    this.setState({
      visible: true,
    });
  };

  onCloseImage = () => this.setState({
    visible: false,
  });

  onUpdateDimension() {
    const { height, width } = Dimensions.get('window');
    this.state.height = height;
    this.state.width = width;
  }

  onOrientationChange = () => {
    this.needUpdateScroll = true;
    this.forceUpdate();
  };

  render() {
    const {
      imgContainerStyle,
      modalStyle,
      modalImgStyle,
      headerStyle,
      footerStyle,
      source,
      index: initialIndex,
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

    const renderHeader = this.props.renderHeader || this.onRenderHeader;
    const renderFooter = this.props.renderFooter || this.onRenderFooter;
    const animationType = imgProps.animationType || 'fade';
    const transparent = imgProps.transparent === undefined ? false : imgProps.transparent;
    const visible = imgProps.visible === undefined ? this.state.visible : imgProps.visible;

    this.onUpdateDimension();

    if (visible) {
      imgProps.style = [
        imgProps.style,
        { height: this.state.height, width: this.state.width },
        modalImg,
        modalImgStyle,
      ];
    }
    const closeImage = this.onCloseImage;
    const pageNumber = +this.state.index + 1;
    const totalPages = this.props.source.length;
    const basicSource = Array.isArray(source) ? source[+initialIndex] : source;
    return (
      <View>
        <TouchableWithoutFeedback
          style={[imgContainer, imgContainerStyle]}
          onPress={this.onRootViewClicked}>
          <Image
            style={[img, imgStyle]}
            source={basicSource}
            {...imgProps}
          />
        </TouchableWithoutFeedback>
        <Modal
          supportedOrientations={['portrait', 'landscape']}
          onRequestClose={closeImage}
          animationType={animationType}
          transparent={transparent}
          visible={visible}
          onOrientationChange={this.onOrientationChange}>
          <View
            style={[modal, modalStyle]}
            onLayout={Platform.OS === 'ios' ? null : this.onOrientationChange}>
            {Array.isArray(source) ?
              this.onRenderImageContainer(source, +initialIndex, imgProps) :
              this.onRenderImage(basicSource, imgProps)}
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
