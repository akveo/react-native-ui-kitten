import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { light, mapping, dark } from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import { Button } from './button.component';
import { Text } from '../text/text.component';
import { Toggle } from '../toggle/toggle.component';
import { Layout } from '../layout/layout.component';

/*
 * Exported components are memoized: a parent re-render with referentially equal props must not
 * re-render them, while theme changes still reach them through the theme store subscription.
 */
describe('@memo: component checks', () => {

  const onPress = jest.fn();

  it('should export memoized components with display names', () => {
    expect((Button as unknown as { type: unknown }).type).toBeDefined();
    expect((Toggle as unknown as { type: unknown }).type).toBeDefined();
    expect(Button.displayName).toEqual('Button');
    expect(Toggle.displayName).toEqual('Toggle');
  });

  it('should skip re-render when the parent re-renders with equal props', () => {
    let accessoryRenders = 0;
    const Probe = (): null => {
      accessoryRenders++;
      return null;
    };
    const App = (): React.ReactElement => {
      const [tick, setTick] = React.useState(0);
      return (
        <ApplicationProvider mapping={mapping} theme={light}>
          <Text testID='tick' onPress={() => setTick(tick + 1)}>
            {`tick ${tick}`}
          </Text>
          <Button testID='button' onPress={onPress} accessoryLeft={Probe}>
            STATIC
          </Button>
        </ApplicationProvider>
      );
    };
    const component = render(<App />);
    const rendersAfterMount = accessoryRenders;

    fireEvent.press(component.getByTestId('tick'));
    fireEvent.press(component.getByTestId('tick'));

    expect(component.getByText('tick 2')).toBeTruthy();
    expect(accessoryRenders).toEqual(rendersAfterMount);
  });

  it('should re-render when a prop changes', () => {
    let accessoryRenders = 0;
    const Probe = (): null => {
      accessoryRenders++;
      return null;
    };
    const App = (): React.ReactElement => {
      const [tick, setTick] = React.useState(0);
      return (
        <ApplicationProvider mapping={mapping} theme={light}>
          <Text testID='tick' onPress={() => setTick(tick + 1)}>
            {`tick ${tick}`}
          </Text>
          <Button testID='button' onPress={onPress} accessoryLeft={Probe} disabled={tick % 2 === 1}>
            STATIC
          </Button>
        </ApplicationProvider>
      );
    };
    const component = render(<App />);
    const rendersAfterMount = accessoryRenders;

    fireEvent.press(component.getByTestId('tick'));

    expect(accessoryRenders).toBeGreaterThan(rendersAfterMount);
  });

  it('should still repaint on theme change', () => {
    // `color-basic-default` is the same in both Eva themes, so assert on values that differ:
    // Layout background (background-basic-color-1) and Text colour (text-basic-color).
    const App = (props: { theme: typeof light }): React.ReactElement => (
      <ApplicationProvider mapping={mapping} theme={props.theme}>
        <Layout testID='layout'>
          <Button appearance='filled' status='basic'>
            STATIC
          </Button>
          <Text testID='text'>
            STATIC TEXT
          </Text>
        </Layout>
      </ApplicationProvider>
    );
    const component = render(<App theme={light} />);
    const flatten = (style: unknown): Record<string, unknown> => Object.assign({}, ...([] as unknown[]).concat(style as unknown[]).flat(Infinity).filter(Boolean));
    const before = {
      layout: flatten(component.getByTestId('layout').props.style).backgroundColor,
      text: flatten(component.getByTestId('text').props.style).color,
    };

    component.rerender(<App theme={dark} />);
    const after = {
      layout: flatten(component.getByTestId('layout').props.style).backgroundColor,
      text: flatten(component.getByTestId('text').props.style).color,
    };

    expect(String(before.layout)).toMatch(/^#/);
    expect(after.layout).not.toEqual(before.layout);
    expect(after.text).not.toEqual(before.text);
  });
});
