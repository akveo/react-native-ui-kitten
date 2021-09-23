/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  Image,
  ImageProps,
  TouchableOpacity,
} from 'react-native';
import {
  fireEvent,
  render,
  RenderAPI,
  waitForElement,
} from 'react-native-testing-library';
import {
  light,
  mapping,
} from '@eva-design/eva';
import { Text } from '../text/text.component';
import { IndexPath } from '../../devsupport';
import { ApplicationProvider } from '../../theme';
import {
  Select,
  SelectProps,
} from './select.component';
import { SelectGroup } from './selectGroup.component';
import {
  SelectItem,
  SelectItemProps,
} from '../select/selectItem.component';
import { CheckBox } from '../checkbox/checkbox.component';

/*
 * Mock UIManager since Select relies on native measurements
 * Mock Animated for testing animation callbacks
 */
jest.mock('react-native', () => {
  const ActualReactNative = jest.requireActual('react-native');

  ActualReactNative.UIManager.measureInWindow = (node, callback) => {
    callback(0, 0, 42, 42);
  };

  ActualReactNative.Animated = {
    ...ActualReactNative.Animated,
    timing: () => ({
      start: (callback) => {
        callback();
      },
    }),
  };

  return ActualReactNative;
});

describe('@select-item: component checks', () => {

  const TestSelectItem = (props?: SelectItemProps) => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}>
      <SelectItem {...props} />
    </ApplicationProvider>
  );

  it('should render text passed to title prop', () => {
    const component = render(
      <TestSelectItem title='I love Babel'/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render component passed to title prop', () => {
    const component = render(
      <TestSelectItem title={props => <Text {...props}>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render components passed to accessoryLeft or accessoryRight props', () => {
    const AccessoryLeft = (props): React.ReactElement<ImageProps> => (
      <Image
        {...props}
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
      />
    );

    const AccessoryRight = (props): React.ReactElement<ImageProps> => (
      <Image
        {...props}
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' }}
      />
    );

    const component = render(
      <TestSelectItem
        accessoryLeft={AccessoryLeft}
        accessoryRight={AccessoryRight}
      />,
    );

    const [accessoryLeft, accessoryRight] = component.queryAllByType(Image);

    expect(accessoryLeft).toBeTruthy();
    expect(accessoryRight).toBeTruthy();

    expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
    expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
  });

  it('should call onPress', () => {
    const onPress = jest.fn();
    const component = render(
      <TestSelectItem onPress={onPress}/>,
    );

    fireEvent.press(component.queryByType(TouchableOpacity));
    expect(onPress).toHaveBeenCalled();
  });


  it('should call onPressIn', () => {
    const onPressIn = jest.fn();
    const component = render(
      <TestSelectItem onPressIn={onPressIn}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'pressIn');
    expect(onPressIn).toHaveBeenCalled();
  });

  it('should call onPressOut', () => {
    const onPressOut = jest.fn();
    const component = render(
      <TestSelectItem onPressOut={onPressOut}/>,
    );

    fireEvent(component.queryByType(TouchableOpacity), 'pressOut');
    expect(onPressOut).toHaveBeenCalled();
  });
});

describe('@select: component checks', () => {

  const TestSelect = React.forwardRef((props: Partial<SelectProps>, ref: React.Ref<Select>) => {
    const [selectedIndex, setSelectedIndex] = React.useState(props.selectedIndex);

    const onSelect = (index: IndexPath | IndexPath[]) => {
      setSelectedIndex(index);
      props.onSelect && props.onSelect(index);
    };

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={light}>
        <Select
          ref={ref}
          {...props}
          selectedIndex={selectedIndex}
          onSelect={onSelect}>
          <SelectItem title='Option 1'/>
          <SelectItem title='Option 2'/>
        </Select>
      </ApplicationProvider>
    );
  });

  /*
   * In this test:
   * [0] for modal control touchable
   * [1] for modal backdrop
   * ...rest for options
   */
  const touchables = {
    findControlTouchable: (api: RenderAPI) => api.queryAllByType(TouchableOpacity)[0],
    findBackdropTouchable: (api: RenderAPI) => api.queryAllByType(TouchableOpacity)[1],
    findOptionTouchable: (api: RenderAPI, index: number) => api.queryAllByType(TouchableOpacity)[index + 2],
  };

  it('should render placeholder', () => {
    const component = render(
      <TestSelect placeholder='I love Babel'/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render placeholder as function component', () => {
    const component = render(
      <TestSelect placeholder={props => <Text {...props}>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render placeholder as pure JSX component', () => {
    const component = render(
      <TestSelect placeholder={<Text>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render label', () => {
    const component = render(
      <TestSelect label='I love Babel'/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render label as function component', () => {
    const component = render(
      <TestSelect label={props => <Text {...props}>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render label as pure JSX component', () => {
    const component = render(
      <TestSelect label={<Text>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render caption', () => {
    const component = render(
      <TestSelect caption='I love Babel'/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render caption as function component', () => {
    const component = render(
      <TestSelect caption={props => <Text {...props}>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render caption as pure JSX component', () => {
    const component = render(
      <TestSelect caption={<Text>I love Babel</Text>}/>,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render function components passed to accessoryLeft or accessoryRight props', () => {
    const AccessoryLeft = (props): React.ReactElement<ImageProps> => (
      <Image
        {...props}
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
      />
    );

    const AccessoryRight = (props): React.ReactElement<ImageProps> => (
      <Image
        {...props}
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' }}
      />
    );

    const component = render(
      <TestSelect
        accessoryLeft={AccessoryLeft}
        accessoryRight={AccessoryRight}
      />,
    );

    const [accessoryLeft, accessoryRight] = component.queryAllByType(Image);

    expect(accessoryLeft).toBeTruthy();
    expect(accessoryRight).toBeTruthy();

    expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
    expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
  });

  it('should render JSX components passed to accessoryLeft or accessoryRight props', () => {
    const AccessoryLeft = (
      <Image
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/star.png' }}
      />
    );

    const AccessoryRight = (
      <Image
        source={{ uri: 'https://akveo.github.io/eva-icons/fill/png/128/home.png' }}
      />
    );

    const component = render(
      <TestSelect
        accessoryLeft={AccessoryLeft}
        accessoryRight={AccessoryRight}
      />,
    );

    const [accessoryLeft, accessoryRight] = component.queryAllByType(Image);

    expect(accessoryLeft).toBeTruthy();
    expect(accessoryRight).toBeTruthy();

    expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
    expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
  });

  it('should not render options when not focused', () => {
    const component = render(
      <TestSelect/>,
    );

    expect(component.queryByText('Option 1')).toBeFalsy();
    expect(component.queryByText('Option 2')).toBeFalsy();
  });

  it('should render options when becomes focused', async () => {
    const component = render(
      <TestSelect/>,
    );

    fireEvent.press(touchables.findControlTouchable(component));
    const firstOption = await waitForElement(() => component.queryByText('Option 1'));
    const secondOption = component.queryByText('Option 2');

    expect(firstOption).toBeTruthy();
    expect(secondOption).toBeTruthy();
  });

  it('should hide options when backdrop is pressed', async () => {
    const component = render(
      <TestSelect/>,
    );

    fireEvent.press(touchables.findControlTouchable(component));

    const backdrop = await waitForElement(() => touchables.findBackdropTouchable(component));
    fireEvent.press(backdrop);

    const firstOption = await waitForElement(() => touchables.findOptionTouchable(component, 0));
    const secondOption = component.queryByText('Option 2');

    expect(firstOption).toBeFalsy();
    expect(secondOption).toBeFalsy();
  });

  it('should call onSelect with single option index', async () => {
    const onSelect = jest.fn((index: IndexPath) => {
      expect(index.row).toEqual(1);
      expect(index.section).toBeFalsy();
    });

    const component = render(
      <TestSelect onSelect={onSelect}/>,
    );

    fireEvent.press(touchables.findControlTouchable(component));
    await waitForElement(() => null);

    fireEvent.press(touchables.findOptionTouchable(component, 1));
  });

  it('should call onSelect with array of indices', async () => {
    const onSelect = jest.fn((indices: IndexPath[]) => {
      const [firstIndex, secondIndex, ...restIndices] = indices;

      expect(firstIndex.row).toEqual(0);
      expect(firstIndex.section).toBeFalsy();
      expect(secondIndex.row).toEqual(1);
      expect(secondIndex.section).toBeFalsy();
      expect(restIndices.length).toEqual(0);
    });

    const component = render(
      <TestSelect
        multiSelect={true}
        selectedIndex={[new IndexPath(0)]}
        onSelect={onSelect}
      />,
    );

    fireEvent.press(touchables.findControlTouchable(component));
    const optionTouchable = await waitForElement(() => component.queryByText('Option 2'));

    fireEvent.press(optionTouchable);
  });

  it('should render checkboxes when multiselect', async () => {
    const component = render(
      <TestSelect multiSelect={true}/>,
    );

    fireEvent.press(touchables.findControlTouchable(component));
    const checkboxes = await waitForElement(() => component.queryAllByType(CheckBox));

    expect(checkboxes.length).toEqual(2);
  });

  it('should call onSelect when pressing checkbox', async () => {
    const onSelect = jest.fn((indices: IndexPath[]) => {
      expect(indices[0].row).toEqual(1);
    });

    const component = render(
      <TestSelect
        multiSelect={true}
        onSelect={onSelect}
      />,
    );

    fireEvent.press(touchables.findControlTouchable(component));
    const option2Checkbox = await waitForElement(() => component.queryAllByType(CheckBox)[1]);

    fireEvent.press(option2Checkbox);
  });

  it('should call onFocus', async () => {
    const onFocus = jest.fn();

    const component = render(
      <TestSelect onFocus={onFocus}/>,
    );

    fireEvent.press(touchables.findControlTouchable(component));
    await waitForElement(() => expect(onFocus).toHaveBeenCalled());
  });

  it('should call onBlur', async () => {
    const onBlur = jest.fn();
    const component = render(
      <TestSelect onBlur={onBlur}/>,
    );

    fireEvent.press(touchables.findControlTouchable(component));
    await waitForElement(() => null);

    fireEvent.press(touchables.findBackdropTouchable(component));
    await waitForElement(() => expect(onBlur).toHaveBeenCalled());
  });

  it('should call onPressIn', () => {
    const onPressIn = jest.fn();

    const component = render(
      <TestSelect onPressIn={onPressIn}/>,
    );

    fireEvent(touchables.findControlTouchable(component), 'pressIn');
    expect(onPressIn).toHaveBeenCalled();
  });

  it('should call onPressOut', () => {
    const onPressOut = jest.fn();

    const component = render(
      <TestSelect onPressOut={onPressOut}/>,
    );

    fireEvent(touchables.findControlTouchable(component), 'pressOut');
    expect(onPressOut).toHaveBeenCalled();
  });

  it('should be able to call focus with ref', async () => {
    const componentRef: React.RefObject<Select> = React.createRef();
    render(
      <TestSelect ref={componentRef}/>,
    );

    expect(componentRef.current.focus).toBeTruthy();
    componentRef.current.focus();
  });

  it('should be able to call blur with ref', async () => {
    const componentRef: React.RefObject<Select> = React.createRef();
    render(
      <TestSelect ref={componentRef}/>,
    );

    expect(componentRef.current.blur).toBeTruthy();
    componentRef.current.blur();
  });

  it('should be able to call isFocused with ref', () => {
    const componentRef: React.RefObject<Select> = React.createRef();
    render(
      <TestSelect ref={componentRef}/>,
    );

    expect(componentRef.current.isFocused).toBeTruthy();
    componentRef.current.isFocused();
  });

  it('should be able to call clear with ref', () => {
    const componentRef: React.RefObject<Select> = React.createRef();
    render(
      <TestSelect ref={componentRef}/>,
    );

    expect(componentRef.current.clear).toBeTruthy();
    componentRef.current.clear();
  });

  it('should be able to call show with ref', () => {
    const componentRef: React.RefObject<Select> = React.createRef();
    render(
      <TestSelect ref={componentRef}/>,
    );

    expect(componentRef.current.show).toBeTruthy();
    componentRef.current.show();
  });

  it('should be able to call hide with ref', async () => {
    const componentRef: React.RefObject<Select> = React.createRef();
    render(
      <TestSelect ref={componentRef}/>,
    );

    expect(componentRef.current.hide).toBeTruthy();
    componentRef.current.hide();
  });

});

describe('@select: component checks with groups', () => {

  const TestSelect = React.forwardRef((props: Partial<SelectProps>, ref: React.Ref<Select>) => {
    const [selectedIndex, setSelectedIndex] = React.useState(props.selectedIndex);

    const onSelect = (index: IndexPath | IndexPath[]) => {
      setSelectedIndex(index);
      props.onSelect && props.onSelect(index);
    };

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={light}>
        <Select
          ref={ref}
          {...props}
          selectedIndex={selectedIndex}
          onSelect={onSelect}>
          <SelectGroup title='Group 1'>
            <SelectItem title='Option 1.1'/>
            <SelectItem title='Option 1.2'/>
          </SelectGroup>
          <SelectGroup title='Group 2'>
            <SelectItem title='Option 2.1'/>
            <SelectItem title='Option 2.2'/>
          </SelectGroup>
        </Select>
      </ApplicationProvider>
    );
  });

  const touchables = {
    findControlTouchable: (api: RenderAPI) => api.queryAllByType(TouchableOpacity)[0],
  };

  it('should select single option in group', async () => {
    const onSelect = jest.fn((index: IndexPath) => {
      expect(index.row).toEqual(1);
      expect(index.section).toEqual(0);
    });

    const component = render(
      <TestSelect onSelect={onSelect}/>,
    );

    fireEvent.press(touchables.findControlTouchable(component));
    const option12Touchable = await waitForElement(() => component.getByText('Option 1.2'));

    fireEvent.press(option12Touchable);
  });

  it('should select options group', async () => {
    const onSelect = jest.fn((indices: IndexPath[]) => {
      const [firstIndex, secondIndex, ...restIndices] = indices;

      expect(firstIndex.row).toEqual(0);
      expect(firstIndex.section).toEqual(1);
      expect(secondIndex.row).toEqual(1);
      expect(secondIndex.section).toEqual(1);
      expect(restIndices.length).toEqual(0);
    });

    const component = render(
      <TestSelect
        multiSelect={true}
        onSelect={onSelect}
      />,
    );

    fireEvent.press(touchables.findControlTouchable(component));
    const group2Touchable = await waitForElement(() => component.getByText('Group 2'));

    fireEvent.press(group2Touchable);
  });
});


