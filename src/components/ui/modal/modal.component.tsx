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
  ModalProps as ReactNativeModalProps,
  NativeSyntheticEvent,
} from 'react-native';
import {
  Frame,
  MeasureElement,
  MeasuringElement,
  Point,
} from '../../devsupport';
import { ModalService } from '../../theme';
import {Backdrop, BackdropPresentingConfig} from '@ui-kitten/components/theme/backdrop/backdrop.component';

export type RNModalProps =
  Pick<ReactNativeModalProps, 'animationType' | 'hardwareAccelerated' | 'supportedOrientations' | 'onShow'>;

export interface ModalProps extends ViewProps, BackdropPresentingConfig, RNModalProps {
  visible?: boolean;
  shouldUseContainer?: boolean;
  children?: React.ReactNode;
}

export type ModalElement = React.ReactElement<ModalProps>;

interface State {
  contentFrame: Frame;
  forceMeasure: boolean;
  contentPosition: Point;
}

/**
 * A wrapper that presents content above an enclosing view.
 *
 * @extends React.Component
 *
 * @property {ReactNode} children - Component to render within the modal.
 *
 * @property {boolean} visible - Whether component is visible.
 * Defaults to false.
 *
 * @property {boolean} shouldUseContainer - Whether children should be wrapped into absolute positioned container.
 * Defaults to true.
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
 * @property {() => void} onBackdropPress - Called when the modal is visible and the view below it was touched.
 * Useful when needed to close the modal on outside touches.
 *
 * @property {(event: NativeSyntheticEvent<any>) => void} onShow -
 * Allows passing a function that will be called once the modal has been shown.
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

  static defaultProps: Partial<ModalProps> = {
    shouldUseContainer: true,
  };

  public state: State = {
    contentFrame: Frame.zero(),
    forceMeasure: false,
    contentPosition: Point.outscreen(),
  };

  private get contentFlexPosition(): FlexStyle {
    const derivedStyle: ViewStyle = StyleSheet.flatten(this.props.style || {});
    const { x: centerX, y: centerY } = this.state.contentPosition;
    // @ts-ignore
    return { left: derivedStyle.left || centerX, top: derivedStyle.top || centerY };
  }

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
    const displayFrame: Frame = contentFrame.centerOf(Frame.window());
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
        shouldUseTopInsets={ModalService.getShouldUseTopInsets}
        onMeasure={this.onContentMeasure}>
        {this.renderContentElement()}
      </MeasureElement>
    );
  };

  public render(): React.ReactNode {
    return this.props.visible && (
      <RNModal
        transparent={true}
        visible={this.props.visible}
        supportedOrientations={this.props.supportedOrientations}
        statusBarTranslucent={ModalService.getShouldUseTopInsets}
        animationType={this.props.animationType}
        hardwareAccelerated={this.props.hardwareAccelerated}
        onRequestClose={this.props.onBackdropPress}
        onShow={this.props.onShow}
        onDismiss={this.props.onBackdropPress}>
        <Backdrop
          visible={this.props.visible}
          backdropStyle={this.props.backdropStyle}
          onBackdropPress={this.props.onBackdropPress}>
          {this.props.shouldUseContainer ? this.renderMeasuringContentElement() : this.props.children}
        </Backdrop>
      </RNModal>
    );
  }
}

const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
  },
});
