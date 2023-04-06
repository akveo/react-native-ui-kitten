import React from 'react';
import { ProgressBar } from '@ui-kitten/components';
import { useProgress } from '../../helpers/progress.hook';

export const ProgressBarThemingShowcase = (): React.ReactElement => {
  return (
    <ProgressBar progress={useProgress()} />
  );
};
