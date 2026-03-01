import { IconPack } from '@ui-kitten/components';
import { SvgProps } from 'react-native-svg';
import { createIconsMap, clearIconCache, getIconCacheSize } from './createIconsMap';

export const EvaIconsPack: IconPack<SvgProps> = {
  name: 'eva',
  icons: createIconsMap(),
};

export { clearIconCache, getIconCacheSize };

