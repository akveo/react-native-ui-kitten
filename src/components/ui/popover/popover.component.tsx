/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  Modal,
  View,
} from 'react-native';
import {
  Frame,
  MeasureElement,
  MeasuringElement,
  Point,
  RenderFCProp,
  Overwrite,
} from '../../devsupport';
import { ModalService } from '../../theme';
import { ModalProps } from '../modal/modal.component';
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
import {ModalResolver} from '@ui-kitten/components/theme/modal/modalResolver.component';

type PopoverModalProps = Overwrite<ModalProps, {
  children?: React.ReactElement;
}>;

export interface PopoverProps extends PopoverViewProps, PopoverModalProps {
  anchor: RenderFCProp;
  fullWidth?: boolean;
  shouldOverlayAnchor?: boolean;
}

export type PopoverElement = React.ReactElement<PopoverProps>;

interface State {
  childFrame: Frame;
  anchorFrame: Frame;
  forceMeasure: boolean;
  actualPlacement: PopoverPlacement;
  contentPosition: Point;
}

/**
 * Displays a content positioned relative to another view.
 *
 * @extends React.Component
 *
 * @method {() => void} show - Sets `content` component visible.
 *
 * @method {() => void} hide - Sets `content` component invisible.
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
 * @property {boolean} shouldOverlayAnchor - Whether a content component should overlay `anchor`.
 *
 * @property {string | PopoverPlacement} placement - Position of the content component relative to the `anchor`.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Defaults to *bottom*.
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Style of backdrop.
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
    anchorFrame: Frame.zero(),
    forceMeasure: false,
    actualPlacement: PopoverPlacements.BOTTOM,
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

  public show = (): void => {
    console.warn('deprecated');
  };

  public hide = (): void => {
    console.warn('deprecated');
  };

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
    this.setState({childFrame});
  };

  private onContentMeasure = (anchorFrame: Frame): void => {
    this.setState({anchorFrame});

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
      <MeasureElement
        onMeasure={this.onContentMeasure}>
          {this.renderPopoverElement()}
      </MeasureElement>
    );
  };

  public render(): React.ReactElement {
    return (
      <React.Fragment>
        <MeasureElement
          force={this.state.forceMeasure}
          shouldOverlayElement={this.props.shouldOverlayAnchor}
          onMeasure={this.onChildMeasure}>
          {this.props.anchor()}
        </MeasureElement>
        {this.props.visible && (
          <Modal
            transparent={true}
            visible={true}
            supportedOrientations={['portrait', 'landscape']}
            onRequestClose={this.props.onBackdropPress}
            statusBarTranslucent={ModalService.getShouldUseTopInsets}
            onDismiss={this.props.onBackdropPress}>
            <View style={[StyleSheet.absoluteFillObject]}>
              <ModalResolver
                visible={true}
                backdropStyle={this.props.backdropStyle}
                onBackdropPress={this.props.onBackdropPress}>
                {this.renderMeasuringPopoverElement()}
              </ModalResolver>
            </View>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  popoverView: {
    position: 'absolute',
  },
});
