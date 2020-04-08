import React from 'react';
import { Text } from 'react-native';
import { render } from 'react-native-testing-library';
import { FalsyFC } from './falsyFC.component';

it('should render nothing', function () {
  const component = render(<FalsyFC/>);
  expect(component.toJSON()).toEqual(null);
});

it('should render provided function component', function () {
  const component = render(
    <FalsyFC style={{ color: 'red' }} component={props => <Text {...props}>I love Babel</Text>}/>,
  );

  const textComponent = component.getByText('I love Babel');

  expect(textComponent).toBeTruthy();
  expect(textComponent.props.style).toEqual({
    color: 'red',
  });
});

it('should render fallback component', function () {
  const component = render(
    <FalsyFC
      component={null}
      fallback={<Text>I love Babel</Text>}
    />,
  );

  const textComponent = component.getByText('I love Babel');

  expect(textComponent).toBeTruthy();
});
