import { StyledComponent } from '@rk-kit/theme';
import { Sample, Props } from './sample/sample.component';

const StyledSample = StyledComponent<Sample, Props>(Sample);

export {
  StyledSample as Sample,
  Props as SampleProps,
};
