/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useRef, useEffect, useImperativeHandle } from 'react';
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type WrappedElementProps = any;

export type IconProps<T = WrappedElementProps> = T & {
  /**
   * A name of icon registered in a specific pack.
   */
  name: string;
  /**
   * A name of icon pack registered in IconRegistry that is able to provide
   * an icon for a given name.
   */
  pack?: string;
  /**
   * Animation name. Can be `zoom`, `pulse`, `shake` or null.
   * Defaults to *zoom*.
   */
  animation?: keyof IconAnimationRegistry | null;
  /**
   * Animation config.
   */
  animationConfig?: AnimationConfig;
};

export type IconElement<T = WrappedElementProps> = React.ReactElement<IconProps<T>>;

export interface IconRef {
  startAnimation: (callback?: Animated.EndCallback) => void;
  stopAnimation: () => void;
}

/**
 * Animated Icon component.
 *
 * @extends React.FC
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
 * @property {string} animation - Animation name. Can be `zoom`, `pulse`, `shake` or null.
 * Defaults to *zoom*.
 *
 * @property {AnimationConfig} animationConfig - Animation config.
 *
 * @property {any} ...props - Accepts any props
 * depending on the component registered in IconRegistry for a given `name` property.
 * In case of using `@ui-kitten/eva-icons` package, Icon accepts any props for react-native-svg component.
 *
 * @overview-example IconSimpleUsage
 * Icon component provides a simple way to render image by requesting it from an icon set.
 * Icons come with [additional packages](guides/icon-packages),
 * that should be configured before using component.
 * We recommend using [Eva Icons](https://akveo.github.io/eva-icons),
 * to provide a full consistency with Eva Design System.
 *
 * @overview-example IconWithinComponents
 * All UI Kitten components that may contain inner views have support for Eva Icons.
 * When using icons as nested components, icon styles are handled by Eva.
 *
 * @overview-example IconAnimation
 * Icons have 3 types of animations: `zoom`, `pulse` and `shake`.
 *
 * @overview-example IconTheming
 * In particular cases, Icon should be styled in a different way.
 * In case of using Eva Icons it renders [svg images](https://github.com/react-native-community/react-native-svg).
 *
 * In most cases this is redundant, if [custom theme is configured](guides/branding).
 */
function IconComponent<T = WrappedElementProps>(
  props: IconProps<T>,
  ref: React.ForwardedRef<IconRef>,
): React.ReactElement<ViewProps> {
  const {
    name,
    pack,
    animation = 'zoom',
    animationConfig,
    ...iconProps
  } = props;

  // Create animation instance - initialize immediately (like constructor in class)
  const animationRef = useRef<IconAnimation | null>(
    getIconAnimation(animation, animationConfig)
  );

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      animationRef.current?.release();
    };
  }, []);

  // Expose methods via ref
  useImperativeHandle(ref, () => ({
    startAnimation: (callback?: Animated.EndCallback) => {
      animationRef.current?.start(callback);
    },
    stopAnimation: () => {
      animationRef.current?.stop();
    },
  }), []);

  // Get icon from registry
  const registeredIcon: RegisteredIcon<T> = IconRegistryService.getIcon(name, pack);
  const iconElement = registeredIcon.icon.toReactElement(iconProps as IconProps);

  if (!animationRef.current) {
    return iconElement;
  }

  return (
    <Animated.View {...animationRef.current.toProps()}>
      {iconElement}
    </Animated.View>
  );
}

export const Icon = React.forwardRef(IconComponent) as <T = WrappedElementProps>(
  props: IconProps<T> & { ref?: React.ForwardedRef<IconRef> }
) => React.ReactElement;

(Icon as React.FC).displayName = 'Icon';
