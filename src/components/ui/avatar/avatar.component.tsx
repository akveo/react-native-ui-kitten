/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useMemo } from 'react';
import {
  Image,
  ImageProps,
  ImageStyle,
  StyleSheet,
} from 'react-native';
import {
  EvaSize,
  LiteralUnion,
} from '../../devsupport';
import { useStyled, StyleType } from '../../theme';

export type AvatarProps<P = ImageProps> = P & {
  /**
   * Appearance of the component.
   * Defaults to *default*.
   */
  appearance?: LiteralUnion<'default'>;
  /**
   * Shape of the component.
   * Can be `round`, `rounded` or `square`.
   * Defaults to *round*.
   */
  shape?: 'round' | 'rounded' | 'square' | string;
  /**
   * Size of the component.
   * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
   * Defaults to *medium*.
   */
  size?: EvaSize;
  /**
   * A component to render.
   * Defaults to Image.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ImageComponent?: React.ComponentType<P> & any;
};

export type AvatarElement = React.ReactElement<AvatarProps>;

/**
 * An Image with additional styles provided by Eva.
 *
 * @extends React.FC
 *
 * @property {string} shape - Shape of the component.
 * Can be `round`, `rounded` or `square`.
 * Defaults to *round*.
 *
 * @property {string} size - Size of the component.
 * Can be `tiny`, `small`, `medium`, `large`, or `giant`.
 * Defaults to *medium*.
 *
 * @property {React.ComponentType} ImageComponent - A component to render.
 * Defaults to Image.
 *
 * @property {P = ImageProps} ...P - Any props that may be accepted by the component passed to ImageComponent property.
 *
 * @overview-example AvatarSimpleUsage
 *
 * @overview-example AvatarSize
 * Avatar can be resized by passing `size` property.
 *
 * @overview-example AvatarShape
 * Also, it may have different shape configurable with `shape` property.
 *
 * @overview-example AvatarImageComponent
 * Avatar may have different root component to render images.
 * This might be helpful when needed to improve image loading with 3rd party image libraries.
 */
export const Avatar = <P extends ImageProps = ImageProps>(
  props: AvatarProps<P>,
): React.ReactElement => {
  const {
    appearance,
    shape,
    size,
    style,
    ImageComponent = Image,
    ...imageProps
  } = props;

  const { style: evaStyle } = useStyled('Avatar', {
    appearance,
    shape,
    size,
  });

  const componentStyle = useMemo(() => {
    const { roundCoefficient, ...containerParameters } = evaStyle as StyleType & { roundCoefficient?: number };

    // @ts-ignore: avoid checking `containerParameters`
    const baseStyle: ImageStyle = StyleSheet.flatten([
      containerParameters,
      style,
    ]);

    // @ts-ignore: rhs operator is restricted to be number
    const borderRadius: number = (roundCoefficient || 0) * (baseStyle.height || 0);

    return {
      borderRadius,
      ...baseStyle,
    };
  }, [evaStyle, style]);

  return (
    <ImageComponent
      {...imageProps as P}
      style={[styles.image, componentStyle]}
    />
  );
};

Avatar.displayName = 'Avatar';

const styles = StyleSheet.create({
  image: {
    overflow: 'hidden',
  },
});
