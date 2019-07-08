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
  MeasureNodeProps,
  MeasuringElementProps,
  MeasureResult,
} from '@kitten/ui/popover/measure.component';
import { Size } from '@kitten/ui/popover/type';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');
const TAG_CHILD: string = 'Modal';
const initialContentSize: Size = { width: 0, height: 0 };
export const baseModalTestId: string = '@modal/base';

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
 * @property {boolean} closeOnBackdrop - Determines whether user can close
 * Modal by tapping on backdrop.
 * Default is `true`.
 *
 * @property {{backgroundColor: string, opacity: number }} backdropStyle - Determines the style of backdrop.
 *
 * @property ViewProps
 *
 * @example Modal usage and API example
 *
 * ```
 * import { Modal } from 'react-native-ui-kitten';
 *
 * state: State = {
 *   visible: false,
 * };
 *
 * private setVisible = (visible: boolean): void => {
 *   this.setState({ visible });
 * };
 *
 * public render(): React.ReactNode {
 *   return (
 *     <View>
 *       <Button title='Show Modal' onPress={() => this.setVisible(true)}/>
 *       <Modal
 *         visible={this.state.visible}
 *         closeOnBackdrop={false}>
 *         <View>
 *           <Text>Hi! This is Modal Component!</Test>
 *           <Button title='Close Modal' onPress={() => this.setVisible(false)}/>
 *         <View/>
 *       </Modal>
 *     </View>
 *   )
 * }
 * ```
 * */

export class Modal extends React.Component<ModalProps> {

  static defaultProps: Partial<ModalProps> = {
    closeOnBackdrop: true,
  };

  private contentSize: Size = initialContentSize;
  private id: string = '';

  public componentWillReceiveProps(nextProps: ModalProps): void {
    this.handleVisibility(nextProps);
  }

  private handleVisibility = (nextProps: ModalProps): void => {
    if (nextProps.visible) {
      const modal: React.ReactElement = this.renderModal();
      this.id = ModalService.show(modal, this.props.closeOnBackdrop);
    } else {
      ModalService.hide(this.id);
      this.id = '';
    }
  };

  private getAbsoluteRelatedStyle = (): StyleType => {
    const { width, height } = this.contentSize;

    return {
      top: (screenHeight - height) / 2,
      left: (screenWidth - width) / 2,
    };
  };

  private onMeasure = (result: MeasureResult): void => {
    this.contentSize = result[TAG_CHILD].size;
  };

  private renderBaseModal = (): React.ReactElement<ViewProps> => {
    const { style, children, ...restProps } = this.props;
    const absoluteRelatedStyle: StyleType = this.getAbsoluteRelatedStyle();
    const measuringProps: MeasuringElementProps = { tag: TAG_CHILD };

    return (
      <View
        {...restProps}
        {...measuringProps}
        testID={baseModalTestId}
        key={TAG_CHILD}
        style={[styles.container, absoluteRelatedStyle, style]}>
        {children}
      </View>
    );
  };

  private renderModal = (): React.ReactElement => {
    const { backdropStyle } = this.props;
    const modal: React.ReactElement<ViewProps> = this.renderBaseModal();

    return backdropStyle ? (
      <React.Fragment>
        <View
          pointerEvents='box-none'
          style={[styles.backdropBaseStyles, backdropStyle]}/>
        {modal}
      </React.Fragment>
    ) : modal;
  };

  private renderMeasureNode = (): React.ReactElement<MeasureNodeProps> => {
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
  };

  public render(): React.ReactNode {
    return this.renderMeasureNode();
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  hiddenModal: {
    opacity: 0,
  },
  backdropBaseStyles: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
  },
});
