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
} from '../../theme';
import { AvatarAppearance, AvatarShape, AvatarSize } from '@eva-design/eva/mapping.types';

interface AvatarStyledProps extends StyledComponentProps {
  appearance?: AvatarAppearance;
}

export type AvatarProps<P = ImageProps> = AvatarStyledProps & P & {
  shape?: AvatarShape;
  size?: AvatarSize;
  /**
   * We use `any` here to prevent ts complains for most of the libraries that use
   * React.ComponentType & SomeType to describe static / instance methods for the components.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ImageComponent?: React.ComponentType<P> & any;
};

export type AvatarElement = React.ReactElement<AvatarProps>;

/**
 * An Image with additional styles provided by Eva.
 *
 * @extends React.Component
 *
 * @property {string} appearance - Appearance of the component.
 * The predefined one is `default`.
 * Can be extended with custom mapping feature.
 * Defaults to *default*.
 *
 * @property {string} shape - Shape of the component.
 * The predefined ones are `round`, `rounded` or `square`.
 * Can be extended with custom mapping feature.
 * Defaults to *round*.
 *
 * @property {string} size - Size of the component.
 * The predefined ones are `tiny`, `small`, `medium`, `large`, or `giant`.
 * Can be extended with custom mapping feature.
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
@styled('Avatar')
export class Avatar extends React.Component<AvatarProps> {

  static defaultProps: Partial<AvatarProps> = {
    ImageComponent: Image,
  };

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

  public render(): React.ReactElement {
    const { eva, ImageComponent, ...imageProps } = this.props;
    const evaStyle = this.getComponentStyle(eva.style);

    return (
      <ImageComponent
        {...imageProps}
        style={[styles.image, evaStyle]}
      />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    overflow: 'hidden',
  },
});
