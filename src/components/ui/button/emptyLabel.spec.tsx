import React from 'react';
import { render } from '@testing-library/react-native';
import { light, mapping } from '@ui-kitten/eva';
import { ApplicationProvider } from '../../theme';
import { Button } from './button.component';
import { CheckBox } from '../checkbox/checkbox.component';
import { Radio } from '../radio/radio.component';
import { Toggle } from '../toggle/toggle.component';

/*
 * `'' && <Label />` evaluates to `''`, and React renders that empty string as a text node inside
 * the control's `View` ("Unexpected text node" on react-native-web, #1913). An empty label has to
 * render nothing, like `null` or `undefined`.
 */
describe('@controls: empty label', () => {

  type Json = ReturnType<ReturnType<typeof render>['toJSON']>;

  const collectStrings = (node: Json | Json[] | string | null): string[] => {
    if (node === null || node === undefined) {
      return [];
    }
    if (typeof node === 'string') {
      return [node];
    }
    if (Array.isArray(node)) {
      return node.flatMap(collectStrings);
    }
    return collectStrings((node.children ?? []) as Json[]);
  };

  const Provider = ({ children }: { children: React.ReactElement }): React.ReactElement => (
    <ApplicationProvider mapping={mapping} theme={light}>
      {children}
    </ApplicationProvider>
  );

  const cases: Array<[string, React.ReactElement]> = [
    ['Button', <Button key='button'>{''}</Button>],
    ['CheckBox', <CheckBox key='checkbox'>{''}</CheckBox>],
    ['Radio', <Radio key='radio'>{''}</Radio>],
    ['Toggle', <Toggle key='toggle'>{''}</Toggle>],
  ];

  it.each(cases)('%s should render no text node for an empty string label', (_name, element) => {
    const component = render(<Provider>{element}</Provider>);

    expect(collectStrings(component.toJSON())).toEqual([]);
  });

  it.each(cases)('%s should still render a non-empty label', (_name, element) => {
    const component = render(<Provider>{React.cloneElement(element, {}, 'Label')}</Provider>);

    expect(component.getByText('Label')).toBeTruthy();
  });

  it.each(cases)('%s should render a 0 label as text', (_name, element) => {
    const component = render(<Provider>{React.cloneElement(element, {}, 0)}</Provider>);

    expect(component.getByText('0')).toBeTruthy();
  });
});
