import { withStyle } from '@rk-kit/theme';
import { Sample, Props } from './sample/sample.component';

export const StyledSample = withStyle<Sample, Props>(Sample);

export {
  StyledSample as Sample,
  Props as SampleProps,
};
