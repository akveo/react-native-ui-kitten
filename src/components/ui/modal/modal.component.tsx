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
} from 'react-native';
import {
  ModalPresentingConfig,
  ModalService,
} from '@kitten/theme';
import {
  MeasureElement,
  MeasuringElement,
} from '../measure/measure.component';
import {
  Frame,
  Point,
} from '../measure/type';

export interface ModalProps extends ViewProps, ModalPresentingConfig {
  visible: boolean;
  children: React.ReactNode;
}

export type ModalElement = React.ReactElement<ModalProps>;

interface State {
  contentFrame: Frame;
  forceMeasure: boolean;
}

const POINT_OUTSCREEN: Point = new Point(-999, -999);

/**
 * `Modal` component is a wrapper than presents content above an enclosing view.
 *
 * @extends React.Component
 *
 * @method {() => void} show - Sets modal visible.
 *
 * @method {() => void} hide - Sets modal invisible.
 *
 * @property {boolean} visible - Determines whether component is visible. By default is false.
 *
 * @property {ReactElement | ReactElement[]} children - Determines component's children.
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Determines the style of backdrop.
 *
 * @property {() => void} onBackdropPress - Determines component's behavior when the user is
 * tapping on back-drop.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example ModalSimpleUsage
 *
 * @overview-example ModalWithBackdrop
 */
export class Modal extends React.PureComponent<ModalProps, State> {

  public state: State = {
    contentFrame: Frame.zero(),
    forceMeasure: false,
  };

  private modalId: string;
  private contentPosition: Point = POINT_OUTSCREEN;

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
  }

  public componentWillUnmount(): void {
    this.hide();
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
      <MeasureElement onMeasure={this.onContentMeasure}>
        {this.renderContentElement()}
      </MeasureElement>
    );
  };

  public render(): React.ReactNode {
    if (this.modalId && this.props.visible) {
      ModalService.update(this.modalId, this.renderContentElement());
    }

    return null;
  }
}

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
  },
});
