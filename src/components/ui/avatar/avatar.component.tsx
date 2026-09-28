/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Image,
  ImageErrorEventData,
  ImageProps,
  ImageStyle,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  EvaSize,
  EvaStatus,
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
   * Name shown as initials (the first letter of the first two words) when there is no `source`
   * or the image fails to load. Also the accessible name of the avatar.
   */
  name?: string;
  /**
   * Status of the initials frame: its background and text colours.
   * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
   * Defaults to *basic*.
   */
  status?: EvaStatus;
  /**
   * A component to render.
   * Defaults to Image.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ImageComponent?: React.ComponentType<P> & any;
};

export type AvatarElement = React.ReactElement<AvatarProps>;

/**
 * Initials shown in place of a missing or failed image: the first letter of the first two words.
 */
export const initialsOf = (name: string): string => {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join('');
};

const sourceKeyOf = (source: ImageProps['source']): string | number | undefined => {
  if (!source || typeof source === 'number') {
    return source as number | undefined;
  }
  const sources = Array.isArray(source) ? source : [source];
  return sources.map(item => item.uri ?? '').join('|');
};

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
 * @property {string} name - Name shown as initials (the first letter of the first two words)
 * when there is no `source` or the image fails to load. Also the accessible name of the avatar.
 *
 * @property {string} status - Status of the initials frame: its background and text colours.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *basic*.
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
 * @overview-example AvatarInitials
 * Without a `source`, or when the image fails to load, `name` renders as initials coloured by `status`.
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
    name,
    status,
    style,
    ImageComponent = Image,
    ...imageProps
  } = props;

  const { source, onError: onErrorProp } = imageProps as ImageProps;
  const [imageFailed, setImageFailed] = useState(false);

  // Retry once the image itself changes; an inline `source={{ uri }}` literal is a new object on
  // every render of the parent, so compare by uri rather than by identity.
  const sourceKey = sourceKeyOf(source);
  useEffect(() => {
    setImageFailed(false);
  }, [sourceKey]);

  const { style: evaStyle } = useStyled('Avatar', {
    appearance,
    shape,
    size,
    status,
  });

  const componentStyle = useMemo(() => {
    const {
      roundCoefficient,
      backgroundColor,
      textColor,
      textFontSize,
      textFontWeight,
      textFontFamily,
      ...containerParameters
    } = evaStyle as StyleType & { roundCoefficient?: number };

    // @ts-ignore: avoid checking `containerParameters`
    const baseStyle: ImageStyle = StyleSheet.flatten([
      containerParameters,
      style,
    ]);

    // @ts-ignore: rhs operator is restricted to be number
    const borderRadius: number = (roundCoefficient || 0) * (baseStyle.height || 0);

    return {
      container: {
        borderRadius,
        ...baseStyle,
      },
      initials: {
        backgroundColor,
      },
      text: {
        color: textColor,
        fontSize: textFontSize,
        fontWeight: textFontWeight,
        fontFamily: textFontFamily,
      },
    };
  }, [evaStyle, style]);

  const onError = useCallback((event: NativeSyntheticEvent<ImageErrorEventData>): void => {
    setImageFailed(true);
    onErrorProp?.(event);
  }, [onErrorProp]);

  const showInitials = Boolean(name) && (!source || imageFailed);

  if (showInitials) {
    return (
      <View
        accessible={true}
        role='img'
        aria-label={name}
        testID={imageProps.testID}
        style={[styles.image, styles.initials, componentStyle.initials, componentStyle.container]}
      >
        <Text
          numberOfLines={1}
          style={componentStyle.text}
        >
          {initialsOf(name)}
        </Text>
      </View>
    );
  }

  return (
    <ImageComponent
      aria-label={name}
      {...imageProps as P}
      onError={onError}
      style={[styles.image, componentStyle.container]}
    />
  );
};

Avatar.displayName = 'Avatar';

const styles = StyleSheet.create({
  image: {
    overflow: 'hidden',
  },
  initials: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
