/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleSheet,
  ViewProps,
} from 'react-native';
import { ModalService } from '@kitten/theme';
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
import {
  MeasureElement,
  MeasuringElement,
} from '../measure/measure.component';
import { ModalProps } from '../modal/modal.component';
import {
  Frame,
  Point,
} from '../measure/type';

export interface PopoverProps extends PopoverViewProps, ModalProps {
  content: React.ReactElement;
  children: React.ReactElement;
  fullWidth?: boolean;
}

export type PopoverElement = React.ReactElement<PopoverProps>;

interface State {
  childFrame: Frame;
  contentFrame: Frame;
  forceMeasure: boolean;
}

const POINT_OUTSCREEN: Point = new Point(-999, -999);

/**
 * Displays content in a Modal positioned relative to child component.
 * Supports automatic positioning.
 *
 * @extends React.Component
 *
 * @method {() => void} show - Sets `content` element visible.
 *
 * @method {() => void} hide - Sets `content` element invisible.
 *
 * @property {boolean} visible - Determines whether popover is visible or not.
 *
 * @property {ReactElement} content - Determines the content of the popover.
 *
 * @property {ReactElement} children - Determines the element "above" which popover will be shown.
 *
 * @property {string | PopoverPlacement} placement - Determines the actualPlacement of the popover.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Default is `bottom`.
 * Tip: use one of predefined placements instead of strings, e.g `PopoverPlacements.TOP`
 *
 * @property {boolean} fullWidth - Determines whether content element should have same width as child element.
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Determines the style of backdrop.
 *
 * @property {() => void} onBackdropPress - Determines component's behavior when the user is
 * tapping on back-drop.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example PopoverSimpleUsage
 *
 * @overview-example PopoverPlacement
 *
 * @overview-example PopoverStyledBackdrop
 */
export class Popover extends React.Component<PopoverProps, State> {

  static defaultProps: Partial<PopoverProps> = {
    placement: PopoverPlacements.BOTTOM,
  };

  public state: State = {
    childFrame: Frame.zero(),
    contentFrame: Frame.zero(),
    forceMeasure: false,
  };

  private modalId: string;
  private contentPosition: Point = POINT_OUTSCREEN;
  private placementService: PopoverPlacementService = new PopoverPlacementService();

  private actualPlacement: PopoverPlacement = this.preferredPlacement;

  private get preferredPlacement(): PopoverPlacement {
    return PopoverPlacements.parse(this.props.placement);
  }

  private get contentFlexPosition() {
    const { x: left, y: top } = this.contentPosition;
    return { left, top };
  }

  private get backdropConfig() {
    const { onBackdropPress, backdropStyle } = this.props;
    return { onBackdropPress, backdropStyle };
  }

  public show = (): void => {
    this.modalId = ModalService.show(this.renderMeasuringPopoverElement(), this.backdropConfig);
  };

  public hide = (): void => {
    this.modalId = ModalService.hide(this.modalId);
  };

  public componentDidUpdate(prevProps: PopoverProps): void {
    if (!this.modalId && this.props.visible && !this.state.forceMeasure) {
      this.setState({ forceMeasure: true });
      return;
    }

    if (this.modalId && !this.props.visible) {
      this.contentPosition = POINT_OUTSCREEN;
      this.hide();
    }
  }

  public componentWillUnmount(): void {
    this.hide();
  }

  private onChildMeasure = (childFrame: Frame): void => {
    this.state.childFrame = childFrame;

    if (!this.modalId && this.props.visible) {
      this.show();
      return;
    }

    if (this.modalId && this.props.visible) {
      ModalService.update(this.modalId, this.renderPopoverElement());
    }
  };

  private onContentMeasure = (contentFrame: Frame): void => {
    this.state.contentFrame = contentFrame;

    const placementOptions: PlacementOptions = this.findPlacementOptions(contentFrame, this.state.childFrame);
    this.actualPlacement = this.placementService.find(this.preferredPlacement, placementOptions);

    const displayFrame: Frame = this.actualPlacement.frame(placementOptions);
    this.contentPosition = displayFrame.origin;

    ModalService.update(this.modalId, this.renderPopoverElement());
  };

  private findPlacementOptions = (contentFrame: Frame, childFrame: Frame): PlacementOptions => {
    const width: number = this.props.fullWidth ? childFrame.size.width : contentFrame.size.width;
    const frame: Frame = new Frame(contentFrame.origin.x, contentFrame.origin.y, width, contentFrame.size.height);

    return new PlacementOptions(frame, childFrame, Frame.window(), Frame.zero());
  };

  private renderContentElement = (): React.ReactElement => {
    const contentElement: React.ReactElement = this.props.content;
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
        placement={this.actualPlacement.reverse()}>
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
      <MeasureElement
        force={this.state.forceMeasure}
        onMeasure={this.onChildMeasure}>
        {this.props.children}
      </MeasureElement>
    );
  }
}

const styles = StyleSheet.create({
  popoverView: {
    position: 'absolute',
  },
});
