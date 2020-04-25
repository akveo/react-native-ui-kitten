import React from 'react';
import { Text } from 'react-native';
import { render } from 'react-native-testing-library';
import {
  light,
  mapping,
} from '@eva-design/eva';
import { FalsyText } from './falsyText.component';
import { ApplicationProvider } from '../../../theme';

it('should render nothing', function () {
  const component = render(<FalsyText/>);
  expect(component.toJSON()).toEqual(null);
});

it('should render provided function component', function () {
  const component = render(
    <FalsyText
      style={{ color: 'red' }}
      component={props => <Text {...props}>I love Babel</Text>}
    />,
  );

  const textComponent = component.getByText('I love Babel');

  expect(textComponent).toBeTruthy();
  expect(textComponent.props.style).toEqual({
    color: 'red',
  });
});

it('should render ui kitten text', function () {
  const component = render(
    <ApplicationProvider mapping={mapping} theme={light}>
      <FalsyText component='I love Babel'/>
    </ApplicationProvider>,
  );

  const textComponent = component.getByText('I love Babel');

  expect(textComponent).toBeTruthy();
});

it('should be able to render components with hooks', function () {
  const ComponentWithHooks = () => {
    const [text, setText ] = React.useState('');

    React.useEffect(() => {
      setText('I love Babel');
    }, []);

    return <Text>{text}</Text>;
  };

  const component = render(
    <FalsyText
      component={ComponentWithHooks}
    />,
  );

  const textComponent = component.getByText('I love Babel');

  expect(textComponent).toBeTruthy();
});
