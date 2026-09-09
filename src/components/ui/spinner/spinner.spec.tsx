/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { render } from '@testing-library/react-native';
import {
  light,
  mapping,
} from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import {
  Spinner,
  SpinnerProps,
} from './spinner.component';

describe('@spinner: component checks', () => {

  const TestSpinner = (props?: SpinnerProps): React.ReactElement => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <Spinner {...props} />
    </ApplicationProvider>
  );

  describe('accessibility', () => {

    it('should expose the progressbar role', () => {
      const component = render(<TestSpinner />);

      expect(component.getByRole('progressbar')).toBeTruthy();
    });

    it('should report busy while animating', () => {
      const component = render(<TestSpinner animating={true} />);

      expect(component.getByRole('progressbar')).toBeBusy();
    });

    it('should not report busy when stopped', () => {
      const component = render(<TestSpinner animating={false} />);

      expect(component.getByRole('progressbar')).not.toBeBusy();
    });

    it('should let a consumer supply a label', () => {
      const component = render(<TestSpinner aria-label='Loading' />);

      expect(component.getByRole('progressbar')).toHaveAccessibleName('Loading');
    });
  });
});
