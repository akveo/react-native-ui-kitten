/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import {
  light,
  mapping,
} from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import {
  Layout,
  LayoutProps,
} from './layout.component';

describe('@layout: component checks', () => {

  const TestLayout = (props?: LayoutProps): React.ReactElement => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <Layout {...props} />
    </ApplicationProvider>
  );

  it('should render component passed to children', () => {
    const component = render(
      <TestLayout>
        <Text>
          I love Babel
        </Text>
      </TestLayout>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });
});
