/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Platform,
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  ModalComponentCloseProps,
  ModalService,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  PopoverView,
  Props as PopoverViewProps,
} from './popoverView.component';
import {
  MeasuredElement,
  MeasureNode,
  MeasureResult,
  MeasuringElement,
  MeasuringElementProps,
  MeasuringNode,
} from './measure.component';
import {
  Frame,
  OffsetRect,
  Offsets,
  Placement,
  Placements,
} from './type';

interface PopoverProps {
  content: React.ReactElement<any>;
  children: React.ReactElement<any>;
  visible?: boolean;
}

export type Props = PopoverProps & ModalComponentCloseProps & StyledComponentProps & PopoverViewProps & ViewProps;

const TAG_CHILD: number = 0;
const TAG_CONTENT: number = 1;
const PLACEMENT_DEFAULT: Placement = Placements.BOTTOM;

/**
 * The `Popover` component is a component that displays content when users focus on or tap an element.
 *
 * @extends React.Component
 *
 * @property {React.ReactElement<any>} content - Determines the content of the popover.
 *
 * @property {React.ReactElement<any>} children - Determines the element "above" which popover will be shown.
 *
 * @property {boolean} visible - Determines whether popover is visible or not.
 *
 * @property {string | Placement} placement - Determines the placement of the popover.
 * Can be 'left' | 'top' | 'right' | 'bottom' | 'left start' | 'left end' | 'top start' | 'top end' | 'right start' |
 * 'right end' | 'bottom start' | 'bottom end'.
 * By default placement is 'top'.
 *
 * @property {number} indicatorOffset - Determines the offset of indicator (arrow).
 *
 * @property ViewProps
 *
 * @property ModalComponentCloseProps
 *
 * @property StyledComponentProps
 *
 * @example Popover usage API example
 *
 * ```
 * import {
 *   Popover,
 *   Button,
 *   Text,
 * } from '@kitten/ui';
 *
 * public state: State = {
 *   popoverVisible: false,
 * };
 *
 * private onShowPress = () => {
 *   this.setState({ popoverVisible: !this.state.popoverVisible });
 * };
 *
 * private renderPopoverContentElement = (): React.ReactElement<ViewProps> => {
 *    return (
 *      <View style={styles.popoverContent}>
 *        <Text>Hi! This is popover.</Text>
 *        <Button>Some Action</Button>
 *      </View>
 *    );
 * };
 *
 * public render(): React.ReactNode {
 *   return (
 *     <Popover
 *       style={styles.popoverContainer}
 *       placement='top start'
 *       visible={this.state.popoverVisible}
 *       content={this.renderPopoverContentElement()}
 *       onRequestClose={this.onShowPress}>
 *       <TouchableOpacity
 *         style={styles.popoverChild}
 *         onPress={this.onShowPress}>
 *         <Text style={text}>Top Start</Text>
 *       </TouchableOpacity>
 *     </Popover>
 *   );
 * }
 * ```
 * */

export class Popover extends React.Component<Props> {

  static styledComponentName: string = 'Popover';

  static defaultProps: Partial<Props> = {
    placement: PLACEMENT_DEFAULT.rawValue,
    visible: false,
  };

  private popoverElement: MeasuredElement = undefined;
  private popoverModalId: string = '';

  public componentDidUpdate(prevProps: Props): void {
    const { visible } = this.props;

    if (prevProps.visible !== visible) {
      if (visible) {
        // Toggles re-measuring
        this.setState({ layout: undefined });
      } else {
        ModalService.hide(this.popoverModalId);
      }
    }
  }

  public componentWillUnmount() {
    this.popoverModalId = '';
  }

  private getComponentStyle = (source: StyleType): StyleType => {
    return {
      child: {},
      popover: source,
    };
  };

  private onMeasure = (layout: MeasureResult) => {
    const { visible } = this.props;

    if (visible) {
      this.popoverModalId = this.showPopoverModal(this.popoverElement, layout);
    }
  };

  private showPopoverModal = (element: MeasuredElement, layout: MeasureResult): string => {
    const { placement, onRequestClose } = this.props;

    const popoverFrame: Frame = this.getPopoverFrame(layout, placement);

    const { origin: popoverPosition } = popoverFrame;

    const additionalStyle: ViewStyle = {
      left: popoverPosition.x,
      top: Platform.select({
        android: popoverPosition.y + StatusBar.currentHeight,
        default: popoverPosition.y,
      }),
      opacity: 1,
    };

    const popover: React.ReactElement<ModalComponentCloseProps> = React.cloneElement(element, {
      style: additionalStyle,
      onRequestClose: onRequestClose,
    });

    return ModalService.show(popover, true);
  };

  private getPopoverFrame = (layout: MeasureResult, rawPlacement: string | Placement): Frame => {
    const { children } = this.props;
    const { [TAG_CONTENT]: popoverFrame, [TAG_CHILD]: childFrame } = layout;

    const offsetRect: OffsetRect = Offsets.find(children.props.style);
    const placement: Placement = Placements.parse(rawPlacement, PLACEMENT_DEFAULT);

    return placement.frame(popoverFrame, childFrame, offsetRect);
  };

  private renderPopoverElement = (children: React.ReactElement<any>, style: StyleProp<ViewStyle>): MeasuringElement => {
    const { placement, ...derivedProps } = this.props;

    const measuringProps: MeasuringElementProps = {
      tag: TAG_CONTENT,
    };

    const popoverPlacement: Placement = Placements.parse(placement, PLACEMENT_DEFAULT);
    const indicatorPlacement: Placement = popoverPlacement.reverse();

    return (
      <View
        {...measuringProps}
        key={TAG_CONTENT}
        style={styles.popover}>
        <PopoverView
          {...derivedProps}
          style={[style, derivedProps.style]}
          placement={indicatorPlacement.rawValue}>
          {children}
        </PopoverView>
      </View>
    );
  };

  private renderChildElement = (source: React.ReactElement<any>, style: StyleProp<ViewStyle>): MeasuringElement => {
    const measuringProps: MeasuringElementProps = { tag: TAG_CHILD };

    return (
      <View
        {...measuringProps}
        key={TAG_CHILD}
        style={style}>
        {source}
      </View>
    );
  };

  private renderMeasuringElement = (...children: MeasuringElement[]): MeasuringNode => {
    return (
      <MeasureNode
        onResult={this.onMeasure}>
        {children}
      </MeasureNode>
    );
  };

  public render(): MeasuringNode | React.ReactNode {
    const { themedStyle, content, visible, children } = this.props;
    const { child, popover } = this.getComponentStyle(themedStyle);

    if (visible) {
      this.popoverElement = this.renderPopoverElement(content, popover);
      const childElement: MeasuringElement = this.renderChildElement(children, child);

      return this.renderMeasuringElement(childElement, this.popoverElement);
    }

    return children;
  }
}

const styles = StyleSheet.create({
  popover: {
    position: 'absolute',
    opacity: 0,
  },
});
