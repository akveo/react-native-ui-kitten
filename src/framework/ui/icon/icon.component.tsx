import React from 'react';
import {
  Animated,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  IconAnimation,
  IconAnimationRegistry,
  IconAnimations,
} from './iconAnimation';
import {
  IconRegistryService,
  RegisteredIcon,
} from './service/iconRegistry.service';

interface ComponentProps {
  name: string;
  pack?: string;
  animation?: keyof IconAnimationRegistry;
}

export type IconProps<T = {}> = ComponentProps & T;
export type IconElement<T> = React.ReactElement<T>;

/**
 * Icon component with animation support. Allows to render any ReactElement registered for a specific name.
 * Starting from UI Kitten 4.2, there is `@ui-kitten/eva-icons` module
 * that renders any icon from eva-icons package in `svg` format.
 *
 * @extends React.Component
 *
 * @method {(callback?: Animated.EndCallback) => void} startAnimation - Toggle animation to start.
 * @method {() => void} stopAnimation - Toggle animation to stop.
 * @property {string} name - Name of registered icon.
 * @property {string} pack - Name of icon pack that is able to provide an icon for specified name.
 * @property {string} animation - Animation name. Available `zoom`, `pulse` and `shake`. Default is `zoom`.
 *
 * @overview-example Register Icons
 *
 * ```
 * import React from 'react';
 * import { mapping, light as lightTheme } from '@eva-design/eva';
 * import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
 * import { EvaIconsPack } from '@ui-kitten/eva-icons'; // <-- Make sure it is installed. npm i @ui-kitten/eva-icons
 * import { Application } from './path-to/root.component';
 *
 * export default class App extends React.Component {
 *
 *   public render(): React.ReactNode {
 *     return (
 *       <ApplicationProvider
 *         mapping={mapping}
 *         theme={lightTheme}>
 *         <Application/>
 *         <IconRegistry icons={EvaIconsPack}/>
 *       </ApplicationProvider>
 *     );
 *   }
 * }
 * ```
 *
 * @overview-example Simple Usage
 *
 * ```
 * import React from 'react';
 * import { Icon } from 'react-native-ui-kitten';
 *
 * export const StarIcon = (props) => (
 *   <Icon name='star'/>
 * );
 * ```
 *
 * @overview-example Animation Usage
 *
 * ```
 * import React from 'react';
 * import { Icon } from 'react-native-ui-kitten';
 *
 * const iconRef = React.createRef();
 *
 * export const StarIcon = (props) => (
 *   <Icon ref={iconRef} name='star' animation='shake'/>
 * );
 *
 * iconRef.current.startAnimation();
 * ```
 *
 * @example Password Input
 *
 * ```
 * import React from 'react';
 * import { Input, Icon } from 'react-native-ui-kitten';
 *
 * export class PasswordInput extends React.Component {
 *  state = {
 *    passwordVisible: false,
 *  };
 *
 *  onPasswordIconPress = () => {
 *    const passwordVisible = !this.state.passwordVisible;
 *    this.setState({ passwordVisible });
 *  };
 *
 *  renderPasswordIcon = (style) => (
 *    <Icon
 *      name={this.state.passwordVisible ? 'eye' : 'eye-off'}
 *      {...style}
 *    />
 *  );
 *
 *  render() {
 *    return (
 *      <Input
 *        icon={this.renderPasswordIcon}
 *        onIconPress={this.onPasswordIconPress}
 *        secureTextEntry={!this.state.passwordVisible}
 *      />
 *    );
 *  }
 * }
 * ```
 *
 * @example Like Button
 *
 * ```
 * import React from 'react';
 * import { Button, Icon } from 'react-native-ui-kitten';
 *
 * export class LikeButton extends React.Component {
 *  state = {
 *    liked: false,
 *  };
 *
 *  onPress = () => {
 *    const liked = !this.state.liked;
 *    this.setState({ liked });
 *  };
 *
 *  renderHeartIcon = (style) => (
 *    <Icon
 *      name={this.state.liked ? 'heart' : 'heart-outline'}
 *      {...style}
 *    />
 *  );
 *
 *  render() {
 *    return (
 *      <Button
 *        icon={this.renderHeartIcon}
 *        onPress={this.onPress}
 *      />
 *    );
 *  }
 * }
 * ```
 */

export class Icon<T> extends React.Component<IconProps<T>> {

  static defaultProps: Partial<IconProps> = {
    animation: 'zoom',
  };

  private readonly animation: IconAnimation;

  constructor(props: IconProps<T>) {
    super(props);
    this.animation = IconAnimations[props.animation];
  }

  public componentWillUnmount() {
    this.animation.release();
  }

  public startAnimation = (callback?: Animated.EndCallback) => {
    this.animation.start(callback);
  };

  public stopAnimation = () => {
    this.animation.stop();
  };

  private getComponentStyle = (): StyleProp<ViewStyle> => {
    return this.animation.toProps();
  };

  public render(): React.ReactElement<T> {
    const { name, pack, ...restProps } = this.props;
    const registeredIcon: RegisteredIcon<T> = IconRegistryService.getIcon(name, pack);

    return (
      <Animated.View {...this.getComponentStyle()}>
        {registeredIcon.icon.toReactElement(restProps as T)}
      </Animated.View>
    );
  }
}
