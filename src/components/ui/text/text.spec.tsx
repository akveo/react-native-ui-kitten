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
  Text,
  TextProps,
} from './text.component';

describe('@text: component checks', () => {

  const TestText = (props?: TextProps): React.ReactElement => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <Text {...props} />
    </ApplicationProvider>
  );

  it('should render text passed to children', () => {
    const component = render(
      <TestText>
        I love Babel
      </TestText>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render component passed to children', () => {
    const component = render(
      <TestText>
        <Text>
          I love Babel
        </Text>
      </TestText>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });
});
