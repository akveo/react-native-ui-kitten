import { IconProvider } from '@ui-kitten/components';
import { SvgProps } from 'react-native-svg';
import { findIconByName } from 'react-native-eva-icons/icons';
import { EvaIcon } from './evaIcon.component';

/**
 * Cache for EvaIcon instances to avoid creating new objects on each access.
 * Icons are immutable so we can safely reuse them.
 */
const iconCache = new Map<string, EvaIcon>();

export const createIconsMap = (): { [key: string]: IconProvider<SvgProps> } => {
  return new Proxy({}, {
    get(target, name: string): IconProvider<SvgProps> {
      let icon = iconCache.get(name);
      if (!icon) {
        icon = new EvaIcon(findIconByName(name));
        iconCache.set(name, icon);
      }
      return icon;
    },
  });
};

/**
 * Clears the icon cache. Useful for testing or memory management.
 */
export const clearIconCache = (): void => {
  iconCache.clear();
};

/**
 * Returns the current size of the icon cache.
 */
export const getIconCacheSize = (): number => {
  return iconCache.size;
};
