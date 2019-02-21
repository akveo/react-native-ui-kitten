import React from 'react';
import {
  Animated,
  View,
  FlexStyle,
  ViewProps,
  StyleSheet,
} from 'react-native';
import { ModalService } from '@kitten/theme';
import {
  PopoverView,
  Props as PopoverViewProps,
} from './popoverView.component';
import {
  MeasureNode,
  MeasureResult,
  MeasuringElement,
  MeasuringNode,
  MeasuredElement,
  MeasuringElementProps,
} from './measure.component';
import {
  Frame,
  Placement,
  Placements,
} from './type';

interface PopoverProps {
  children: React.ReactElement<any>[];
  visible?: boolean;
}

type MeasuredNode = React.ReactElement<{children: MeasuredElement[]}>;

interface State {
  layout: MeasureResult | undefined;
}

export type Props = PopoverProps & PopoverViewProps & ViewProps;

const INDEX_CHILD: number = 0;
const INDEX_POPOVER: number = 1;
const PLACEMENT_DEFAULT: Placement = Placements.BOTTOM;

export class Popover extends React.Component<Props, State> {

  static defaultProps: Partial<Props> = {
    placement: PLACEMENT_DEFAULT.rawValue,
    visible: false,
  };

  public state: State = {
    layout: undefined,
  };

  private containerRef: React.RefObject<MeasuredNode> = React.createRef();

  public shouldComponentUpdate(nextProps: Props, nextState: State): boolean {
    const isLayoutChanged: boolean = nextState.layout !== undefined;
    const isVisibilityChanged: boolean = this.props.visible !== nextProps.visible;

    return isLayoutChanged || isVisibilityChanged;
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    const { visible, placement } = this.props;

    if (visible) {
      const { origin: popoverPosition } = this.getPopoverFrame(placement);
      const style: FlexStyle = {
        left: popoverPosition.x,
        top: popoverPosition.y,
      };

      const { current: container } = this.containerRef;
      const { [INDEX_POPOVER]: popoverView } = container.props.children;

      const popover: React.ReactElement<ViewProps> = React.cloneElement(popoverView, { style });

      ModalService.showDialog(React.cloneElement(popover, { style: style }), true);
    }
  }

  private getPopoverFrame = (rawPlacement: string): Frame => {
    const { layout } = this.state;
    const { [INDEX_POPOVER]: popoverFrame, [INDEX_CHILD]: childFrame } = layout;

    const placement: Placement = Placements.parse(rawPlacement, PLACEMENT_DEFAULT);

    return placement.frame(popoverFrame, childFrame);
  };

  private onMeasure = (layout: MeasureResult) => {
    this.setState({ layout });
  };

  private createPopoverElement = (children: React.ReactElement<any>): MeasuringElement => {
    const { placement, ...derivedProps } = this.props;

    const measuringProps: MeasuringElementProps = { tag: INDEX_POPOVER };

    const popoverPlacement: Placement = Placements.parse(placement, PLACEMENT_DEFAULT);
    const indicatorPlacement: Placement = popoverPlacement.reverse();

    return (
      <View
        {...measuringProps}
        key={INDEX_POPOVER}
        style={strictStyles.popover}>
        <PopoverView
          {...derivedProps}
          placement={indicatorPlacement.rawValue}>
          {children}
        </PopoverView>
      </View>
    );
  };

  private createChildElement = (source: React.ReactElement<any>): MeasuringElement => {
    const measuringProps: MeasuringElementProps = { tag: INDEX_CHILD };

    return (
      <View
        {...measuringProps}
        key={INDEX_CHILD}>
        {source}
      </View>
    );
  };

  private createPlaceholderElement = (...children: MeasuringElement[]): MeasuringNode => {
    return (
      <MeasureNode
        style={strictStyles.placeholder}
        onResult={this.onMeasure}>
        {children}
      </MeasureNode>
    );
  };

  private createComponentElement = (...children: MeasuredElement[]): MeasuredNode => {
    return (
      <Animated.View ref={this.containerRef}>
        {children}
      </Animated.View>
    );
  };

  public render(): MeasuringNode | React.ReactNode {
    const { [INDEX_CHILD]: child, [INDEX_POPOVER]: popoverChild } = this.props.children;

    const measuringChild: MeasuringElement = this.createChildElement(child);
    const measuringPopover: MeasuringElement = this.createPopoverElement(popoverChild);

    if (this.state.layout === undefined) {
      return this.createPlaceholderElement(measuringChild, measuringPopover);
    }

    return this.createComponentElement(measuringChild, measuringPopover);
  }
}

const strictStyles = StyleSheet.create({
  popover: {
    position: 'absolute',
    opacity: 0,
  },
  placeholder: {
    opacity: 0,
  },
});
