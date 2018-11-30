import {
  withDesign,
  withTheme,
} from '@rk-kit/theme';
import { Sample } from './sample/sample.component';

const DesignedSample = withDesign(Sample);
const ThemedSample = withTheme(DesignedSample);

export {
  ThemedSample as Sample,
};
