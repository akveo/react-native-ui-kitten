import React from 'react';
import {
  Spinner,
  SpinnerProps,
} from '@kitten/ui';

export const SpinnerShowcase = (props?: SpinnerProps): React.ReactElement<SpinnerProps> => {
  return (
    <Spinner {...props} />
  );
};
