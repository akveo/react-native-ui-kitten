import React from 'react';
import {
  Animated,
  StyleProp,
  ViewProps,
  ViewStyle,
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
 * Starting from UI Kitten 4.2, there is `@ui-kitten/eva-icons` module
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
 * @property {string} animation - Animation name. Available `zoom`, `pulse` and `shake`. Default is `zoom`.
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

  private getComponentStyle = (): StyleProp<ViewStyle> => {
    return this.animation.toProps();
  };

  public render(): React.ReactElement<ViewProps> {
    const { name, pack, ...restProps } = this.props;
    const registeredIcon: RegisteredIcon<T> = IconRegistryService.getIcon(name, pack);

    return (
      <Animated.View {...this.getComponentStyle()}>
        {registeredIcon.icon.toReactElement(restProps as T)}
      </Animated.View>
    );
  }
}
