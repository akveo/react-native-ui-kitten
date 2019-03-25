import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
} from 'react-native';
import {
  render,
  RenderAPI,
  shallow,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import {
  styled,
  ApplicationProvider,
  ApplicationProviderProps,
} from '@kitten/theme';
import {
  Avatar as AvatarComponent,
  Props as AvatarProps,
} from './avatar.component';
import { default as mapping } from '../common/mapping.json';
import { default as theme } from '../common/theme.json';

const Avatar = styled<AvatarProps>(AvatarComponent);

const Mock = (props?: AvatarProps): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <Avatar {...props} />
    </ApplicationProvider>
  );
};

const renderComponent = (props?: AvatarProps): RenderAPI => {
  return render(
    <Mock {...props} />,
  );
};

const iconSource: ImageSourcePropType = { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' };

describe('@avatar: matches snapshot', () => {

  describe('* appearance', () => {

    it('* default', () => {
      const component: RenderAPI = renderComponent({
        source: iconSource,
      });

      const { output } = shallow(component.getByType(AvatarComponent));

      expect(output).toMatchSnapshot();
    });

  });

});

describe('@avatar: component checks', () => {

  it('* round shape styled properly', () => {
    const component: RenderAPI = renderComponent({
      source: iconSource,
      shape: 'round',
    });

    const avatar: ReactTestInstance = component.getByType(Image);

    const { borderRadius, height } = StyleSheet.flatten(avatar.props.style);

    expect(borderRadius).toEqual(height / 2);
  });

  it('* rounded shape styled properly', () => {
    const component: RenderAPI = renderComponent({
      source: iconSource,
      shape: 'rounded',
    });

    const avatar: ReactTestInstance = component.getByType(Image);

    const { borderRadius, height } = StyleSheet.flatten(avatar.props.style);

    expect(borderRadius).toBeLessThan(height);
  });

  it('* square shape', () => {
    const component: RenderAPI = renderComponent({
      source: iconSource,
      shape: 'square',
    });

    const avatar: ReactTestInstance = component.getByType(Image);

    const { borderRadius } = StyleSheet.flatten(avatar.props.style);

    expect(borderRadius).toEqual(0);
  });

});
