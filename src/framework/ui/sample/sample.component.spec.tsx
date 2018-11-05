import * as React from 'react';
import { render } from 'react-native-testing-library';
import { Sample } from './sample.component';

it('Checks Sample component passes correct text props', async () => {
  const text = 'Hello, World!';
  const component = render(
    <Sample text={text}/>,
  );
  const textComponent = component.getByName('Text');
  expect(textComponent.props.children).toEqual(text);
});

it('Checks Sample component renders correctly', async () => {
  const component = render(
    <Sample/>,
  );
  const textComponent = component.getByName('Text');
  expect(textComponent).not.toBeNull();
});
