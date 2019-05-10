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
  OffsetRect,
  Offsets,
  PopoverPlacement,
  PopoverPlacements,
} from './type';

type ContentElement = React.ReactElement<any>;
type ChildElement = React.ReactElement<any>;

interface ComponentProps extends PopoverViewProps, ModalComponentCloseProps {
  content: ContentElement;
  children: ChildElement;
  visible?: boolean;
}

export type PopoverProps = StyledComponentProps & ViewProps & ComponentProps;

const TAG_CHILD: number = 0;
const TAG_CONTENT: number = 1;
const PLACEMENT_DEFAULT: PopoverPlacement = PopoverPlacements.BOTTOM;

class PopoverComponent extends React.Component<PopoverProps> {

  static styledComponentName: string = 'Popover';

  static defaultProps: Partial<PopoverProps> = {
    placement: PLACEMENT_DEFAULT.rawValue,
    visible: false,
  };

  private popoverElement: MeasuredElement;
  private popoverModalId: string = '';

  public componentDidUpdate(prevProps: PopoverProps) {
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

  private getPopoverFrame = (layout: MeasureResult, rawPlacement: string | PopoverPlacement): Frame => {
    const { children } = this.props;
    const { [TAG_CONTENT]: popoverFrame, [TAG_CHILD]: childFrame } = layout;

    const offsetRect: OffsetRect = Offsets.find(children.props.style);
    const placement: PopoverPlacement = PopoverPlacements.parse(rawPlacement, PLACEMENT_DEFAULT);

    return placement.frame(popoverFrame, childFrame, offsetRect);
  };

  private renderPopoverElement = (children: ContentElement, style: StyleProp<ViewStyle>): MeasuringElement => {
    const { placement, ...derivedProps } = this.props;

    const measuringProps: MeasuringElementProps = {
      tag: TAG_CONTENT,
    };

    const popoverPlacement: PopoverPlacement = PopoverPlacements.parse(placement, PLACEMENT_DEFAULT);
    const indicatorPlacement: PopoverPlacement = popoverPlacement.reverse();

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

  private renderChildElement = (source: ChildElement, style: StyleProp<ViewStyle>): MeasuringElement => {
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

export const Popover = styled<PopoverProps>(PopoverComponent);
