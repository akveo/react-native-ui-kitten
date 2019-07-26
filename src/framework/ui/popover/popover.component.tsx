/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Dimensions,
  ScaledSize,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  ModalService,
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  PopoverView,
  PopoverViewProps,
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
  Offsets,
  PlacementOptions,
  PopoverPlacement,
  PopoverPlacements,
} from './type';
import { PopoverPlacementService } from './placement.service';
import { ModalPresentingBased } from '../support/typings';

type ContentElement = React.ReactElement<any>;
type ChildElement = React.ReactElement<any>;

interface ComponentProps extends PopoverViewProps, ModalPresentingBased {
  content: ContentElement;
  children: ChildElement;
  visible?: boolean;
}

export type PopoverProps = StyledComponentProps & ViewProps & ComponentProps;
export type PopoverElement = React.ReactElement<PopoverProps>;

const WINDOW: ScaledSize = Dimensions.get('window');
const WINDOW_BOUNDS: Frame = new Frame(0, 0, WINDOW.width, WINDOW.height);

const TAG_CHILD: number = 0;
const TAG_CONTENT: number = 1;
const PLACEMENT_DEFAULT: PopoverPlacement = PopoverPlacements.BOTTOM;

/**
 * Displays content in a modal when users focus on or tap an element.
 *
 * @extends React.Component
 *
 * @property {React.ReactElement<any>} content - Determines the content of the popover.
 *
 * @property {React.ReactElement<any>} children - Determines the element "above" which popover will be shown.
 *
 * @property {boolean} visible - Determines whether popover is visible or not.
 *
 * @property {string | PopoverPlacement} placement - Determines the placement of the popover.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Default is `bottom`.
 *
 * @property {number} indicatorOffset - Determines the offset of indicator (arrow).
 * @property {StyleProp<ViewStyle>} indicatorStyle - Determines style of indicator (arrow).
 *
 * @property ViewProps
 *
 * @property ModalPresentingBased
 *
 * @property StyledComponentProps
 *
 * @example Popover usage example
 *
 * ```
 * import React from 'react';
 * import {
 *  View,
 *  ViewProps,
 * } from 'react-native';
 * import {
 *   Popover,
 *   Button,
 *   Text,
 * } from 'react-native-ui-kitten';
 *
 * export class PopoverShowcase extends React.Component {
 *   public state: State = {
 *     popoverVisible: false,
 *   };
 *
 *   private togglePopover = () => {
 *     this.setState({ popoverVisible: !this.state.popoverVisible });
 *   };
 *
 *   private renderPopoverContentElement = (): React.ReactElement<ViewProps> => {
 *     return (
 *       <View style={styles.popoverContent}>
 *         <Text>Hi! This is popover.</Text>
 *       </View>
 *     );
 *   };
 *
 *   public render(): React.ReactNode {
 *     return (
 *       <Popover
 *         visible={this.state.popoverVisible}
 *         content={this.renderPopoverContentElement()}
 *         onBackdropPress={this.togglePopover}>
 *         <Button onPress={this.togglePopover}>
 *           TOGGLE POPOVER
 *         </Button>
 *       </Popover>
 *     );
 *   }
 * }
 * ```
 */

export class PopoverComponent extends React.Component<PopoverProps> {

  static styledComponentName: string = 'Popover';

  static defaultProps: Partial<PopoverProps> = {
    placement: PLACEMENT_DEFAULT.rawValue,
    visible: false,
    allowBackdrop: true,
    onBackdropPress: () => null,
  };

  private popoverId: string;
  private placementService: PopoverPlacementService = new PopoverPlacementService();
  private popoverPlacement: PopoverPlacement;

  public componentDidUpdate(prevProps: PopoverProps) {
    this.handleVisibility(prevProps);
  }

  private handleVisibility = (prevProps: PopoverProps): void => {
    if (prevProps.visible !== this.props.visible) {
      if (this.props.visible) {
        // Toggles re-measuring. This is needed for dynamic containers like ScrollView
        this.setState({ layout: undefined });
      } else {
        this.popoverId = ModalService.hide(this.popoverId);
      }
    } else if (prevProps.visible && this.props.visible) {
      this.updatePopoverElement();
    }
  };

  private updatePopoverElement = (): void => {
    const element: ContentElement = this.renderPopoverElement(this.props.content, this.popoverPlacement);

    const popoverElement: ContentElement = React.cloneElement(element, {
      style: [element.props.style, styles.popoverVisible],
    });
    this.popoverId && ModalService.update(this.popoverId, popoverElement);
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      indicatorWidth,
      indicatorHeight,
      indicatorBackgroundColor,
      ...containerParameters
    } = source;

    return {
      container: containerParameters,
      indicator: {
        width: indicatorWidth,
        height: indicatorHeight,
        backgroundColor: indicatorBackgroundColor,
      },
    };
  };

  private onMeasure = (layout: MeasureResult) => {
    if (this.props.visible) {
      const placementOptions: PlacementOptions = this.createPlacementOptions(layout);
      const popoverPlacement = this.placementService.find(this.popoverPlacement, placementOptions);

      this.popoverId = this.showPopoverModal(popoverPlacement, placementOptions);
    }
  };

  private createPlacement = (value: string | PopoverPlacement): PopoverPlacement => {
    return PopoverPlacements.parse(value, PLACEMENT_DEFAULT);
  };

  private createPlacementOptions = (layout: MeasureResult): PlacementOptions => {
    const { children } = this.props;

    return {
      source: layout[TAG_CONTENT],
      other: layout[TAG_CHILD],
      bounds: WINDOW_BOUNDS,
      offsets: Offsets.find(children.props.style),
    };
  };

  private showPopoverModal = (placement: PopoverPlacement, options: PlacementOptions): string => {
    const popoverFrame: Frame = placement.frame(options);
    const popoverElement: MeasuredElement = this.renderPopoverElement(this.props.content, placement);

    const positionStyle: ViewStyle = {
      left: popoverFrame.origin.x,
      top: popoverFrame.origin.y,
    };

    const positionedPopoverElement: React.ReactElement<ModalPresentingBased> = React.cloneElement(popoverElement, {
      style: [styles.popoverVisible, positionStyle],
    });

    return ModalService.show(positionedPopoverElement, {
      allowBackdrop: this.props.allowBackdrop,
      onBackdropPress: this.props.onBackdropPress,
    });
  };

  private renderPopoverElement = (children: ContentElement, placement: PopoverPlacement): ContentElement => {
    const { style: derivedStyle, themedStyle, indicatorStyle, ...derivedProps } = this.props;
    const { container, indicator } = this.getComponentStyle(themedStyle);

    const measuringProps: MeasuringElementProps = { tag: TAG_CONTENT };

    return (
      <View
        {...measuringProps}
        key={TAG_CONTENT}
        style={[styles.popover, styles.popoverInvisible]}>
        <PopoverView
          {...derivedProps}
          style={[container, derivedStyle]}
          indicatorStyle={[indicator, styles.indicator, indicatorStyle]}
          placement={placement.reverse().rawValue}>
          {children}
        </PopoverView>
      </View>
    );
  };

  private renderChildElement = (source: ChildElement): MeasuringElement => {
    const measuringProps: MeasuringElementProps = { tag: TAG_CHILD };

    return (
      <View
        {...measuringProps}
        key={TAG_CHILD}
        style={styles.child}>
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

  public render(): React.ReactNode {
    if (this.props.visible) {
      this.popoverPlacement = this.createPlacement(this.props.placement);
      const popoverElement: ContentElement = this.renderPopoverElement(this.props.content, this.popoverPlacement);
      const childElement: ChildElement = this.renderChildElement(this.props.children);

      return this.renderMeasuringElement(childElement, popoverElement);
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  popover: {
    position: 'absolute',
  },
  popoverInvisible: {
    opacity: 0,
  },
  popoverVisible: {
    opacity: 1,
  },
  indicator: {},
  child: {},
});

export const Popover = styled<PopoverProps>(PopoverComponent);
