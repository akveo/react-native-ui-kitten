import { IconProvider } from '@ui-cat/components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { findIconByName } from 'react-native-eva-icons';

type TintableStyle = {
  tintColor?: string;
};

export const createIconsMap = (): Record<string, IconProvider<SvgProps>> => {
  return new Proxy({}, {
    get(target: object, name: string | symbol): IconProvider<SvgProps> | undefined {
      if (typeof name !== 'string') {
        return Reflect.get(target, name) as IconProvider<SvgProps> | undefined;
      }

      const icon = findIconByName(name);

      return {
        toReactElement: (props?: SvgProps): React.ReactElement | null => {
          if (!icon) {
            return null;
          }

          const flattenedStyle = StyleSheet.flatten(props?.style || {}) as TintableStyle;
          const fillColor = typeof flattenedStyle?.tintColor === 'string' ? flattenedStyle.tintColor : undefined;

          return icon.toSvg({
            ...props,
            fill: props?.fill ?? fillColor,
            width: props?.width ?? 24,
            height: props?.height ?? 24,
          });
        },
      };
    },
  });
};
