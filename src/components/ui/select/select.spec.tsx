/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import { TouchableWeb } from '../../devsupport';
import {
  FlatList,
  Image,
  ImageProps,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  act,
  fireEvent,
  render,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';
import {
  light,
  mapping,
} from '@ui-kitten/eva';
import { Text } from '../text/text.component';
import { IndexPath } from '../../devsupport';
import { ApplicationProvider } from '../../theme';
import {
  Select,
  SelectProps,
  SelectRef,
} from './select.component';
import { SelectGroup } from './selectGroup.component';
import { ListRef } from '../list/list.component';
import {
  SelectItem,
  SelectItemProps,
} from '../select/selectItem.component';
import { CheckBox } from '../checkbox/checkbox.component';
import { Popover } from '../popover/popover.component';

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

  const TestSelectItem = (props?: SelectItemProps): React.ReactElement => (
    <ApplicationProvider
      mapping={mapping}
      theme={light}
    >
      <SelectItem {...props} />
    </ApplicationProvider>
  );

  it('should render text passed to title prop', () => {
    const component = render(
      <TestSelectItem title='I love Babel' />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should size the option text with the size prop', () => {
    const fontSizeOf = (size: SelectItemProps['size']): number => {
      const component = render(
        <TestSelectItem
          title='I love Babel'
          size={size}
        />,
      );
      return StyleSheet.flatten(component.getByText('I love Babel').props.style).fontSize;
    };

    expect(fontSizeOf('small')).toBeLessThan(fontSizeOf('medium'));
    expect(fontSizeOf('medium')).toEqual(fontSizeOf(undefined));
  });

  it('should render component passed to title prop', () => {
    const component = render(
      <TestSelectItem title={props => (
        <Text {...props}>
I love Babel
        </Text>
      )}
      />,
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

    const [accessoryLeft, accessoryRight] = component.UNSAFE_queryAllByType(Image);

    expect(accessoryLeft).toBeTruthy();
    expect(accessoryRight).toBeTruthy();

    expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
    expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
  });

  it('should call onPress', () => {
    const onPress = jest.fn();
    const component = render(
      <TestSelectItem onPress={onPress} />,
    );

    fireEvent.press(component.UNSAFE_queryByType(TouchableWeb));
    expect(onPress).toHaveBeenCalled();
  });


  it('should call onPressIn', () => {
    const onPressIn = jest.fn();
    const component = render(
      <TestSelectItem onPressIn={onPressIn} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableWeb), 'pressIn');
    expect(onPressIn).toHaveBeenCalled();
  });

  it('should call onPressOut', () => {
    const onPressOut = jest.fn();
    const component = render(
      <TestSelectItem onPressOut={onPressOut} />,
    );

    fireEvent(component.UNSAFE_queryByType(TouchableWeb), 'pressOut');
    expect(onPressOut).toHaveBeenCalled();
  });
});

describe('@select: component checks', () => {

  const TestSelect = React.forwardRef((props: Partial<SelectProps>, ref: React.Ref<SelectRef>) => {
    const [selectedIndex, setSelectedIndex] = React.useState(props.selectedIndex);

    const onSelect = (index: IndexPath | IndexPath[]): void => {
      setSelectedIndex(index);
      props.onSelect?.(index);
    };

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={light}
      >
        <Select
          ref={ref}
          {...props}
          selectedIndex={selectedIndex}
          onSelect={onSelect}
        >
          <SelectItem title='Option 1' />
          <SelectItem title='Option 2' />
        </Select>
      </ApplicationProvider>
    );
  });

  TestSelect.displayName = 'TestSelect';

  /*
   * In this test:
   * [0] for modal control touchable
   * [1] for modal backdrop
   * ...rest for options
   */
  const touchables = {
    findControlTouchable: (api: RenderAPI) => api.UNSAFE_queryAllByType(TouchableWeb)[0],
    findBackdropTouchable: (api: RenderAPI) => api.UNSAFE_queryAllByType(TouchableWeb)[1],
    findOptionTouchable: (api: RenderAPI, index: number) => api.UNSAFE_queryAllByType(TouchableWeb)[index + 2],
  };

  it('should forward its size to the options', async () => {
    const component = render(
      <TestSelect size='small' />,
    );

    fireEvent.press(touchables.findControlTouchable(component));
    const firstOption = await waitFor(() => component.queryByText('Option 1'));

    expect(StyleSheet.flatten(firstOption.props.style).fontSize).toBeLessThan(15);
  });

  it('should space the caption with the mapping captionMarginTop', () => {
    const component = render(<TestSelect caption='I love Babel' />);

    const { marginTop } = StyleSheet.flatten(component.getByText('I love Babel').props.style);
    expect(marginTop).toEqual(mapping.components.Select.appearances.default.mapping.captionMarginTop);
    expect(marginTop).toBeGreaterThan(0);
  });

  it('should render placeholder', () => {
    const component = render(
      <TestSelect placeholder='I love Babel' />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render placeholder as function component', () => {
    const component = render(
      <TestSelect placeholder={props => (
        <Text {...props}>
I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render placeholder as pure JSX component', () => {
    const component = render(
      <TestSelect placeholder={(
        <Text>
I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render label', () => {
    const component = render(
      <TestSelect label='I love Babel' />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render label as function component', () => {
    const component = render(
      <TestSelect label={props => (
        <Text {...props}>
I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render label as pure JSX component', () => {
    const component = render(
      <TestSelect label={(
        <Text>
I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render caption', () => {
    const component = render(
      <TestSelect caption='I love Babel' />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render caption as function component', () => {
    const component = render(
      <TestSelect caption={props => (
        <Text {...props}>
I love Babel
        </Text>
      )}
      />,
    );

    expect(component.queryByText('I love Babel')).toBeTruthy();
  });

  it('should render caption as pure JSX component', () => {
    const component = render(
      <TestSelect caption={(
        <Text>
I love Babel
        </Text>
      )}
      />,
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

    const [accessoryLeft, accessoryRight] = component.UNSAFE_queryAllByType(Image);

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

    const [accessoryLeft, accessoryRight] = component.UNSAFE_queryAllByType(Image);

    expect(accessoryLeft).toBeTruthy();
    expect(accessoryRight).toBeTruthy();

    expect(accessoryLeft.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/star.png');
    expect(accessoryRight.props.source.uri).toEqual('https://akveo.github.io/eva-icons/fill/png/128/home.png');
  });

  it('should not render options when not focused', () => {
    const component = render(
      <TestSelect />,
    );

    expect(component.queryByText('Option 1')).toBeFalsy();
    expect(component.queryByText('Option 2')).toBeFalsy();
  });

  it('should expose the options list through listRef and forward listProps', async () => {
    const listRef = React.createRef<ListRef>();
    const getItemLayout = (_data, index: number): { length: number; offset: number; index: number } => (
      { length: 40, offset: 40 * index, index }
    );
    const component = render(
      <TestSelect
        listRef={listRef}
        listProps={{ getItemLayout, initialNumToRender: 1, style: { maxHeight: 120 } }}
      />,
    );

    expect(listRef.current).toBeNull();

    fireEvent.press(touchables.findControlTouchable(component));
    await waitFor(() => component.queryByText('Option 1'));

    const list = component.UNSAFE_getByType(FlatList);
    expect(list.props.getItemLayout).toBe(getItemLayout);
    expect(list.props.initialNumToRender).toEqual(1);
    expect(StyleSheet.flatten(list.props.style)).toMatchObject({ maxHeight: 120 });
    expect(list.props.data.length).toEqual(2);
    expect(typeof listRef.current.scrollToIndex).toBe('function');
  });

  describe('scroll to the selected option on open', () => {
    const ManyOptions = React.forwardRef((props: Partial<SelectProps>, ref: React.Ref<SelectRef>) => (
      <ApplicationProvider
        mapping={mapping}
        theme={light}
      >
        <Select
          ref={ref}
          {...props}
        >
          {Array.from({ length: 30 }, (_, index) => (
            <SelectItem
              key={index}
              title={`Option ${index + 1}`}
            />
          ))}
        </Select>
      </ApplicationProvider>
    ));
    ManyOptions.displayName = 'ManyOptions';

    let scrollToIndex: jest.SpyInstance;

    beforeEach(() => {
      scrollToIndex = jest.spyOn(FlatList.prototype, 'scrollToIndex').mockImplementation(() => undefined);
    });

    afterEach(() => {
      scrollToIndex.mockRestore();
    });

    const openAndLayout = async (component: RenderAPI): Promise<void> => {
      fireEvent.press(touchables.findControlTouchable(component));
      const list = await waitFor(() => component.UNSAFE_getByType(FlatList));
      fireEvent(list, 'contentSizeChange', 300, 1200);
    };

    it('should scroll the list to the selected option', async () => {
      const component = render(
        <ManyOptions selectedIndex={new IndexPath(24)} />,
      );

      await openAndLayout(component);

      expect(scrollToIndex).toHaveBeenCalledWith(expect.objectContaining({ index: 24, animated: false }));
    });

    it('should scroll to the topmost selected option of a multi select', async () => {
      const component = render(
        <ManyOptions
          multiSelect={true}
          selectedIndex={[new IndexPath(20), new IndexPath(12)]}
        />,
      );

      await openAndLayout(component);

      expect(scrollToIndex).toHaveBeenCalledWith(expect.objectContaining({ index: 12 }));
    });

    it('should stop retrying a failed scroll after a few rounds', async () => {
      jest.useFakeTimers();
      const scrollToOffset = jest.spyOn(FlatList.prototype, 'scrollToOffset').mockImplementation(() => undefined);
      const component = render(<ManyOptions selectedIndex={new IndexPath(24)} />);
      await openAndLayout(component);
      const list = component.UNSAFE_getByType(FlatList);
      const failure = { index: 24, highestMeasuredFrameIndex: 9, averageItemLength: 40 };

      // Every attempt fails: the first try plus five retries, then nothing more.
      for (let attempt = 0; attempt < 10; attempt++) {
        list.props.onScrollToIndexFailed(failure);
        act(() => jest.advanceTimersByTime(60));
      }

      expect(scrollToIndex).toHaveBeenCalledTimes(6);
      scrollToOffset.mockRestore();
      jest.useRealTimers();
    });

    it('should drop a pending retry when the list closes', async () => {
      jest.useFakeTimers();
      const scrollToOffset = jest.spyOn(FlatList.prototype, 'scrollToOffset').mockImplementation(() => undefined);
      const component = render(<ManyOptions selectedIndex={new IndexPath(24)} />);
      await openAndLayout(component);

      component.UNSAFE_getByType(FlatList).props.onScrollToIndexFailed({ index: 24, highestMeasuredFrameIndex: 9, averageItemLength: 40 });
      act(() => component.getByTestId('@backdrop').props.onResponderRelease({ nativeEvent: {} }));
      act(() => jest.advanceTimersByTime(200));

      expect(scrollToIndex).toHaveBeenCalledTimes(1);
      scrollToOffset.mockRestore();
      jest.useRealTimers();
    });

    it('should not scroll without a selection or when the first option is selected', async () => {
      const component = render(
        <ManyOptions />,
      );
      await openAndLayout(component);

      const first = render(
        <ManyOptions selectedIndex={new IndexPath(0)} />,
      );
      await openAndLayout(first);

      expect(scrollToIndex).not.toHaveBeenCalled();
    });

    it('should leave scrolling to a consumer initialScrollIndex', async () => {
      const component = render(
        <ManyOptions
          selectedIndex={new IndexPath(24)}
          listProps={{ initialScrollIndex: 3, getItemLayout: (_data, index) => ({ length: 40, offset: 40 * index, index }) }}
        />,
      );

      await openAndLayout(component);

      expect(scrollToIndex).not.toHaveBeenCalled();
    });

    it('should scroll to the row of the group that holds the selected option', async () => {
      const component = render(
        <ApplicationProvider
          mapping={mapping}
          theme={light}
        >
          <Select selectedIndex={new IndexPath(1, 2)}>
            <SelectItem title='Option 1' />
            <SelectItem title='Option 2' />
            <SelectGroup title='Group 3'>
              <SelectItem title='Option 3.1' />
              <SelectItem title='Option 3.2' />
            </SelectGroup>
            <SelectItem title='Option 4' />
          </Select>
        </ApplicationProvider>,
      );

      await openAndLayout(component);

      expect(scrollToIndex).toHaveBeenCalledWith(expect.objectContaining({ index: 2 }));
    });
  });

  it('should open the options at the bottom, full width, by default', () => {
    const component = render(
      <TestSelect />,
    );

    const popover = component.UNSAFE_getByType(Popover);

    expect(popover.props.placement).toEqual('bottom');
    expect(popover.props.fullWidth).toEqual(true);
  });

  it('should forward placement and popoverProps to the options popover', () => {
    const component = render(
      <TestSelect
        placement='top end'
        popoverProps={{ fullWidth: false, blocking: false, style: { width: 300 } }}
      />,
    );

    const popover = component.UNSAFE_getByType(Popover);

    expect(popover.props.placement).toEqual('top end');
    expect(popover.props.fullWidth).toEqual(false);
    expect(popover.props.blocking).toEqual(false);
    expect(StyleSheet.flatten(popover.props.style)).toMatchObject({ width: 300 });
  });

  it('should take the placement only from the Select prop', () => {
    const component = render(
      <TestSelect
        placement='top'
        // @ts-expect-error placement is not part of SelectPopoverProps
        popoverProps={{ placement: 'left' }}
      />,
    );

    expect(component.UNSAFE_getByType(Popover).props.placement).toEqual('top');
  });

  it('should call popoverProps.onBackdropPress and still close the options', async () => {
    const onBackdropPress = jest.fn();
    const component = render(
      <TestSelect popoverProps={{ onBackdropPress }} />,
    );

    fireEvent.press(touchables.findControlTouchable(component));
    // The Modal backdrop is a PanResponder view, not a touchable.
    const backdrop = await waitFor(() => component.getByTestId('@backdrop'));
    await act(async () => {
      backdrop.props.onResponderRelease({ nativeEvent: {} });
    });

    expect(onBackdropPress).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(component.queryByText('Option 1')).toBeFalsy());
  });

  it('should render options when becomes focused', async () => {
    const component = render(
      <TestSelect />,
    );

    fireEvent.press(touchables.findControlTouchable(component));
    const firstOption = await waitFor(() => component.queryByText('Option 1'));
    const secondOption = component.queryByText('Option 2');

    expect(firstOption).toBeTruthy();
    expect(secondOption).toBeTruthy();
  });

  it('should hide options when backdrop is pressed', async () => {
    const component = render(
      <TestSelect />,
    );

    fireEvent.press(touchables.findControlTouchable(component));

    const backdrop = await waitFor(() => touchables.findBackdropTouchable(component));
    fireEvent.press(backdrop);

    const firstOption = await waitFor(() => touchables.findOptionTouchable(component, 0));
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
      <TestSelect onSelect={onSelect} />,
    );

    fireEvent.press(touchables.findControlTouchable(component));
    const option2 = await waitFor(() => component.getByText('Option 2'));

    fireEvent.press(option2);
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
    const optionTouchable = await waitFor(() => component.queryByText('Option 2'));

    fireEvent.press(optionTouchable);
  });

  it('should render checkboxes when multiselect', async () => {
    const component = render(
      <TestSelect multiSelect={true} />,
    );

    fireEvent.press(touchables.findControlTouchable(component));
    const checkboxes = await waitFor(() => component.UNSAFE_queryAllByType(CheckBox));

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
    const option2Checkbox = await waitFor(() => component.UNSAFE_queryAllByType(CheckBox)[1]);

    fireEvent.press(option2Checkbox);
  });

  it('should call onFocus', async () => {
    const onFocus = jest.fn();

    const component = render(
      <TestSelect onFocus={onFocus} />,
    );

    fireEvent.press(touchables.findControlTouchable(component));
    await waitFor(() => expect(onFocus).toHaveBeenCalled());
  });

  it('should call onBlur', async () => {
    const onBlur = jest.fn();
    const component = render(
      <TestSelect onBlur={onBlur} />,
    );

    fireEvent.press(touchables.findControlTouchable(component));
    await waitFor(() => null);

    fireEvent.press(touchables.findBackdropTouchable(component));
    await waitFor(() => expect(onBlur).toHaveBeenCalled());
  });

  it('should call onPressIn', () => {
    const onPressIn = jest.fn();

    const component = render(
      <TestSelect onPressIn={onPressIn} />,
    );

    fireEvent(touchables.findControlTouchable(component), 'pressIn');
    expect(onPressIn).toHaveBeenCalled();
  });

  it('should call onPressOut', () => {
    const onPressOut = jest.fn();

    const component = render(
      <TestSelect onPressOut={onPressOut} />,
    );

    fireEvent(touchables.findControlTouchable(component), 'pressOut');
    expect(onPressOut).toHaveBeenCalled();
  });

  it('should be able to call focus with ref', async () => {
    const componentRef: React.RefObject<SelectRef> = React.createRef();
    render(
      <TestSelect ref={componentRef} />,
    );

    expect(componentRef.current.focus).toBeTruthy();
    componentRef.current.focus();
  });

  it('should be able to call blur with ref', async () => {
    const componentRef: React.RefObject<SelectRef> = React.createRef();
    render(
      <TestSelect ref={componentRef} />,
    );

    expect(componentRef.current.blur).toBeTruthy();
    componentRef.current.blur();
  });

  it('should be able to call isFocused with ref', () => {
    const componentRef: React.RefObject<SelectRef> = React.createRef();
    render(
      <TestSelect ref={componentRef} />,
    );

    expect(componentRef.current.isFocused).toBeTruthy();
    componentRef.current.isFocused();
  });

  it('should be able to call clear with ref', () => {
    const componentRef: React.RefObject<SelectRef> = React.createRef();
    render(
      <TestSelect ref={componentRef} />,
    );

    expect(componentRef.current.clear).toBeTruthy();
    componentRef.current.clear();
  });

  describe('accessibility', () => {

    it('should expose the combobox role on the trigger', () => {
      const component = render(<TestSelect />);

      expect(component.getByRole('combobox')).toBeTruthy();
    });

    it('should report collapsed while the list is closed', () => {
      const component = render(<TestSelect />);

      expect(component.getByRole('combobox')).not.toBeExpanded();
    });

    it('should report expanded once the list opens', async () => {
      const component = render(<TestSelect />);

      fireEvent.press(component.getByRole('combobox'));

      await waitFor(() => {
        expect(component.getByRole('combobox')).toBeExpanded();
      });
    });

    it('should expose disabled state', () => {
      const component = render(<TestSelect disabled={true} />);

      expect(component.getByRole('combobox')).toBeDisabled();
    });

    it('should name the trigger from its label', () => {
      const component = render(<TestSelect label='Country' />);

      expect(component.getByRole('combobox')).toHaveAccessibleName('Country');
    });

    it('should let a consumer label reach the trigger', () => {
      // SelectProps extends TouchableWebProps, but the anchor used to drop
      // every pass-through prop, so aria-label never arrived.
      const component = render(<TestSelect aria-label='Custom' />);

      expect(component.getByRole('combobox')).toHaveAccessibleName('Custom');
    });

    it('should expose options with their selected state', async () => {
      const component = render(<TestSelect selectedIndex={new IndexPath(1)} />);

      fireEvent.press(component.getByRole('combobox'));

      await waitFor(() => {
        const options = component.getAllByRole('menuitem');

        expect(options).toHaveLength(2);
        expect(options[0]).not.toBeSelected();
        expect(options[1]).toBeSelected();
      });
    });
  });

});

describe('@select: component checks with groups', () => {

  const TestSelect = React.forwardRef((props: Partial<SelectProps>, ref: React.Ref<SelectRef>) => {
    const [selectedIndex, setSelectedIndex] = React.useState(props.selectedIndex);

    const onSelect = (index: IndexPath | IndexPath[]): void => {
      setSelectedIndex(index);
      props.onSelect?.(index);
    };

    return (
      <ApplicationProvider
        mapping={mapping}
        theme={light}
      >
        <Select
          ref={ref}
          {...props}
          selectedIndex={selectedIndex}
          onSelect={onSelect}
        >
          <SelectGroup title='Group 1'>
            <SelectItem title='Option 1.1' />
            <SelectItem title='Option 1.2' />
          </SelectGroup>
          <SelectGroup title='Group 2'>
            <SelectItem title='Option 2.1' />
            <SelectItem title='Option 2.2' />
          </SelectGroup>
        </Select>
      </ApplicationProvider>
    );
  });

  TestSelect.displayName = 'TestSelect';

  const touchables = {
    findControlTouchable: (api: RenderAPI) => api.UNSAFE_queryAllByType(TouchableWeb)[0],
  };

  it('should select single option in group', async () => {
    const onSelect = jest.fn((index: IndexPath) => {
      expect(index.row).toEqual(1);
      expect(index.section).toEqual(0);
    });

    const component = render(
      <TestSelect onSelect={onSelect} />,
    );

    fireEvent.press(touchables.findControlTouchable(component));
    const option12Touchable = await waitFor(() => component.getByText('Option 1.2'));

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
    const group2Touchable = await waitFor(() => component.getByText('Group 2'));

    fireEvent.press(group2Touchable);
  });


});


