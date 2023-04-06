import React from 'react';
import { CircularProgressBar } from '@ui-kitten/components';
import { useProgress } from '../../helpers/progress.hook';

export const CircularProgressBarSimpleUsageShowcase = (): React.ReactElement => {
  return (
    <CircularProgressBar progress={useProgress()} />
  );
};
