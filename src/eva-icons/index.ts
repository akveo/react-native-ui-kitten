import { IconPack } from '@ui-kitten/components';
import { SvgProps } from 'react-native-svg';
import { createIconsMap } from './createIconsMap';

export const EvaIconsPack: IconPack<SvgProps> = {
  name: 'eva',
  icons: createIconsMap(),
};

