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
 * Styled Image component.
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
 * @example Simple usage example
 *
 * ```
 * import React from 'react';
 * import { Avatar, AvatarProps } from 'react-native-ui-kitten';
 *
 * export const AvatarShowcase = (props?: AvatarProps): React.ReactElement<AvatarProps> => {
 *   return (
 *     <Avatar source={{uri: 'https://path-to/awesome-image.png'}} />
 *   );
 * };
 * ```
 */

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
      borderRadius,
      ...baseStyle,
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
