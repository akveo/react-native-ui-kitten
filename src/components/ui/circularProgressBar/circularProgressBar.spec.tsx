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
  CircularProgressBar,
  CircularProgressBarProps,
} from './circularProgressBar.component';

describe('@circular-progress-bar: component checks', () => {

  const TestCircularProgressBar = (props?: CircularProgressBarProps): React.ReactElement => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <CircularProgressBar {...props} />
    </ApplicationProvider>
  );

  describe('accessibility', () => {

    it('should expose the progressbar role', () => {
      const component = render(<TestCircularProgressBar animating={false} />);

      expect(component.getByRole('progressbar')).toBeTruthy();
    });

    it('should report progress as a percentage value', () => {
      const component = render(
        <TestCircularProgressBar
          animating={false}
          progress={0.75}
        />,
      );

      expect(component.getByRole('progressbar')).toHaveAccessibilityValue({
        min: 0,
        max: 100,
        now: 75,
        text: '75%',
      });
    });

    it('should clamp progress to the zero to one range', () => {
      const component = render(
        <TestCircularProgressBar
          animating={false}
          progress={2}
        />,
      );

      expect(component.getByRole('progressbar')).toHaveAccessibilityValue({ now: 100 });
    });
  });
});
