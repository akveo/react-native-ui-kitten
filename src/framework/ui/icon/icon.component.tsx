import React from 'react';
import {
  IconRegistryService,
  RegisteredIcon,
} from './service/iconRegistry.service';

interface ComponentProps {
  name: string;
  pack?: string;
}

export type IconProps<T = {}> = ComponentProps & T;

/**
 * Icon component. Allows to render any ReactElement registered for a specific name.
 * Starting from UI Kitten 4.2, there is @ui-kitten/eva-icons module
 * that renders any icon from eva-icons package in `svg` format.
 *
 * @extends React.Component
 *
 * @property {string} name - Name of registered icon
 * @property {string} pack - Name of icon pack that is able to provide an icon for specified name.
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

  public render(): React.ReactElement<T> {
    const { name, pack, ...restProps } = this.props;

    const registeredIcon: RegisteredIcon<T> = IconRegistryService.getIcon(name, pack);

    return registeredIcon.icon.toReactElement(restProps as T);
  }
}
