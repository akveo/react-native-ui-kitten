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
  TouchableOpacityProps,
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

/**
 * The `Avatar` component is component for styling Image Component.
 *
 * @extends React.Component
 *
 * @property {string} shape - Determines the shape of the component.
 * Can be 'round' | 'rounded' | 'square'.
 * Default is 'round'.
 *
 * @property {string} size - Determines the size of the component.
 * Can be 'tiny' | 'small' | 'medium' | 'large' | 'giant'.
 * Default is 'medium'.
 *
 * @property ImageProps
 *
 * @property StyledComponentProps
 *
 * @example Avatar API and usage example
 *
 * ```
 * import {
 *   Avatar,
 *   AvatarProps,
 * } from '@kitten/ui';
 *
 * public render(): React.ReactElement<AvatarProps> {
 *   return (
 *     <Avatar
 *       style={styles.avatar}
 *       size='small'
 *       shape='rounded'
 *       source={{ uri: '...' }}
 *     />
 *   );
 * }
 * ```
 * */

export class AvatarComponent extends React.Component<AvatarProps> {

  static styledComponentName: string = 'Avatar';

  private getComponentStyle = (source: StyleType): StyleType => {
    const { roundCoefficient, ...containerParameters } = source;

    const baseStyle: ImageStyle = {
      ...containerParameters,
      ...styles.container,
      ...StyleSheet.flatten(this.props.style),
    };

    // @ts-ignore: rhs operator is restricted to be number
    const borderRadius: number = roundCoefficient * baseStyle.height;

    return {
      ...baseStyle,
      borderRadius,
    };
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    return (
      <Image
        {...derivedProps}
        style={componentStyle}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export const Avatar = styled<AvatarProps>(AvatarComponent);
