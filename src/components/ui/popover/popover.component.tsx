/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Frame,
  MeasureElement,
  MeasuringElement,
  Point,
  RenderFCProp,
  Overwrite,
} from '../../devsupport';
import { ModalService } from '../../theme';
import {Modal, ModalProps, RNModalProps} from '../modal/modal.component';
import {
  PopoverView,
  PopoverViewElement,
  PopoverViewProps,
} from './popoverView.component';
import { PopoverPlacementService } from './placement.service';
import {
  PlacementOptions,
  PopoverPlacement,
  PopoverPlacements,
} from './type';

type PopoverModalProps = Overwrite<ModalProps, { children?: React.ReactElement; }>;

export interface PopoverProps extends PopoverViewProps, PopoverModalProps, RNModalProps {
  anchor: RenderFCProp;
  fullWidth?: boolean;
}

export type PopoverElement = React.ReactElement<PopoverProps>;

interface State {
  childFrame: Frame;
  forceMeasure: boolean;
  actualPlacement: PopoverPlacement;
  contentPosition: Point;
}

/**
 * Displays a content positioned relative to another view.
 *
 * @extends React.Component
 *
 * @property {boolean} visible - Whether content component is visible.
 * Defaults to false.
 * The property is more specific that the show/hide methods, so do not use them at the same time.
 *
 * @property {() => ReactElement} anchor - A component relative to which content component will be shown.
 *
 * @property {ReactElement} children - A component displayed within the popover.
 *
 * @property {() => void} onBackdropPress - Called when popover is visible and the underlying view was touched.
 * Useful when needed to close the modal on outside touches.
 *
 * @property {boolean} fullWidth - Whether a content component should take the width of `anchor`.
 *
 * @property {string | PopoverPlacement} placement - Position of the content component relative to the `anchor`.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start`, `bottom end`, `inner`, `inner top` or `inner bottom`.
 * Defaults to *bottom*.
 *
 * @property {boolean} hardwareAccelerated - Controls whether to force hardware acceleration for the underlying window.
 * Defaults to false.
 *
 * @property {'none' | 'slide' | 'fade'} animationType - Controls how the modal animates.
 * Defaults to 'none'.
 *
 * @property {Array<'portrait' | 'portrait-upside-down' | 'landscape' | 'landscape-left' | 'landscape-right'>}
 * supportedOrientations -
 * allows the modal to be rotated to any of the specified orientations.
 * On iOS, the modal is still restricted by what's specified
 * in your app's Info.plist's UISupportedInterfaceOrientations field
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Style of backdrop.
 *
 * @property {(event: NativeSyntheticEvent<any>) => void} onShow -
 * Allows passing a function that will be called once the modal has been shown.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example PopoverSimpleUsage
 * Popover accepts it's content as child element and is displayed relative to `anchor` view.
 *
 * @overview-example PopoverPlacement
 * By default, it is displayed to the bottom of `anchor` view, but it is configurable with `placement` property.
 *
 * @overview-example PopoverFullWidth
 * Popover may take the full width of the anchor view by configuring `fullWidth` property.
 *
 * @overview-example PopoverStyledBackdrop
 * To style the underlying view, `backdropStyle` property may be used.
 */
export class Popover extends React.Component<PopoverProps, State> {

  static defaultProps: Partial<PopoverProps> = {
    placement: PopoverPlacements.BOTTOM,
  };

  public state: State = {
    childFrame: Frame.zero(),
    forceMeasure: false,
    actualPlacement: this.preferredPlacement,
    contentPosition: Point.zero(),
  };

  private placementService: PopoverPlacementService = new PopoverPlacementService();

  private get preferredPlacement(): PopoverPlacement {
    return PopoverPlacements.parse(this.props.placement);
  }

  private get contentFlexPosition() {
    const { x: left, y: top } = this.state.contentPosition;
    return { left, top };
  }

  public componentDidUpdate(prevProps: PopoverProps): void {
    if (this.props.visible && !this.state.forceMeasure) {
      this.setState({ forceMeasure: true });
    }
  }

  private static getDerivedStateFromProps(props, state) {
    if (!props.visible) {
      return {
        ...state,
        contentPosition: Point.outscreen(),
      };
    }
    return null;
  }

  private onChildMeasure = (childFrame: Frame): void => {
    this.state.childFrame = childFrame;
  };

  private onContentMeasure = (anchorFrame: Frame): void => {
    const placementOptions: PlacementOptions = this.findPlacementOptions(anchorFrame, this.state.childFrame);
    const actualPlacement = this.placementService.find(this.preferredPlacement, placementOptions);

    const displayFrame: Frame = actualPlacement.frame(placementOptions);
    const contentPosition = displayFrame.origin;

    this.setState({
      actualPlacement,
      contentPosition,
    });

  };

  private findPlacementOptions = (contentFrame: Frame, childFrame: Frame): PlacementOptions => {
    const width: number = this.props.fullWidth ? childFrame.size.width : contentFrame.size.width;
    const frame: Frame = new Frame(contentFrame.origin.x, contentFrame.origin.y, width, contentFrame.size.height);

    return new PlacementOptions(frame, childFrame, Frame.window(), Frame.zero());
  };

  private renderContentElement = (): React.ReactElement => {
    const contentElement: React.ReactElement = this.props.children;
    const fullWidthStyle = { width: this.state.childFrame.size.width };

    return React.cloneElement(contentElement, {
      style: [this.props.fullWidth && fullWidthStyle, contentElement.props.style],
    });
  };

  private renderPopoverElement = (): PopoverViewElement => {
    return (
      <PopoverView
        {...this.props}
        contentContainerStyle={[this.props.contentContainerStyle, styles.popoverView, this.contentFlexPosition]}
        placement={this.state.actualPlacement.reverse()}>
          {this.renderContentElement()}
      </PopoverView>
    );
  };

  private renderMeasuringPopoverElement = (): MeasuringElement => {
    return (
      <MeasureElement onMeasure={this.onContentMeasure}>
          {this.renderPopoverElement()}
      </MeasureElement>
    );
  };

  public render(): React.ReactElement {
    return (
      <View>
        <MeasureElement
          force={this.state.forceMeasure}
          shouldUseTopInsets={ModalService.getShouldUseTopInsets}
          onMeasure={this.onChildMeasure}>
          {this.props.anchor()}
        </MeasureElement>
          <Modal
            visible={this.props.visible}
            shouldUseContainer={false}
            backdropStyle={this.props.backdropStyle}
            animationType={this.props.animationType}
            hardwareAccelerated={this.props.hardwareAccelerated}
            supportedOrientations={this.props.supportedOrientations}
            onShow={this.props.onShow}
            onBackdropPress={this.props.onBackdropPress}>
            {this.renderMeasuringPopoverElement()}
          </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  popoverView: {
    position: 'absolute',
  },
});
