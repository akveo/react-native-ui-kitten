import React from 'react';
import {
  View,
  FlexStyle,
  ViewProps,
  StyleSheet,
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

interface State {
  layout: MeasureResult | undefined;
}

export type Props = PopoverProps & ModalComponentCloseProps & StyledComponentProps & PopoverViewProps & ViewProps;

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

  private popoverElement: MeasuredElement = undefined;
  private modalIdentifier: string = '';

  public shouldComponentUpdate(nextProps: Props, nextState: State, nextContext: any): boolean {
    const isLayoutChanged: boolean = nextState.layout !== undefined;
    const isVisibilityChanged: boolean = this.props.visible !== nextProps.visible;

    return isLayoutChanged || isVisibilityChanged;
  }

  public componentDidUpdate(prevProps: Props, prevState: State): void {
    const { visible, placement, onRequestClose } = this.props;

    if (prevProps.visible !== visible) {
      if (visible) {
        const { origin: popoverPosition } = this.getPopoverFrame(placement);
        const style: FlexStyle = {
          left: popoverPosition.x,
          top: popoverPosition.y,
        };

        const popover: React.ReactElement<ModalComponentCloseProps> = React.cloneElement(this.popoverElement, {
          style: style,
          onRequestClose: onRequestClose,
        });

        this.modalIdentifier = ModalService.show(popover, true);
      } else {
        ModalService.hide(this.modalIdentifier);
      }
    }
  }

  public componentWillUnmount(): void {
    this.modalIdentifier = '';
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

  private renderPopoverElement = (children: React.ReactElement<any>, style: StyleType): MeasuringElement => {
    const { placement, ...derivedProps } = this.props;

    const measuringProps: MeasuringElementProps = { tag: TAG_CONTENT };

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

  private renderChildElement = (source: React.ReactElement<any>, style: StyleType): MeasuringElement => {
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

  private renderPlaceholderElement = (...children: MeasuringElement[]): MeasuringNode => {
    return (
      <MeasureNode
        style={styles.placeholder}
        onResult={this.onMeasure}>
        {children}
      </MeasureNode>
    );
  };

  public render(): MeasuringNode | React.ReactNode {
    const { themedStyle, content, children } = this.props;
    const { child, popover } = this.getComponentStyle(themedStyle);

    const measuringChild: MeasuringElement = this.renderChildElement(children, child);
    const measuringPopover: MeasuringElement = this.renderPopoverElement(content, popover);

    if (this.state.layout === undefined) {
      return this.renderPlaceholderElement(measuringChild, measuringPopover);
    }

    this.popoverElement = measuringPopover;

    return measuringChild;
  }
}

const styles = StyleSheet.create({
  popover: {
    position: 'absolute',
  },
  placeholder: {
    opacity: 0,
  },
});
