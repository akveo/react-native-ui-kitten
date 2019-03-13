import React from 'react';
import {
  Image,
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
  StyleProvider,
  StyleProviderProps,
} from '@kitten/theme';
import {
  Avatar as AvatarComponent,
  Props as AvatarProps,
} from './avatar.component';
import * as config from './avatar.spec.config';

const Avatar = styled<AvatarComponent, AvatarProps>(AvatarComponent);

const Mock = (props?: AvatarProps): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
    <Avatar {...props} />
  </StyleProvider>
);

const renderComponent = (props?: AvatarProps): RenderAPI => {
  return render(
    <Mock {...props} />,
  );
};

describe('@avatar: matches snapshot', () => {

  describe('* appearance', () => {

    it('* default', () => {
      const component: RenderAPI = renderComponent({
        source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' },
      });

      expect(component).toMatchSnapshot();
    });

  });

});

describe('@avatar: component checks', () => {

  it('* round shape styled properly', () => {
    const component: RenderAPI = renderComponent({
      source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' },
      shape: 'round',
    });

    const avatar: ReactTestInstance = component.getByType(Image);

    const { borderRadius, height } = StyleSheet.flatten(avatar.props.style);

    expect(borderRadius).toEqual(height / 2);
  });

  it('* rounded shape styled properly', () => {
    const component: RenderAPI = renderComponent({
      source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' },
      shape: 'rounded',
    });

    const avatar: ReactTestInstance = component.getByType(Image);

    const { borderRadius, height } = StyleSheet.flatten(avatar.props.style);

    expect(borderRadius).toBeLessThan(height);
  });

  it('* square shape', () => {
    const component: RenderAPI = renderComponent({
      source: { uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' },
      shape: 'square',
    });

    const avatar: ReactTestInstance = component.getByType(Image);

    const { borderRadius } = StyleSheet.flatten(avatar.props.style);

    expect(borderRadius).toEqual(0);
  });

});
