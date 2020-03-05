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
import { Overwrite } from 'utility-types';
import {
  EvaSize,
  EvaStatus,
  Size,
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
  appearance?: 'default' | string;
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
 * Styled `Spinner` component. Designed to be used as `ActivityIndicator` component
 *
 * @extends React.Component
 *
 * @property {boolean} animating - Determines whether component is animating.
 * Default is `true`.
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

    return {
      start,
      end,
    };
  };

  private renderArcElement = (style: ArcElementStyle, size: Size): React.ReactElement<ViewProps> => {
    const arcSize: Size = new Size(size.width, size.height / 2);

    return (
      <Animated.View style={[StyleSheet.absoluteFill, style.container, size]}>
        <View style={[styles.noOverflow, style.overflow, arcSize]}>
          <Animated.View style={[style.arc, size]}>
            <View style={[styles.noOverflow, arcSize]}>
              <View style={[this.props.eva.style, this.props.style]}/>
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
      <View style={[containerSize, { position: 'relative' }]}>
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

export const Spinner = styled<SpinnerProps>(SpinnerComponent);
