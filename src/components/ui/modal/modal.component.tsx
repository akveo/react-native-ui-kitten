/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  ModalPresentingConfig,
  ModalService,
  StyleType,
} from '@kitten/theme';
import {
  MeasureElement,
  MeasuringElement,
} from '../measure/measure.component';
import {
  Frame,
  Size,
} from '../measure/type';

const window: Frame = Frame.window();
export const baseModalTestId: string = '@modal/base';

type ChildElement = React.ReactElement;
type ChildrenProp = ChildElement | ChildElement[];

export interface ModalProps extends ViewProps, ModalPresentingConfig {
  visible?: boolean;
  children: ChildrenProp;
}

export type ModalElement = React.ReactElement<ModalProps>;

/**
 * `Modal` component is a wrapper than presents content above an enclosing view.
 *
 * @extends React.Component
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
export class Modal extends React.Component<ModalProps> {

  static defaultProps: Partial<ModalProps> = {
    onBackdropPress: () => null,
  };

  private contentSize: Size = Size.zero();
  private id: string = '';

  private get backdropConfig() {
    const { onBackdropPress, backdropStyle } = this.props;
    return { onBackdropPress, backdropStyle };
  }

  public componentDidUpdate(prevProps: ModalProps): void {
    if (prevProps.visible !== this.props.visible) {
      this.handleVisibility(this.props);
    } else if (prevProps.visible && this.props.visible) {
      const element: React.ReactElement = this.renderBaseModal();
      ModalService.update(this.id, element.props.children);
    }
  }

  private handleVisibility = (props: ModalProps): void => {
    if (props.visible) {
      const element: React.ReactElement = this.renderBaseModal();
      this.id = ModalService.show(element, this.backdropConfig);
    } else {
      this.id = ModalService.hide(this.id);
    }
  };

  private getAbsoluteRelatedStyle = (): StyleType => {
    const windowFrame: Frame = Frame.window();

    return {
      top: (windowFrame.size.height - this.contentSize.height) / 2,
      left: (windowFrame.size.width - this.contentSize.width) / 2,
    };
  };

  private onMeasure = (frame: Frame): void => {
    this.contentSize = frame.size;
  };

  private renderBaseModal = (): React.ReactElement<ViewProps> => {
    const { style, children, ...restProps } = this.props;
    const absoluteRelatedStyle: StyleType = this.getAbsoluteRelatedStyle();

    return (
      <View
        {...restProps}
        testID={baseModalTestId}
        style={[styles.container, absoluteRelatedStyle, style]}>
        {children}
      </View>
    );
  };

  public render(): MeasuringElement {
    const modal: React.ReactElement = this.renderBaseModal();
    const measureStyledModal: React.ReactElement = React.cloneElement(modal, {
      style: [modal.props.style, styles.hiddenModal],
      pointerEvents: 'none',
    });

    return (
      <MeasureElement onMeasure={this.onMeasure}>
        {measureStyledModal}
      </MeasureElement>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
  backdrop: {
    position: 'absolute',
    width: window.size.width,
    height: window.size.height,
  },
  hiddenModal: {
    opacity: 0,
  },
});
