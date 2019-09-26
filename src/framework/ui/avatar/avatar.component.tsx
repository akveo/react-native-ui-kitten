/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Image,
  ImageProps,
  ImageStyle,
  StyleSheet,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface ComponentProps {
  shape?: string;
  size?: string;
}

export type AvatarProps = StyledComponentProps & ImageProps & ComponentProps;
export type AvatarElement = React.ReactElement<AvatarProps>;

/**
 * `Avatar` is a styled `Image` component.
 *
 * @extends React.Component
 *
 * @property {string} shape - Determines the shape of the component.
 * Can be `round`, `rounded` or `square`.
 * Default is `round`.
 *
 * @property {string} size - Determines the size of the component.
 * Can be `giant`, `large`, `medium`, `small`, or `tiny`.
 * Default is `medium`.
 *
 * @property ImageProps
 *
 * @property StyledComponentProps
 *
 * @overview-example Simple Usage
 *
 * ```
 * import React from 'react';
 * import { Avatar } from 'react-native-ui-kitten';
 *
 * export const AvatarShowcase = (props) => (
 *   <Avatar source={require('path-to-assets/local-image.png')} />
 * );
 * ```
 *
 * @overview-example Remote Images
 *
 * ```
 * import React from 'react';
 * import { Avatar } from 'react-native-ui-kitten';
 *
 * export const AvatarShowcase = (props) => (
 *   <Avatar source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' }} />
 * );
 * ```
 *
 * @overview-example Eva Styling
 *
 * ```
 * import React from 'react';
 * import { Avatar } from 'react-native-ui-kitten';
 *
 * export const AvatarShowcase = (props) => (
 *   <Avatar
 *     source={require('path-to-assets/local-image.png')}
 *     size='large'
 *     shape='rounded'
 *   />
 * );
 * ```
 *
 * @example Inline Styling
 *
 * ```
 * import React from 'react';
 * import { StyleSheet } from 'react-native';
 * import { Avatar } from 'react-native-ui-kitten';
 *
 * export const AvatarShowcase = (props) => (
 *   <Avatar
 *     style={styles.avatar}
 *     source={require('path-to-assets/local-image.png')}
 *   />
 * );
 *
 * const styles = StyleSheet.create({
 *   avatar: { width: 96, height: 96, borderRadius: 16 }
 * });
 * ```
 */
export class AvatarComponent extends React.Component<AvatarProps> {

  static styledComponentName: string = 'Avatar';

  private getComponentStyle = (source: StyleType): StyleType => {
    const { roundCoefficient, ...containerParameters } = source;

    // @ts-ignore: avoid checking `containerParameters`
    const baseStyle: ImageStyle = StyleSheet.flatten([
      containerParameters,
      this.props.style,
    ]);

    // @ts-ignore: rhs operator is restricted to be number
    const borderRadius: number = roundCoefficient * baseStyle.height;

    return {
      borderRadius,
      ...baseStyle,
    };
  };

  public render(): React.ReactElement<ImageProps> {
    const { themedStyle, ...restProps } = this.props;
    const componentStyle: ImageStyle = this.getComponentStyle(themedStyle);

    return (
      <Image
        {...restProps}
        style={componentStyle}
      />
    );
  }
}

export const Avatar = styled<AvatarProps>(AvatarComponent);
