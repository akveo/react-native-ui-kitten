import React from 'react';
import {
  Modal,
  View,
  Animated,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import { RkComponent } from '../rkComponent';
import { RkGalleryGrid } from './rkGalleryGrid';
import { RkGalleryViewer } from './rkGalleryViewer';
import { RkGalleryHeaderFooter } from './RkGalleryHeaderFooter';
import { RkButton } from '../button/rkButton';

/**
 * `RkGallery` is a component which displays a grid of images or a horizontal list of modal images
 * depending on user behavior:
 * Single tap on grid item to view image in modal.
 * Double tap a modal item to pinch-to-zoom image.
 * Swipe modal item right or left to switch next or previous image.
 *
 * @extends React.Component
 *
 * @example Simple usage example:
 *
 * ```
 * <RkGallery items={[
 *   require('path/to/my-awesome-pic-0.jpg'),
 *   require('path/to/my-awesome-pic-1.jpg'),
 * ]} />
 * ```
 *
 * @example Custom header/footer
 *
 * It's possible to render custom header and footer when `RkGallery` is in modal state.
 * There are special props for this: `renderGalleryHeader` and `renderGalleryFooter`.
 *
 * ```
 * <RkGallery
 *   items={[item1, item2, ...]}
 *   renderGalleryHeader={this.renderGalleryHeader}
 *   renderGalleryFooter={this.renderGalleryFooter}
 * />
 *
 * // @param onRequestClose - default modal closing behavior which should
 * // be passed to any component able to perform a 'close' action.
 *
 * renderGalleryHeader = (onRequestClose) => (
 *   <View>
 *    <RkButton onPress={onRequestClose}>Back</RkButton>
 *   </View>
 * );
 *
 * renderGalleryFooter = () => (
 *   <View>
 *     <RkButton onPress={this.onGalleryFooterButtonPressed}>Custom Footer</RkButton>
 *   </View>
 * );
 *
 * onGalleryFooterButtonPressed = () => {
 *   // whatever
 * };
 * ```
 *
 * @example Handling component events:
 *
 * ```
 * <RkGallery
 *  items={[item1, item2, ...]}
 *  onGridItemClick={this.onGridItemClick}
 *  onGalleryItemClick={this.onGalleryItemClick}
 *  onGalleryItemChange={this.onGalleryItemChange}
 *  onGalleryItemScaleChange={this.onGalleryItemScaleChange}
 * />
 *
 * // Grid item click:
 * // Default behavior is to open a clicked grid item in modal, so you can't change this.
 * // Just do some work you need to be done on item click.
 * //
 * // @param item - grid image item
 * // @param index - grid image item index
 *
 * onGridItemClick = (item, index) => {
 *  // whatever
 * };
 *
 * // Modal item click:
 * // Default behavior is to show/hide header and footer, so you can't change this.
 * // Just do some work you need to be done on item click.
 * // @param item - modal image item
 * // @param index - modal image item index
 *
 * onGalleryItemClick = (item, index) => {
 *  // whatever
 * };
 *
 * // Modal item change:
 * // Called when:
 * // - default swipe right/left gesture is performed,
 * // - grid item becomes modal,
 * // - modal item becomes back to grid,
 * //
 * // @param change - object containing previous and current item indexes:
 * //
 * // Grid item with index 0 becomes modal:
 * // {
 * //  previous: undefined,
 * //  current: 0,
 * // }
 * //
 * // Swipe next:
 * // {
 * //  previous: 0,
 * //  current: 1,
 * // }
 * //
 * // Close modal on item 4:
 * // {
 * //  previous: 4,
 * //  current: undefined,
 * // }
 *
 * onGalleryItemChange = (change) => {
 *  // whatever
 * };
 *
 * // Modal item scale change:
 * // Called when:
 * // - pinch gesture is performed,
 * // - double click is performed
 * //
 * // @param item - modal image item,
 * // @param index - modal image item index,
 * // @param change - object containing previous and current image scale args:
 * //
 * // Double click:
 * //
 * // {
 * //  previous: 1.0,
 * //  current: 2.0
 * // }
 *
 * onGalleryItemScaleChange = (item, index, change) => {
 *  // whatever
 * };
 * ```

 *
 * @example Define new rkTypes
 *
 * `RkGallery` doesn't have predefined `rkType`s.
 *  However, it's easy and very common to create new types.
 *  Main point for all customization is `RkTheme` object.
 *  New rkTypes are defined using `setType` method of `RkTheme`.
 *  Available for stylization components are: `grid`, `gridItem`, `previewHeader`, `previewFooter`.
 *
 * ```
 * RkTheme.setType('RkGallery', 'projectDefault', {
 *   gridItem: {
 *     borderRadius: 8,
 *     margin: 1,
 *   }
 * });
 * ```
 *
 * @styles Available components:
 * - `grid`: `FlatList` - container in a grid (not modal) mode,
 * - `gridItem`: `TouchableWithoutFeedback ` - item inside container in a grid (not modal) mode,
 * - `previewHeader`: `View` - Header of container in a modal mode,
 * - `previewFooter`: `View` - Footer of container in a modal mode,
 *
 * @property {string} rkType - Types for component stylization
 * @property {style} style - Style for container in grid mode
 * @property {style} itemStyle - Style for image in grid mode
 * @property {function} renderGalleryHeader - Function for rendering custom header
 * @property {function} renderGalleryFooter - Function for rendering custom footer
 * @property {number} spanCount - number of container columns in a grid mode
 * @property {number} galleryItemMaxScale - maximum scale of a modal item applied via pinch gesture
 * or double click,
 * @property {function} onGridItemClick - Grid item click callback,
 * @property {function} onGalleryItemClick - Gallery (modal) item click callback,
 * @property {function} onGalleryItemChange - Gallery (modal) item change callback,
 * @property {function} onGalleryItemScaleChange - Gallery (modal) item scale change callback.
 */
export class RkGallery extends RkComponent {
  static propTypes = {
    rkType: RkComponent.propTypes.rkType,
    items: RkGalleryGrid.propTypes.items.isRequired,
    itemStyle: RkGalleryGrid.propTypes.itemStyle,
    renderGalleryHeader: RkGalleryHeaderFooter.propTypes.onRenderComponent,
    renderGalleryFooter: RkGalleryHeaderFooter.propTypes.onRenderComponent,
    spanCount: RkGalleryGrid.propTypes.spanCount,
    galleryItemMaxScale: RkGalleryViewer.propTypes.itemMaxScale,
    onGridItemClick: RkGalleryGrid.propTypes.onItemClick,
    onGalleryItemClick: RkGalleryViewer.propTypes.onItemClick,
    onGalleryItemChange: RkGalleryViewer.propTypes.onItemChange,
    onGalleryItemScaleChange: RkGalleryViewer.propTypes.onItemScaleChange,
    style: ViewPropTypes.style,
  };
  static defaultProps = {
    rkType: RkComponent.defaultProps.rkType,
    itemStyle: RkGalleryGrid.defaultProps.itemStyle,
    renderGalleryHeader: null,
    renderGalleryFooter: null,
    spanCount: RkGalleryGrid.defaultProps.spanCount,
    galleryItemMaxScale: RkGalleryViewer.defaultProps.itemMaxScale,
    onGridItemClick: RkGalleryGrid.defaultProps.onItemClick,
    onGalleryItemClick: RkGalleryViewer.defaultProps.onItemClick,
    onGalleryItemChange: RkGalleryViewer.defaultProps.onItemChange,
    onGalleryItemScaleChange: RkGalleryViewer.defaultProps.onItemScaleChange,
    style: null,
  };
  componentName = 'RkGallery';
  typeMapping = {
    grid: {},
    gridItem: {},
    previewHeader: {},
    previewFooter: {},
  };

  state = {
    previewImageIndex: undefined,
    overlayOpacity: new Animated.Value(0),
  };

  isPreview = () => this.state.previewImageIndex !== undefined;

  // eslint-disable-next-line arrow-body-style
  getOverlayAnimation = (endValue) => {
    return Animated.timing(this.state.overlayOpacity, { toValue: endValue, duration: 300 });
  };

  onModalRequestClose = () => {
    const change = {
      previous: this.state.previewImageIndex,
      current: undefined,
    };
    this.setState({
      previewImageIndex: change.current,
    });
    this.props.onGalleryItemChange(change);
  };

  onViewerItemClick = (item, index) => {
    // eslint-disable-next-line no-underscore-dangle
    const opacityValue = this.state.overlayOpacity._value === 0 ? 1 : 0;
    this.getOverlayAnimation(opacityValue).start();
    this.props.onGalleryItemClick(item, index);
  };

  onViewerItemChange = (change) => {
    this.setState({
      previewImageIndex: change.current,
    });
    this.props.onGalleryItemChange(change);
  };

  onGridItemClick = (item, index) => {
    const change = {
      previous: this.state.previewImageIndex,
      current: index,
    };
    this.setState({
      previewImageIndex: change.current,
      overlayOpacity: new Animated.Value(1),
    });
    this.props.onGridItemClick(item, index);
    this.props.onGalleryItemChange(change);
  };

  renderDefaultViewerHeader = (onRequestClose) => (
    <View>
      <RkButton
        rkType='clear'
        onPress={onRequestClose}>
        Close
      </RkButton>
    </View>
  );

  renderDefaultViewerFooter = () => (
    <View />
  );

  renderViewer = () => {
    const { previewHeader, previewFooter } = this.defineStyles(this.props.rkType);
    const header = {
      onRenderComponent: this.props.renderGalleryHeader || this.renderDefaultViewerHeader,
      definedStyle: this.props.renderGalleryHeader ? null : previewHeader,
      stateStyle: { opacity: this.state.overlayOpacity },
    };
    const footer = {
      onRenderComponent: this.props.renderGalleryFooter || this.renderDefaultViewerFooter,
      definedStyle: this.props.renderGalleryFooter ? null : previewFooter,
      stateStyle: { opacity: this.state.overlayOpacity },
    };
    return (
      <Modal onRequestClose={this.onModalRequestClose}>
        <View style={defaultComponentStyles.viewerContainer}>
          <RkGalleryViewer
            initialIndex={this.state.previewImageIndex}
            items={this.props.items}
            itemMaxScale={this.props.galleryItemMaxScale}
            onItemClick={this.onViewerItemClick}
            onItemChange={this.onViewerItemChange}
            onItemScaleChange={this.props.onGalleryItemScaleChange}
          />
          <RkGalleryHeaderFooter
            style={[header.definedStyle, defaultComponentStyles.viewerHeader, header.stateStyle]}
            onRenderComponent={() => header.onRenderComponent(this.onModalRequestClose)}
          />
          <RkGalleryHeaderFooter
            style={[footer.definedStyle, defaultComponentStyles.viewerFooter, footer.stateStyle]}
            onRenderComponent={footer.onRenderComponent}
          />
        </View>
      </Modal>
    );
  };

  renderGrid = () => {
    const { grid, gridItem } = super.defineStyles(this.props.rkType);
    return (
      <RkGalleryGrid
        style={[grid, this.props.style]}
        itemStyle={[gridItem, this.props.itemStyle]}
        items={this.props.items}
        spanCount={this.props.spanCount}
        onItemClick={this.onGridItemClick}
      />
    );
  };

  render() {
    return this.isPreview() ? this.renderViewer() : this.renderGrid();
  }
}

const defaultComponentStyles = StyleSheet.create({
  viewerContainer: {
    marginTop: 20,
  },
  viewerHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  viewerFooter: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
