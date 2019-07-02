/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  View,
  ViewProps,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
  ModalService,
  StyleType,
} from '@kitten/theme';
import {
  MeasureNode,
  MeasuringElementProps,
  MeasureResult,
} from '@kitten/ui/popover/measure.component';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
const TAG_CHILD: string = 'Modal';

type ChildElement = React.ReactElement<any>;
type ChildrenProp = ChildElement | ChildElement[];

export interface BackdropStyle {
  backgroundColor: string;
  opacity: number;
}

interface ComponentProps {
  visible: boolean;
  children: ChildrenProp;
  closeOnBackdrop: boolean;
  backdropStyle?: BackdropStyle;
}

export type ModalProps = ViewProps & ComponentProps;

export class Modal extends React.Component<ModalProps> {

  static defaultProps: Partial<ModalProps> = {
    closeOnBackdrop: true,
  };

  private contentHeight: number = 0;
  private contentWidth: number = 0;
  private id: string = '';

  public componentWillReceiveProps(nextProps: Readonly<ModalProps>): void {
    this.handleVisibility(nextProps);
  }

  private handleVisibility = (nextProps: Readonly<ModalProps>): void => {
    if (nextProps.visible) {
      const modal: React.ReactElement = this.renderModal();
      this.id = ModalService.show(modal, this.props.closeOnBackdrop);
    } else {
      ModalService.hide(this.id);
      this.id = '';
    }
  };

  private getAbsoluteRelatedStyle = (): StyleType => {
    return {
      top: (screenHeight - this.contentHeight) / 2,
      left: (screenWidth - this.contentWidth) / 2,
    };
  };

  private renderModal = (): React.ReactElement => {
    const { backdropStyle } = this.props;

    const modal: React.ReactElement<ViewProps> = this.renderBaseModal();
    if (backdropStyle) {
      return (
        <React.Fragment>
          <View
            pointerEvents='box-none'
            style={[styles.backdropBaseStyles, backdropStyle]}/>
          {modal}
        </React.Fragment>
      );
    } else {
      return modal;
    }
  };

  private renderBaseModal = (): React.ReactElement<ViewProps> => {
    const { style, ...restProps } = this.props;
    const absoluteRelatedStyle: StyleType = this.getAbsoluteRelatedStyle();
    const measuringProps: MeasuringElementProps = { tag: TAG_CHILD };

    return (
      <View
        {...restProps}
        {...measuringProps}
        key={TAG_CHILD}
        style={[styles.container, absoluteRelatedStyle, style]}>
        {this.props.children}
      </View>
    );
  };

  private onMeasure = (result: MeasureResult): void => {
    const { width, height } = result[TAG_CHILD].size;

    this.contentHeight = height;
    this.contentWidth = width;
  };

  public render(): React.ReactNode {
    const modal: React.ReactElement = this.renderBaseModal();
    const measureStyledModal: React.ReactElement = React.cloneElement(modal, {
      style: [modal.props.style, styles.hiddenModal],
      key: TAG_CHILD,
    });

    return (
      <MeasureNode onResult={this.onMeasure}>
        {[measureStyledModal]}
      </MeasureNode>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  hiddenModal: {
    display: 'none',
  },
  backdropBaseStyles: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
  },
});


/**
 * Modal component is a wrapper than presents content above an enclosing view.
 *
 * @extends React.Component
 *
 * @property {boolean} visible - Determines whether component is visible. By default is false.
 *
 * @property {React.ReactElement<any> | React.ReactElement<any>[]} children -
 * Determines component's children.
 *
 * @property {boolean} isBackDropAllowed - Determines whether user can close
 * modalHelper by tapping on backdrop. This feature works in pair with the
 * `onCloseModal` property.
 * Default is `false`.
 *
 * @property {() => void} onCloseModal - Allows passing a function that will
 * be called once the modalHelper has been dismissed.
 *
 * @property {ModalAnimationType} animationType - Controls how the modalHelper showing animates.
 * Can be `slideInUp`, `fade` or `none`.
 * Default is 'none'.
 *
 * @property {number} animationDuration - Time of the animation duration.
 *
 * @property ViewProps
 *
 * @example Simple usage example
 *
 * ```
 * import { Modal } from 'react-native-ui-kitten';
 * <Modal visible={true}>
 *  <View><Text>Hello! I'm modalHelper!</Text></View>
 * </Modal>
 * ```
 * @example Modal usage and API example
 *
 * ```
 * import { Modal } from 'react-native-ui-kitten';
 *
 * state: State = {
 *   visible: false,
 * };
 *
 * private setVisible = (): void => {
 *   this.setState({ visible: !this.state.visible });
 * };
 *
 * private onModalDismiss = (): void => {
 *   this.setState({ visible: false });
 * };
 *
 * public render(): React.ReactNode {
 *   return (
 *     <View>
 *       <Button title='Show Modal' onPress={this.setVisible}/>
 *       <Modal
 *         visible={this.state.visible}
 *         animationType='fade'
 *         animationDuration={600}
 *         isBackDropAllowed={true}
 *         onCloseModal={this.onModalDismiss}
 *         onValueChange={this.onChange}>
 *         <View>
 *           <Text>Hi! This is modalHelper component!</Test>
 *           <Button title='Close Modal' onPress={this.setVisible}/>
 *         <View/>
 *       </Modal>
 *     </View>
 *   )
 * }
 * ```
 * */
