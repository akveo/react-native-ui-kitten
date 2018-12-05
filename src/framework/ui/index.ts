import {
  withThemeMapping,
  withTheme,
} from '@rk-kit/theme';
import { Sample } from './sample/sample.component';

const MappedSample = withThemeMapping(Sample);
const ThemedSample = withTheme(MappedSample);

export {
  ThemedSample as Sample,
};
