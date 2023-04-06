import React from 'react';
import { CircularProgressBar } from '@ui-kitten/components';
import { useProgress } from '../../helpers/progress.hook';

export const CircularProgressBarThemingShowcase = (): React.ReactElement => {
  return (
    <CircularProgressBar progress={useProgress()} />
  );
};
