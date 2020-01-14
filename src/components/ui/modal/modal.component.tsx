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
import { MeasureElement } from '../measure/measure.component';
import {
  Frame,
  Point,
} from '../measure/type';

export interface ModalProps extends ViewProps, ModalPresentingConfig {
  visible?: boolean;
  children: React.ReactNode;
}

export type ModalElement = React.ReactElement<ModalProps>;

interface State {
  contentFrame: Frame;
}

const POINT_OUTSCREEN: Point = new Point(-999, -999);

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
export class Modal extends React.Component<ModalProps, State> {

  private modalId: string;

  public state: State = {
    contentFrame: Frame.zero(),
  };

  private get contentFlexPosition(): FlexStyle {
    const derivedStyle: ViewStyle = StyleSheet.flatten(this.props.style || {});
    const centerInWindow: Point = this.state.contentFrame.centerOf(Frame.window()).origin;
    // @ts-ignore
    return { left: derivedStyle.left || centerInWindow.x, top: derivedStyle.top || centerInWindow.y };
  }

  private get backdropConfig(): ModalPresentingConfig {
    const { onBackdropPress, backdropStyle } = this.props;
    return { onBackdropPress, backdropStyle };
  }

  public componentDidUpdate(): void {
    if (!this.modalId && this.props.visible) {
      this.modalId = ModalService.show(this.renderModalElement(this.contentFlexPosition), this.backdropConfig);
      return;
    }

    if (this.modalId && !this.props.visible) {
      this.modalId = ModalService.hide(this.modalId);
    }
  }

  private onContentMeasure = (frame: Frame): void => {
    this.state.contentFrame = frame;

    if (!this.modalId && this.props.visible) {
      this.modalId = ModalService.show(this.renderModalElement(this.contentFlexPosition), this.backdropConfig);
    }
  };

  private renderModalElement = (style: ViewStyle): React.ReactElement<ViewProps> => {
    return (
      <View
        {...this.props}
        style={[this.props.style, styles.contentView, style]}
      />
    );
  };

  public render(): React.ReactElement {
    return (
      <MeasureElement onMeasure={this.onContentMeasure}>
        {this.renderModalElement(styles.outscreen)}
      </MeasureElement>
    );
  }
}

const styles = StyleSheet.create({
  contentView: {
    position: 'absolute',
  },
  outscreen: {
    left: POINT_OUTSCREEN.x,
    top: POINT_OUTSCREEN.y,
  },
});
