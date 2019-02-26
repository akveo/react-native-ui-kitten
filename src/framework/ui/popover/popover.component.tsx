import React from 'react';
import {
  Animated,
  View,
  FlexStyle,
  ViewProps,
  StyleSheet,
} from 'react-native';
import {
  ModalService,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
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
  content: React.ReactElement<any>;
  children: React.ReactElement<any>;
  visible?: boolean;
}

type MeasuredNode = React.ReactElement<{ children: MeasuredElement[] }>;

interface State {
  layout: MeasureResult | undefined;
}

export type Props = PopoverProps & StyledComponentProps & PopoverViewProps & ViewProps;

const TAG_CHILD: number = 0;
const TAG_CONTENT: number = 1;
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

      // Retrieve `content` from popover children
      // and clone it with measured position
      const { [TAG_CONTENT]: popoverView } = container.props.children;
      const popover: React.ReactElement<ViewProps> = React.cloneElement(popoverView, { style });

      ModalService.showDialog(popover, true);
    }
  }

  private getComponentStyle = (source: StyleType): StyleType => {
    return {
      child: {},
      popover: {},
    };
  };

  private getPopoverFrame = (rawPlacement: string | Placement): Frame => {
    const { layout } = this.state;
    const { [TAG_CONTENT]: popoverFrame, [TAG_CHILD]: childFrame } = layout;

    const placement: Placement = Placements.parse(rawPlacement, PLACEMENT_DEFAULT);

    return placement.frame(popoverFrame, childFrame);
  };

  private onMeasure = (layout: MeasureResult) => {
    this.setState({ layout });
  };

  private createPopoverElement = (children: React.ReactElement<any>, style: StyleType): MeasuringElement => {
    const { placement, ...derivedProps } = this.props;

    const measuringProps: MeasuringElementProps = { tag: TAG_CONTENT };

    const popoverPlacement: Placement = Placements.parse(placement, PLACEMENT_DEFAULT);
    const indicatorPlacement: Placement = popoverPlacement.reverse();

    return (
      <View
        {...measuringProps}
        key={TAG_CONTENT}
        style={strictStyles.popover}>
        <PopoverView
          {...derivedProps}
          style={[style, derivedProps.style]}
          placement={indicatorPlacement.rawValue}>
          {children}
        </PopoverView>
      </View>
    );
  };

  private createChildElement = (source: React.ReactElement<any>, style: StyleType): MeasuringElement => {
    const measuringProps: MeasuringElementProps = { tag: TAG_CHILD };

    return (
      <View
        {...measuringProps}
        style={style}
        key={TAG_CHILD}>
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
    // Store `containerRef` for later usage.
    // This is needed to retrieve `content` and position it in future
    //
    // Notes: No way (?) to store `View` ref, so we need to use `Animated.View`

    return (
      <Animated.View ref={this.containerRef}>
        {children}
      </Animated.View>
    );
  };

  public render(): MeasuringNode | React.ReactNode {
    const { themedStyle, content, children } = this.props;

    const { child, popover } = this.getComponentStyle(themedStyle);
    const measuringChild: MeasuringElement = this.createChildElement(children, child);
    const measuringPopover: MeasuringElement = this.createPopoverElement(content, popover);

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
