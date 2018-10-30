import React from 'react';
import * as UITest from 'react-native-testing-library';
import {Sample} from './sample.component';

it('Checks Sample component renders correctly', async () => {
  const component = UITest.render(
    <Sample/>,
  );
  const textComponent = component.getByName('Text');
  expect(textComponent).not.toBeNull();
});

it('Checks Sample component passes correct text props', async () => {
  const text = 'Hello, World!';
  const component = UITest.render(
    <Sample text={text}/>,
  );
  const textComponent = component.getByName('Text');
  expect(textComponent.props.children).toEqual(text);
});
