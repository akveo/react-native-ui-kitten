import { IconProvider } from '@ui-cat/components';
import { SvgProps } from 'react-native-svg';
import { findIconByName } from 'react-native-eva-icons';
import React from 'react';

export const createIconsMap = (): Record<string, IconProvider<SvgProps>> => {
  return new Proxy({}, {
    get(_: unknown, name: string): IconProvider<SvgProps> {
      const icon = findIconByName(name);

      return {
        toReactElement: (props?: SvgProps) => {
          if (!icon) {
            return null;
          }

          return icon.toSvg({
            ...props,
            width: props?.width ?? 24,
            height: props?.height ?? 24,
          });
        },
      };
    },
  });
};
