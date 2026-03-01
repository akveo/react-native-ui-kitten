import * as eva from '@ui-kitten/eva';

it('should be able to provide styles to all `styled` components in the library', () => {
  // Verify that the eva mapping contains styles for all expected components
  const styleKeys = Object.keys(eva.mapping.components);

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


