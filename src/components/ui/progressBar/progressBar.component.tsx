/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  EvaSize,
  EvaStatus,
  LiteralUnion,
  Overwrite,
} from '@ui-kitten/components/devsupport';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@ui-kitten/components';
import { ProgressBarAnimation, ProgressBarAnimationConfig } from './animation';

type ProgressBarStyledProps = Overwrite<StyledComponentProps, {
  appearance?: LiteralUnion<'default'>;
}>;

interface ComponentStyles {
  track: ViewStyle;
  indicator: ViewStyle;
}

export interface ProgressBarProps extends ViewProps, ProgressBarStyledProps {
  progress?: number;
  animating?: boolean;
  animationConfig?: Partial<ProgressBarAnimationConfig>;
  status?: EvaStatus;
  size?: EvaSize;
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
 * @property {number} progress - Current state of a process.
 * Can be from 0 to 1.
 *
 * @property {string} size - Size of the component.
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Defaults to *small*.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *primary*.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {Partial<ProgressBarAnimationConfig>} animationConfig - Animation configuration.
 * Optional. Can define duration, easing function and etc.
 *
 * @overview-example ProgressBarSimpleUsage
 * Default ProgressBar animating is `true`.
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

  private animation: ProgressBarAnimation;

  constructor(props: ProgressBarProps) {
    super(props);

    this.animation = new ProgressBarAnimation(props.animationConfig);
  }

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
  };

  private clamp = (progress: number): number => {
    return progress > 1 ? 1 : (progress < 0 ? 0 : progress);
  };

  private onLayout = (event: LayoutChangeEvent): void => {
    this.props.onLayout?.(event);
    const trackWidth = event.nativeEvent.layout.width;

    this.setState({ trackWidth });
    this.animation.setBarWidth(trackWidth);
  };

  private getComponentStyle = (source: StyleType): ComponentStyles => {
    const {
      height,
      borderRadius,
      trackColor,
      indicatorColor,
    } = source;

    return {
      track: {
        height,
        borderRadius,
        backgroundColor: trackColor,
      },
      indicator: {
        height,
        borderRadius,
        backgroundColor: indicatorColor,
      },
    };
  };

  private renderIndicator = (
    style: ViewStyle, progress: number, animating: boolean,
  ): React.ReactElement<Animated.AnimatedProps<ViewStyle>> => {
    const indicatorStyles: Animated.AnimatedProps<ViewStyle>[] = [style];

    if (animating) {
      const animationStyles = this.animation.toProps();

      indicatorStyles.push(animationStyles);
    } else {
      const validProgress = this.clamp(progress);
      const width = `${validProgress * 100}%`;

      indicatorStyles.push({ width });
    }

    return (
      <Animated.View style={indicatorStyles} />
    );
  };

  public render(): React.ReactElement<ViewProps> {
    const { eva, style, progress, animating, ...viewProps } = this.props;
    const combinedStyles: StyleType = StyleSheet.flatten([eva.style, this.props.style]);
    const evaStyle = this.getComponentStyle(combinedStyles);

    return (
      <View
        {...viewProps}
        style={[evaStyle.track, styles.noOverflow, style]}
        onLayout={this.onLayout}
      >
        {this.renderIndicator(evaStyle.indicator, progress, animating)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noOverflow: {
    overflow: 'hidden',
  },
});


