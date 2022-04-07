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
  Modal as RNModal,
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
import {ModalResolver} from '@ui-kitten/components/theme/modal/modalResolver.component';

export interface ModalProps extends ViewProps, ModalPresentingConfig {
  visible?: boolean;
  children?: React.ReactNode;
}

export type ModalElement = React.ReactElement<ModalProps>;

interface State {
  contentFrame: Frame;
  forceMeasure: boolean;
  visible: boolean;
  contentPosition: Point;
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
    visible: false,
    contentPosition: Point.outscreen(),
  };

  private get contentFlexPosition(): FlexStyle {
    const derivedStyle: ViewStyle = StyleSheet.flatten(this.props.style || {});
    const { x: centerX, y: centerY } = this.state.contentPosition;
    // @ts-ignore
    return { left: derivedStyle.left || centerX, top: derivedStyle.top || centerY };
  }

  public show = (): void => {
    // deprecated
  };

  public hide = (): void => {
    // deprecated
  };

  public componentDidUpdate(prevProps: ModalProps): void {
    if (this.props.visible && !this.state.forceMeasure) {
      this.setState({ forceMeasure: true });
      return;
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

  private onContentMeasure = (contentFrame: Frame): void => {
    this.setState({contentFrame});

    const displayFrame: Frame = this.state.contentFrame.centerOf(Frame.window());
    this.setState({contentPosition: displayFrame.origin});
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
        onMeasure={this.onContentMeasure}>
        {this.renderContentElement()}
      </MeasureElement>
    );
  };

  public render(): React.ReactNode {
    return this.props.visible && (
      <RNModal
        transparent={true}
        visible={true}
        supportedOrientations={['portrait', 'landscape']}
        statusBarTranslucent={ModalService.getShouldUseTopInsets}
        onRequestClose={this.props.onBackdropPress}
        onDismiss={this.props.onBackdropPress}>
        <View style={[StyleSheet.absoluteFillObject]}>
          <ModalResolver
            visible={true}
            backdropStyle={this.props.backdropStyle}
            onBackdropPress={this.props.onBackdropPress}>
            {this.renderMeasuringContentElement()}
          </ModalResolver>
        </View>
      </RNModal>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
  },
});
