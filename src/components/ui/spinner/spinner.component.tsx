/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Animated,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  EvaSize,
  EvaStatus,
  Size,
  Overwrite,
  LiteralUnion,
} from '../../devsupport';
import {
  styled,
  StyledComponentProps,
} from '../../theme';
import {
  SpinnerAnimation,
  SpinnerAnimationStyle,
} from './animation';

type SpinnerStyledProps = Overwrite<StyledComponentProps, {
  appearance?: LiteralUnion<'default'>;
}>;

export interface SpinnerProps extends ViewProps, SpinnerStyledProps {
  animating?: boolean;
  status?: EvaStatus;
  size?: EvaSize;
}

export type SpinnerElement = React.ReactElement<SpinnerProps>;

interface ArcElementStyle {
  container: ViewStyle;
  arc: ViewStyle;
  overflow?: ViewStyle;
}

/**
 * Displays a loading state of a page or a section.
 *
 * @extends React.Component
 *
 * @property {boolean} animating - Whether component is animating.
 * Default is *true*.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *primary*.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {string} size - Size of the component.
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Defaults to *medium*.
 *
 * @overview-example SpinnerSimpleUsage
 * Default Spinner status is `primary` and size is `medium`.
 *
 * @overview-example SpinnerSizes
 * To resize Spinner, a `size` property may be used.
 *
 * @overview-example SpinnerStatuses
 * A color can be changed with `status` property
 * An extra status is `control`, which is designed to be used on high-contrast backgrounds.
 *
 * @overview-example SpinnerTheming
 * Styling of Spinner is possible with [configuring a custom theme](guides/branding).
 *
 * @example SpinnerDataLoading
 */
@styled('Spinner')
export class Spinner extends React.PureComponent<SpinnerProps> {

  static defaultProps: Partial<SpinnerProps> = {
    animating: true,
  };

  private animation: SpinnerAnimation = new SpinnerAnimation(this.containerSize.height);

  private get containerSize(): Size {
    const { width, height } = StyleSheet.flatten([this.props.eva.style, this.props.style]);
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

  private getComponentStyle = (source: SpinnerAnimationStyle) => {
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
      <Animated.View style={[StyleSheet.absoluteFill, style.container, size]}>
        <View style={[styles.noOverflow, style.overflow, arcSize]}>
          <Animated.View style={[style.arc, size]}>
            <View style={[styles.noOverflow, arcSize]}>
              <View style={[this.props.eva.style, this.props.style]} />
            </View>
          </Animated.View>
        </View>
      </Animated.View>
    );
  };

  public render(): React.ReactElement<ViewProps> {
    const containerSize: Size = this.containerSize;
    const evaStyle = this.getComponentStyle(this.animation.toProps());

    return (
      <View
        testID={this.props.testID}
        style={containerSize}>
        {this.renderArcElement(evaStyle.start, containerSize)}
        {this.renderArcElement(evaStyle.end, containerSize)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noOverflow: {
    overflow: 'hidden',
  },
});
