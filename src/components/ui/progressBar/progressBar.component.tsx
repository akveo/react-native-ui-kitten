/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  EvaStatus,
  LiteralUnion,
  Overwrite,
} from '@ui-kitten/components/devsupport';
import {
  styled,
  StyledComponentProps,
} from '@ui-kitten/components';
import { ProgressBarAnimation } from './animation';

type ProgressBarStyledProps = Overwrite<StyledComponentProps, {
  appearance?: LiteralUnion<'default'>;
}>;

interface ExtendedViewStyle extends ViewStyle {
  /**
   * Color of the ProgressBar indicator.
   */
  color?: string;
}

interface ComponentStyles {
  track: ExtendedViewStyle;
  indicator: ViewStyle;
}

export interface ProgressBarProps extends ViewProps, ProgressBarStyledProps {
  progress?: number;
  animating?: boolean;
  status?: EvaStatus;
  style?: StyleProp<ExtendedViewStyle>;
}

export type ProgressBarElement = React.ReactElement<ProgressBarProps>;

interface State {
  trackWidth: number;
}

/**
 * Displays the length of a process.
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
 * @property {number} progress - Current state of a process.
 * Can be from 0 to 1.
 *
 * @overview-example ProgressBarSimpleUsage
 * Default ProgressBar status is `primary`.
 *
 * @overview-example ProgressBarStatuses
 * The track and indicator colours can be changed with `status` property
 * An extra status is `control`, which is designed to be used on high-contrast backgrounds.
 *
 * @overview-example ProgressBarTheming
 * Styling of ProgressBar is possible with [configuring a custom theme](guides/branding).
 *
 */

@styled('ProgressBar')
export class ProgressBar extends React.PureComponent<ProgressBarProps> {

  static defaultProps: Partial<ProgressBarProps> = {
    animating: true,
    progress: 0,
  };

  public state: State = {
    trackWidth: 0,
  };

  private animation = new ProgressBarAnimation();

  public componentDidMount(): void {
    if (this.props.animating) {
      this.startAnimation();
    }
  }

  public componentDidUpdate(prevProps: ProgressBarProps): void {
    const progressChanged: boolean = this.props.progress !== prevProps.progress;
    const animatingChanged: boolean = this.props.animating !== prevProps.animating;

    if (progressChanged && this.props.animating) {
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
    const validProgress = this.clamp(this.props.progress);
    this.animation.startDeterminate(validProgress);
  };

  private stopAnimation = (): void => {
    this.animation.stop();
  }

  private clamp = (progress: number): number => {
    return progress > 1 ? 1 : (progress < 0 ? 0 : progress);
  }

  private onLayout = (event: LayoutChangeEvent) => {
    this.props.onLayout && this.props.onLayout(event);

    this.setState({ trackWidth: event.nativeEvent.layout.width });
  }

  private getIndicatorWidth = (progress: number): string => {
    return `${progress * 100}%`;
  }

  private getComponentStyle = (style: ExtendedViewStyle): ComponentStyles => {
    const {
      height,
      borderRadius,
      color,
      ...trackStyles
    } = style;

    return {
      track: {
        height,
        borderRadius,
        ...trackStyles,
      },
      indicator: {
        height,
        borderRadius,
        backgroundColor: color,
      },
    };
  }

  private renderIndicator = (
    style: ViewStyle, progress: number, animating: boolean,
  ): React.ReactElement<Animated.AnimatedProps<ViewStyle>> => {
    const indicatorStyles: Animated.AnimatedProps<ViewStyle>[] = [ style ];

    if (animating) {
      const animationStyles = this.animation.toProps(this.state.trackWidth);

      indicatorStyles.push(animationStyles);
    } else {
      const validProgress = this.clamp(progress);
      const width = this.getIndicatorWidth(validProgress);

      indicatorStyles.push({ width });
    }

    return (
      <Animated.View style={indicatorStyles} />
    );
  }

  public render(): React.ReactElement<ViewProps> {
    const { eva, style, progress, animating, ...viewProps } = this.props;
    const combinedStyles: ExtendedViewStyle = StyleSheet.flatten([ eva.style, this.props.style ]);
    const computedStyles = this.getComponentStyle(combinedStyles);

    return (
      <View
        {...viewProps}
        style={[ styles.noOverflow, computedStyles.track ]}
        onLayout={this.onLayout}>
        {this.renderIndicator(computedStyles.indicator, progress, animating)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noOverflow: {
    overflow: 'hidden',
  },
});


