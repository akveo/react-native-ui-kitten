import React from 'react';
import { render } from 'react-native-testing-library';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from './applicationProvider.component';

it('should be able to provide styles to all `styled` components in the library', () => {
  const component = render(
    <ApplicationProvider
      mapping={eva.mapping}
      theme={eva.light}
    />,
  );

  const { instance } = component.getByType(ApplicationProvider);
  const styleKeys = Object.keys(instance.state.styles);

  expect(styleKeys).toContain('Avatar');
  expect(styleKeys).toContain('BottomNavigation');
  expect(styleKeys).toContain('BottomNavigationTab');
  expect(styleKeys).toContain('Button');
  expect(styleKeys).toContain('ButtonGroup');
  expect(styleKeys).toContain('Card');
  expect(styleKeys).toContain('Calendar');
  expect(styleKeys).toContain('CheckBox');
  expect(styleKeys).toContain('Divider');
  expect(styleKeys).toContain('Drawer');
  expect(styleKeys).toContain('Input');
  expect(styleKeys).toContain('Layout');
  expect(styleKeys).toContain('List');
  expect(styleKeys).toContain('ListItem');
  expect(styleKeys).toContain('Menu');
  expect(styleKeys).toContain('OverflowMenu');
  expect(styleKeys).toContain('Select');
  expect(styleKeys).toContain('Spinner');
  expect(styleKeys).toContain('Tab');
  expect(styleKeys).toContain('TabBar');
  expect(styleKeys).toContain('Text');
  expect(styleKeys).toContain('Toggle');
  expect(styleKeys).toContain('Tooltip');
  expect(styleKeys).toContain('TopNavigation');
  expect(styleKeys).toContain('TopNavigationAction');
});


