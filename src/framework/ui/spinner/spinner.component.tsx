import React from 'react';
import {
  Animated,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  SpinnerAnimation,
  SpinnerAnimationStyle,
} from './animation';
// TODO: Frame, Point, Size types should be refactored to common types
import { Size } from '../popover/type';

interface ArcElementStyle {
  container: ViewStyle;
  arc: ViewStyle;
  overflow?: ViewStyle;
}

interface ComponentProps extends ViewProps {
  animating?: boolean;
  size?: string;
  status?: string;
}

export type SpinnerProps = StyledComponentProps & ComponentProps;
export type SpinnerElement = React.ReactElement<SpinnerProps>;

/**
 * Styled `Spinner` component. Designed to be used as `ActivityIndicator` component
 *
 * @extends React.Component
 *
 * @property {boolean} animating - Determines whether component is animating. Default is `true`.
 *
 * @property {string} status - Determines the status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Default is `primary`.
 *
 * @property {string} size - Determines the size of the component.
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Default is `medium`.
 *
 * @overview-example SpinnerSimpleUsage
 *
 * @overview-example SpinnerSizes
 *
 * @overview-example SpinnerStatuses
 *
 * @example SpinnerDataLoading
 */
export class SpinnerComponent extends React.PureComponent<SpinnerProps> {

  static styledComponentName: string = 'Spinner';

  static defaultProps: Partial<SpinnerProps> = {
    animating: true,
  };

  private animation: SpinnerAnimation = new SpinnerAnimation(this.containerSize.height);

  private get containerSize(): Size {
    const { width, height } = StyleSheet.flatten([this.props.themedStyle, this.props.style]);
    // @ts-ignore: width and height are restricted to be a number
    return new Size(width, height);
  }

  public componentDidMount(): void {
    if (this.props.animating) {
      this.startAnimation();
    }
  }

  public componentDidUpdate(prevProps: SpinnerProps): void {
    const animatingChanged: boolean = this.props.animating !== prevProps.animating;

    if (animatingChanged && this.props.animating) {
      this.startAnimation();
    }

    if (animatingChanged && !this.props.animating) {
      this.stopAnimation();
    }
  }

  public componentWillUnmount(): void {
    this.animation.release();
  }

  private startAnimation = (): void => {
    this.animation.start();
  };

  private stopAnimation = (): void => {
    this.animation.stop();
  };

  private getComponentStyle = (source: SpinnerAnimationStyle): StyleType => {
    const start: ArcElementStyle = {
      container: source.container,
      arc: source.start,
    };

    const end: ArcElementStyle = {
      container: source.container,
      arc: source.end,
      overflow: { top: this.containerSize.height / 2 },
    };

    return { start, end };
  };

  private renderArcElement = (style: ArcElementStyle, size: Size): React.ReactElement<ViewProps> => {
    const arcSize: Size = new Size(size.width, size.height / 2);

    return (
      <Animated.View style={[style.container, styles.absolute, size]}>
        <View style={[styles.noOverflow, style.overflow, arcSize]}>
          <Animated.View style={[style.arc, size]}>
            <View style={[styles.noOverflow, arcSize]}>
              <View style={[this.props.themedStyle, this.props.style]}/>
            </View>
          </Animated.View>
        </View>
      </Animated.View>
    );
  };

  public render(): React.ReactElement<ViewProps> {
    const containerSize: Size = this.containerSize;
    const { start, end } = this.getComponentStyle(this.animation.toProps());

    return (
      <View style={containerSize}>
        {this.renderArcElement(start, containerSize)}
        {this.renderArcElement(end, containerSize)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  absolute: StyleSheet.absoluteFillObject,
  noOverflow: {
    overflow: 'hidden',
  },
});

export const Spinner = styled<SpinnerProps>(SpinnerComponent);
