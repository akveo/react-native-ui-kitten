import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import {
  render,
  fireEvent,
} from 'react-native-testing-library';
import {
  styled,
  StyleProvider,
  StyleProviderProps,
} from '@kitten/theme';
import {
  TopNavigationBarAction as TopNavigationBarActionComponent,
  Props as TopNavigationBaActionProps,
} from './topNavigationBarAction.component';
import * as config from './topNavigationBarAction.spec.config';

const TopNavigationBarAction =
  styled<TopNavigationBarActionComponent, TopNavigationBaActionProps>(TopNavigationBarActionComponent);

const Mock = (props?: TopNavigationBaActionProps): React.ReactElement<StyleProviderProps> => (
  <StyleProvider mapping={config.mapping} theme={config.theme} styles={{}}>
    <TopNavigationBarAction {...props} />
  </StyleProvider>
);

const iconSourceUri: string = 'https://pngimage.net/wp-content/uploads/2018/05/back-icon-png-6.png';

describe('@top-navigation-bar-action', () => {

  it('* with icon uri', () => {
    const component = render(<Mock iconSource={{uri: iconSourceUri}}/>);
    expect(component).toMatchSnapshot();
  });

  it('* is last item check', () => {
    const component1 = render(<Mock iconSource={{uri: iconSourceUri}} isLastItem={true}/>);
    const component2 = render(<Mock iconSource={{uri: iconSourceUri}} isLastItem={false}/>);
    expect(component1).toMatchSnapshot();
    expect(component2).toMatchSnapshot();
  });

  it('* on press check', () => {
    const onPress = jest.fn();
    const component = render(<Mock iconSource={{uri: iconSourceUri}} onPress={onPress}/>);

    fireEvent.press(component.getByType(TouchableWithoutFeedback));
    expect(onPress).toHaveBeenCalled();
    expect(component).toMatchSnapshot();
  });

});
