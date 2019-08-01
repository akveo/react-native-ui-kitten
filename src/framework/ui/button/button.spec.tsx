import React from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import {
  render,
  fireEvent,
  RenderAPI,
} from 'react-native-testing-library';
import {
  ApplicationProvider,
  ApplicationProviderProps,
  StyleType,
} from '@kitten/theme';
import {
  Button,
  ButtonProps,
} from './button.component';
import {
  mapping,
  theme,
} from '../support/tests';

const Mock = (props?: ButtonProps): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <Button {...props} />
    </ApplicationProvider>
  );
};

const renderComponent = (props?: ButtonProps): RenderAPI => {
  return render(
    <Mock {...props} />,
  );
};

const stringify = (object: any): string => JSON.stringify(object);

describe('@button: component checks', () => {

  it('* emits onPress (in/out)', () => {
    const onPress = jest.fn();
    const onPressIn = jest.fn();
    const onPressOut = jest.fn();

    const component: RenderAPI = renderComponent({
      onPress: onPress,
      onPressIn: onPressIn,
      onPressOut: onPressOut,
    });

    fireEvent.press(component.getByType(TouchableOpacity));
    fireEvent(component.getByType(TouchableOpacity), 'pressIn');
    fireEvent(component.getByType(TouchableOpacity), 'pressOut');

    expect(onPress).toBeCalled();
    expect(onPressIn).toBeCalled();
    expect(onPressOut).toBeCalled();
  });

  it('* component text checks', () => {
    const expectedText: React.ReactText = 'Button';
    const component: RenderAPI = renderComponent({
      children: expectedText,
    });
    const buttonText: React.ReactText = component.getByText(expectedText).props.children;

    expect(buttonText).toBe(expectedText);
  });

  it('* component button checks', () => {
    const expectedIconStyle: StyleType = {
      width: 16,
      height: 16,
      tintColor: '#FFFFFF',
      marginHorizontal: 10,
    };
    const iconSource: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };
    const icon = (style: StyleType): React.ReactElement<ImageProps> => {
      return (
        <Image
          source={iconSource}
          style={style}
        />
      );
    };
    const component: RenderAPI = renderComponent({
      icon: icon,
    });
    const { style: passedIconStyle, source } = component.getByType(Image).props;

    expect(stringify(passedIconStyle[0])).toBe(stringify(expectedIconStyle));
    expect(stringify(source)).toBe(stringify(iconSource));
  });

});
