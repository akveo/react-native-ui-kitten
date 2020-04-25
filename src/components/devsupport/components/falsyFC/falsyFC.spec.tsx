import React from 'react';
import { Text } from 'react-native';
import { render } from 'react-native-testing-library';
import { FalsyFC } from './falsyFC.component';

it('should render nothing', function () {
  const component = render(<FalsyFC/>);
  expect(component.toJSON()).toEqual(null);
});

it('should render provided function component', () => {
  const component = render(
    <FalsyFC style={{ color: 'red' }} component={props => <Text {...props}>I love Babel</Text>}/>,
  );

  const textComponent = component.getByText('I love Babel');

  expect(textComponent).toBeTruthy();
  expect(textComponent.props.style).toEqual({
    color: 'red',
  });
});

it('should render provided function component with hooks', () => {
  const HookComponent = (props) => {
    const state = React.useState(1);
    return (
      <Text {...props}>I love Babel {state}</Text>
    );
  };

  const component = render(
    <FalsyFC style={{ color: 'red' }} component={props => <HookComponent {...props}/>}/>,
  );

  const textComponent = component.getByText('I love Babel 1');
  expect(textComponent).toBeTruthy();
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
