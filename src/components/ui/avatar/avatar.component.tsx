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
import { Overwrite } from 'utility-types';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '../../theme';
import { EvaSize } from '@ui-kitten/components/devsupport';

type AvatarStyledProps = Overwrite<StyledComponentProps, {
  appearance?: 'default' | string;
}>;

export interface AvatarProps extends ImageProps, AvatarStyledProps {
  shape?: 'round' | 'rounded' | 'square' | string;
  size?: EvaSize;
}

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
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Default is `medium`.
 *
 * @property {ImageProps} ...ImageProps - Any props applied to Image component.
 *
 * @overview-example AvatarSimpleUsage
 *
 * @overview-example AvatarSize
 *
 * @overview-example AvatarShape
 *
 * @example AvatarRemoteImages
 *
 * @example AvatarInlineStyling
 */
export class AvatarComponent extends React.Component<AvatarProps> {

  static styledComponentName: string = 'Avatar';

  private getComponentStyle = (source: StyleType): ImageStyle => {
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
    const { eva, ...imageProps } = this.props;
    const evaStyle: ImageStyle = this.getComponentStyle(eva.style);

    return (
      <Image
        {...imageProps}
        style={evaStyle}
      />
    );
  }
}

export const Avatar = styled<AvatarProps>(AvatarComponent);
