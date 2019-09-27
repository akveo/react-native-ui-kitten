import React from 'react';
import {
  Animated,
  StyleProp,
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

interface ComponentProps {
  name: string;
  pack?: string;
  animation?: keyof IconAnimationRegistry;
  animationConfig?: AnimationConfig;
}

// This is basically needed to avoid generics in required props
// In general, could be SVGProps if using @ui-kitten/eva-icons or ImageProps if using Image.
type WrappedElementProps = any;
export type IconProps<T = WrappedElementProps> = ComponentProps & T;
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
 * @overview-example Register Icons
 *
 * ```
 * import React from 'react';
 * import { mapping, light as lightTheme } from '@eva-design/eva';
 * import { ApplicationProvider, IconRegistry, Layout, Text } from 'react-native-ui-kitten';
 * import { EvaIconsPack } from '@ui-kitten/eva-icons'; // <-- Make sure it is installed. npm i @ui-kitten/eva-icons
 *
 * const ApplicationContent = () => (
 *   <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
 *     <Text>Welcome to UI Kitten</Text>
 *   </Layout>
 * );
 *
 * const App = () => (
 *   <React.Fragment>
 *     <IconRegistry icons={EvaIconsPack}/>
 *     <ApplicationProvider mapping={mapping} theme={lightTheme}>
 *       <ApplicationContent/>
 *     </ApplicationProvider>
 *   </React.Fragment>
 * );
 *
 * export default App;
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
 * @overview-example Using with UI Kitten components
 *
 * ```
 * import React from 'react';
 * import { Input, Button, Icon } from 'react-native-ui-kitten';
 *
 * const FacebookIcon = (style) => (
 *   <Icon {...style} name='facebook' />
 * );
 *
 * const EyeIcon = (style) => (
 *   <Icon {...style} name='eye' />
 * );
 *
 * export const LoginButton = (props) => (
 *   <Button icon={FacebookIcon}>Login with Facebook</Button>
 * );
 *
 * export const PasswordInput = (props) => (
 *   <Input placeholder='Password' icon={EyeIcon} />
 * );
 * ```
 *
 * @overview-example Using Asset Source
 *
 * ```
 * import React from 'react';
 * import { Image } from 'react-native';
 * import { Button } from 'react-native-ui-kitten';
 *
 * const FacebookIcon = (style) => (
 *   <Image style={style} source={require('path-to-assets/local-image.png')} />
 * );
 *
 * export const LoginButton = (props) => (
 *   <Button icon={FacebookIcon}>Login with Facebook</Button>
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
 * @example Infinite Animation
 *
 * ```
 * import React from 'react';
 * import { Icon } from 'react-native-ui-kitten';
 *
 * const iconRef = React.createRef();
 *
 * export const StarIcon = (props) => (
 *   <Icon
 *     ref={iconRef}
 *     name='star'
 *     animation='shake'
 *     animationConfig={{ cycles: -1 }}
 *   />
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
 *
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
 *
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
 *
 * @example Inline Styling
 *
 * ```
 * // Visit react-native-svg documentation for more details
 * // https://github.com/react-native-community/react-native-svg#common-props
 *
 * import React from 'react';
 * import { Icon } from 'react-native-ui-kitten';
 *
 * export const StarIcon = (props) => (
 *   <Icon name='star' width={32} height={32} fill='#000'/>
 * );
 * ```
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
