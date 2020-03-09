/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Animated,
  ViewProps,
} from 'react-native';
import {
  getIconAnimation,
  IconAnimation,
  IconAnimationRegistry,
} from './iconAnimation';
import {
  IconRegistryService,
  RegisteredIcon,
} from './service/iconRegistry.service';
import { AnimationConfig } from '../animation';

// This is basically needed to avoid generics in required props
// In general, could be SVGProps if using @ui-kitten/eva-icons or ImageProps if using Image.
type WrappedElementProps = any;

export type IconProps<T = WrappedElementProps> = T & {
  name: string;
  pack?: string;
  animation?: keyof IconAnimationRegistry;
  animationConfig?: AnimationConfig;
};

export type IconElement<T = WrappedElementProps> = React.ReactElement<IconProps<T>>;

/**
 * Animated Icon component.
 * Render any ReactElement registered within IconRegistry or SVG icons in case of using `@ui-kitten/eva-icons`.
 *
 * @extends React.Component
 *
 * @method {(callback?: Animated.EndCallback) => void} startAnimation - Toggle animation to start.
 *
 * @method {() => void} stopAnimation - Toggle animation to stop.
 *
 * @property {string} name - A name of icon registered in a specific pack.
 *
 * @property {string} pack - A name of icon pack registered in IconRegistry that is able to provide
 * an icon for a given name.
 *
 * @property {string} animation - Animation name. Can be `zoom`, `pulse` and `shake`.
 * Defaults to *zoom*.
 *
 * @property {AnimationConfig} animationConfig - Animation config.
 *
 * @property {any} ...props - Accepts any props
 * depending on the component registered in IconRegistry for a given `name` property.
 * In case of using `@ui-kitten/eva-icons` package, Icon accepts any props for react-native-svg component.
 *
 * @overview-example IconSimpleUsage
 *
 * @overview-example IconWithinComponents
 *
 * @overview-example IconAnimation
 */
export class Icon<T> extends React.Component<IconProps<T>> {

  static defaultProps: Partial<IconProps> = {
    animation: 'zoom',
  };

  private readonly animation: IconAnimation;

  constructor(props: IconProps<T>) {
    super(props);
    this.animation = getIconAnimation(props.animation, props.animationConfig);
  }

  public componentWillUnmount(): void {
    this.animation.release();
  }

  public startAnimation = (callback?: Animated.EndCallback): void => {
    this.animation.start(callback);
  };

  public stopAnimation = (): void => {
    this.animation.stop();
  };

  public render(): React.ReactElement<ViewProps> {
    const { name, pack, animation, ...iconProps } = this.props;
    const registeredIcon: RegisteredIcon<T> = IconRegistryService.getIcon(name, pack);

    return (
      <Animated.View {...this.animation.toProps()}>
        {registeredIcon.icon.toReactElement(iconProps as T)}
      </Animated.View>
    );
  }
}
