/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Image,
  TouchableOpacityProps,
  ImageProps,
  ImageStyle,
  StyleSheet,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface AvatarProps {
  shape?: string;
  size?: string;
}

export type Props = AvatarProps & StyledComponentProps & ImageProps;

/**
 * The `Avatar` component is component for styling Image Component.
 *
 * @extends React.Component
 *
 * @property {string} shape - Determines the shape of the component.
 * Can be 'round' | 'rounded' | 'square'.
 * By default status is 'round'.
 *
 * @property {string} size - Determines the size of the component.
 * Can be 'tiny' | 'small' | 'medium' | 'large' | 'giant'.
 * By default size is 'medium'.
 *
 * @property ImageProps
 *
 * @property StyledComponentProps
 *
 * @example Avatar API example
 *
 * ```
 * import { Avatar } from '@kitten/ui';
 *
 * public render(): React.ReactNode {
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

export class Avatar extends React.Component<Props> {

  static styledComponentName: string = 'Avatar';

  private getComponentStyle = (source: StyleType): StyleType => {
    const { roundCoefficient, ...componentStyle } = source;

    const baseStyle: ImageStyle = {
      ...componentStyle,
      ...StyleSheet.flatten(this.props.style),
    };

    // @ts-ignore: rhs operator is restricted to be number
    const borderRadius: number = roundCoefficient * baseStyle.height;

    return { borderRadius, ...baseStyle };
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    return (
      <Image
        {...derivedProps}
        style={[componentStyle, styles.container]}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
