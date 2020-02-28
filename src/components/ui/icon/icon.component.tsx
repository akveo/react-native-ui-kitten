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
 * `Icon` component with animation support. Allows to render any ReactElement registered for a specific name.
 * that renders any icon from eva-icons package in `svg` format.
 * It allows easily use icons in any component that has `icon` prop
 *
 * @extends React.Component
 *
 * @method {(callback?: Animated.EndCallback) => void} startAnimation - Toggle animation to start.
 *
 * @method {() => void} stopAnimation - Toggle animation to stop.
 *
 * @property {string} name - Name of registered icon.
 *
 * @property {string} pack - Name of icon pack that is able to provide an icon for specified name.
 *
 * @property {string} animation - Animation name. Available `zoom`, `pulse` and `shake`.
 * Default is `zoom`.
 *
 * @property {AnimationConfig} animationConfig - Determines animation config. Extends `Animated.AnimationConfig`.
 *
 * @overview-example IconSimpleUsage
 *
 * @overview-example IconWithinButton
 *
 * @overview-example IconWithinInput
 *
 * @overview-example IconExternalSource
 *
 * @overview-example IconAnimation
 *
 * @example IconAnimationInfinite
 *
 * @example IconInlineStyling
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
