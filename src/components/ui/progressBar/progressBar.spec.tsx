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
  ProgressBar,
  ProgressBarProps,
} from './progressBar.component';

describe('@progress-bar: component checks', () => {

  const TestProgressBar = (props?: ProgressBarProps): React.ReactElement => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <ProgressBar {...props} />
    </ApplicationProvider>
  );

  describe('accessibility', () => {

    it('should expose the progressbar role', () => {
      const component = render(<TestProgressBar animating={false} />);

      expect(component.getByRole('progressbar')).toBeTruthy();
    });

    it('should report progress as a percentage value', () => {
      const component = render(
        <TestProgressBar
          animating={false}
          progress={0.42}
        />,
      );

      expect(component.getByRole('progressbar')).toHaveAccessibilityValue({
        min: 0,
        max: 100,
        now: 42,
        text: '42%',
      });
    });

    it('should clamp progress above one', () => {
      const component = render(
        <TestProgressBar
          animating={false}
          progress={5}
        />,
      );

      expect(component.getByRole('progressbar')).toHaveAccessibilityValue({ now: 100 });
    });

    it('should clamp progress below zero', () => {
      const component = render(
        <TestProgressBar
          animating={false}
          progress={-5}
        />,
      );

      expect(component.getByRole('progressbar')).toHaveAccessibilityValue({ now: 0 });
    });

    it('should report busy instead of a value while indeterminate', () => {
      const component = render(
        <TestProgressBar
          animating={true}
          progress={0.5}
        />,
      );

      const progressbar = component.getByRole('progressbar');

      expect(progressbar).toBeBusy();
      expect(progressbar.props['aria-valuenow']).toBeUndefined();
    });

    it('should let a consumer supply a label', () => {
      const component = render(
        <TestProgressBar
          animating={false}
          aria-label='Upload'
        />,
      );

      expect(component.getByRole('progressbar')).toHaveAccessibleName('Upload');
    });
  });
});
