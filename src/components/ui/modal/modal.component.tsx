/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  FlexStyle,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
  Dimensions,
} from 'react-native';
import {
  Frame,
  MeasureElement,
  MeasuringElement,
  Point,
} from '../../devsupport';
import {
  ModalPresentingConfig,
  ModalService,
} from '../../theme';

export interface ModalProps extends ViewProps, ModalPresentingConfig {
  visible?: boolean;
  children?: React.ReactNode;
}

export type ModalElement = React.ReactElement<ModalProps>;

interface State {
  contentFrame: Frame;
  forceMeasure: boolean;
}

/**
 * A wrapper that presents content above an enclosing view.
 *
 * @extends React.Component
 *
 * @method {() => void} show - Sets modal visible.
 *
 * @method {() => void} hide - Sets modal invisible.
 *
 * @property {ReactNode} children - Component to render within the modal.
 *
 * @property {boolean} visible - Whether component is visible.
 * Defaults to false.
 *
 * @property {() => void} onBackdropPress - Called when the modal is visible and the view below it was touched.
 * Useful when needed to close the modal on outside touches.
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Style of backdrop.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example ModalSimpleUsage
 * Modals accept content views as child elements and are displayed in the screen center.
 * To display a modal, a `visible` property should be used.
 *
 * @overview-example ModalWithBackdrop
 * To configure underlying view, `backdropStyle` and `onBackdropPress` properties may be used.
 */
export class Modal extends React.PureComponent<ModalProps, State> {

  public state: State = {
    contentFrame: Frame.zero(),
    forceMeasure: false,
  };

  private modalId: string;
  private contentPosition: Point = Point.outscreen();

  private get contentFlexPosition(): FlexStyle {
    const derivedStyle: ViewStyle = StyleSheet.flatten(this.props.style || {});
    const { x: centerX, y: centerY } = this.contentPosition;
    // @ts-ignore
    return { left: derivedStyle.left || centerX, top: derivedStyle.top || centerY };
  }

  private get backdropConfig(): ModalPresentingConfig {
    const { onBackdropPress, backdropStyle } = this.props;
    return { onBackdropPress, backdropStyle };
  }

  public show = (): void => {
    this.modalId = ModalService.show(this.renderMeasuringContentElement(), this.backdropConfig);
  };

  public hide = (): void => {
    this.modalId = ModalService.hide(this.modalId);
  };

  public componentDidMount(): void {
    Dimensions.addEventListener('change', this.onDimensionChange);
    if (!this.modalId && this.props.visible) {
      this.show();
      return;
    }
  }

  public componentDidUpdate(prevProps: ModalProps): void {
    if (!this.modalId && this.props.visible && !this.state.forceMeasure) {
      this.setState({ forceMeasure: true });
      return;
    }

    if (!this.modalId && this.props.visible) {
      this.show();
      return;
    }

    if (this.modalId && !this.props.visible) {
      this.hide();
    }

    if (this.modalId && this.props.visible) {
      ModalService.update(this.modalId, this.renderContentElement());
    }
  }

  public componentWillUnmount(): void {
    Dimensions.removeEventListener('change', this.onDimensionChange);
    this.hide();
  }

  private onDimensionChange = (): void => {
    if(this.props.visible) {
      ModalService.update(this.modalId, this.renderMeasuringContentElement());
    }
  }

  private onContentMeasure = (contentFrame: Frame): void => {
    this.state.contentFrame = contentFrame;

    const displayFrame: Frame = this.state.contentFrame.centerOf(Frame.window());
    this.contentPosition = displayFrame.origin;

    ModalService.update(this.modalId, this.renderContentElement());
  };

  private renderContentElement = (): React.ReactElement<ViewProps> => {
    return (
      <View
        {...this.props}
        style={[this.props.style, styles.modalView, this.contentFlexPosition]}
      />
    );
  };

  private renderMeasuringContentElement = (): MeasuringElement => {
    return (
      <MeasureElement
        shouldUseTopInsets={ModalService.getShouldUseTopInsets}
        onMeasure={this.onContentMeasure}>
        {this.renderContentElement()}
      </MeasureElement>
    );
  };

  public render(): React.ReactNode {
    return null;
  }
}

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
  },
});
