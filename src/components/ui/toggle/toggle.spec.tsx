import React from 'react';
import {
  fireEvent,
  render,
  RenderAPI,
} from 'react-native-testing-library';
import { ReactTestInstance } from 'react-test-renderer';
import {
  ApplicationProvider,
  ApplicationProviderProps,
} from '@kitten/theme';
import {
  Toggle,
  ToggleComponent,
  ToggleProps,
} from './toggle.component';
import {
  mapping,
  theme,
} from '../support/tests';

jest.mock('react-native/Libraries/Animated/src/Animated', (): unknown => {
  const AnimatedModule = jest.requireActual('react-native/Libraries/Animated/src/Animated');
  return {
    ...AnimatedModule,
    timing: (value, config) => {
      return {
        start: (callback) => {
          value.setValue(config.toValue);
          callback && callback();
        },
      };
    },
  };
});

const Mock = (props?: ToggleProps): React.ReactElement<ApplicationProviderProps> => {
  return (
    <ApplicationProvider
      mapping={mapping}
      theme={theme}>
      <Toggle {...props} />
    </ApplicationProvider>
  );
};

const renderComponent = (props?: ToggleProps): RenderAPI => {
  return render(
    <Mock {...props}/>,
  );
};

describe('@toggle: component checks', () => {

  it('contains text', () => {
    const component: RenderAPI = renderComponent({
      text: 'Sample Text',
    });

    expect(component.getByText('Sample Text')).toBeTruthy();
  });

  it('emits onChange', () => {
    const onChange = jest.fn();

    const component: RenderAPI = renderComponent({ onChange });
    const { [0]: containerView } = component.getByType(ToggleComponent).children;

    fireEvent(containerView as ReactTestInstance, 'responderRelease');

    expect(onChange).toHaveBeenCalled();
  });

  it('checking of value direct', () => {
    let checked: boolean = false;
    const onChangeValue = (changed: boolean) => {
      checked = changed;
    };

    const component: RenderAPI = renderComponent({
      checked: checked,
      onChange: onChangeValue,
    });

    const { [0]: containerView } = component.getByType(ToggleComponent).children;

    fireEvent(containerView as ReactTestInstance, 'responderRelease');

    expect(checked).toBe(true);
  });

  it('checking of value reverse', () => {
    let checked: boolean = true;
    const onChangeValue = (changed: boolean) => {
      checked = changed;
    };

    const component: RenderAPI = renderComponent({
      checked: checked,
      onChange: onChangeValue,
    });

    const { [0]: containerView } = component.getByType(ToggleComponent).children;

    fireEvent(containerView as ReactTestInstance, 'responderRelease');

    expect(checked).toBe(false);
  });

});
