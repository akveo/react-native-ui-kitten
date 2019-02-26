import React from 'react';
import {
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {
  render,
  fireEvent,
  shallow,
  RenderAPI,
} from 'react-native-testing-library';
import {
  styled,
  StyleProvider,
  StyleProviderProps,
} from '@kitten/theme';
import {
  Button as ButtonComponent,
  Props as ButtonProps,
} from './button.component';
import * as config from './button.spec.config';

const Button = styled<ButtonComponent, ButtonProps>(ButtonComponent);

const Mock = (props?: ButtonProps): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
    <Button {...props} />
  </StyleProvider>
);

const renderComponent = (props?: ButtonProps): RenderAPI => {
  return render(
    <Mock {...props} />,
  );
};

describe('@button: matches snapshot', () => {

  describe('* interaction', () => {

    it('* stateless', () => {
      const component: RenderAPI = renderComponent();
      const { output } = shallow(component.getByType(ButtonComponent));

      expect(output).toMatchSnapshot();
    });

  });

  describe('* appearance', () => {

    const icon: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };
    const text: React.ReactText = 'BUTTON';

    it('* empty', () => {
      const component: RenderAPI = renderComponent();
      const { output } = shallow(component.getByType(ButtonComponent));

      expect(output).toMatchSnapshot();
    });

    it('* icon', () => {
      const component: RenderAPI = renderComponent({ icon });
      const { output } = shallow(component.getByType(ButtonComponent));

      expect(output).toMatchSnapshot();
    });

    it('* text', () => {
      const component: RenderAPI = renderComponent({ children: text });
      const { output } = shallow(component.getByType(ButtonComponent));

      expect(output).toMatchSnapshot();
    });

    it('* icon and text', () => {
      const component: RenderAPI = renderComponent({
        icon,
        children: text,
      });
      const { output } = shallow(component.getByType(ButtonComponent));

      expect(output).toMatchSnapshot();
    });

  });

});

describe('@button: component checks', () => {

  it('* emits onPress', () => {
    const onPress = jest.fn();

    const component: RenderAPI = renderComponent({
      onPress: onPress,
    });

    fireEvent.press(component.getByType(TouchableOpacity));

    expect(onPress).toBeCalled();
  });

});
