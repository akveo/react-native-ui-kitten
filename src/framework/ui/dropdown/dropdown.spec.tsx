import React from 'react';
import {
  Image,
  ImageProps,
  TouchableOpacity,
} from 'react-native';
import {
  render,
  fireEvent,
  RenderAPI,
} from 'react-native-testing-library';
import {
  ApplicationProvider,
  StyleType,
} from '@kitten/theme';
import {
  Dropdown,
  DropdownOption,
} from './dropdown.component';
import { DropdownItemType } from './droppdownItem.component';
import { CheckBox } from '../checkbox/checkbox.component';
import {
  mapping,
  theme,
} from '../support/tests';

jest.useFakeTimers();

const stringify = (obj: any): string => JSON.stringify(obj);

const iconClosedUri: string = 'https://akveo.github.io/eva-icons/fill/png/128/arrow-ios-downward.png';
const iconOpenedUri: string = 'https://akveo.github.io/eva-icons/fill/png/128/arrow-ios-upward.png';

const data: DropdownItemType[] = [
  { text: 'Option 1' },
  { text: 'Option 2', disabled: true },
  {
    text: 'Option 3',
    items: [
      { text: 'Option 31', disabled: true },
      { text: 'Option 32' },
      { text: 'Option 33' },
    ],
  },
  { text: 'Option 4' },
  { text: 'Option 5', textStyle: { color: 'red' } },
  { text: 'Option 6' },
  { text: 'Option 8' },
  { text: 'Option 9' },
];

interface Props {
  dropdownLabel?: string;
  dropdownPlaceholder?: string;
  dropdownDisabled?: boolean;
  multiSelectDisabled?: boolean;
  labelStyle?: StyleType;
  placeholderStyle?: StyleType;
  controlStyle?: StyleType;
  onDropdownPress?: () => void;
  onDropdownPressIn?: () => void;
  onDropdownPressOut?: () => void;
  onDropdownLongPress?: () => void;
  onMultiSelectPress?: () => void;
}

interface State {
  dropdownSelected: DropdownOption;
  dropdownMultiSelected: DropdownOption;
}

class TestApplication extends React.Component<Props, State> {

  public state: State = {
    dropdownSelected: null,
    dropdownMultiSelected: [],
  };

  private onDropdownSelect = (dropdownSelected: DropdownOption): void => {
    this.setState({ dropdownSelected });
  };

  private onDropdownMultiSelect = (dropdownMultiSelected: DropdownOption): void => {
    this.setState({ dropdownMultiSelected });
  };

  private renderIcon = (style: StyleType, visible: boolean): React.ReactElement<ImageProps> => {
    const uri: string = visible ? iconOpenedUri : iconClosedUri;

    return (
      <Image
        source={{ uri }}
        style={style}
      />
    );
  };

  public render(): React.ReactNode {
    const {
      onDropdownPress,
      onMultiSelectPress,
      dropdownLabel,
      dropdownPlaceholder,
      dropdownDisabled,
      multiSelectDisabled,
      onDropdownPressIn,
      onDropdownPressOut,
      onDropdownLongPress,

    } = this.props;

    return (
      <ApplicationProvider mapping={mapping} theme={theme}>
        <Dropdown
          disabled={dropdownDisabled}
          label={dropdownLabel}
          placeholder={dropdownPlaceholder}
          data={data}
          selectedOption={this.state.dropdownSelected}
          icon={this.renderIcon}
          onPress={onDropdownPress}
          onPressIn={onDropdownPressIn}
          onPressOut={onDropdownPressOut}
          onLongPress={onDropdownLongPress}
          onSelect={this.onDropdownSelect}
        />
        <Dropdown
          disabled={multiSelectDisabled}
          label={dropdownLabel}
          placeholder={dropdownPlaceholder}
          data={data}
          selectedOption={this.state.dropdownMultiSelected}
          multiSelect
          icon={this.renderIcon}
          onPress={onMultiSelectPress}
          onSelect={this.onDropdownMultiSelect}
        />
      </ApplicationProvider>
    );
  }

}


describe('@ dropdown component checks', () => {

  it('* dropdown onPress have been called', () => {
    const onDropdownPress = jest.fn();
    const onMultiSelectPress = jest.fn();
    const application: RenderAPI = render(
      <TestApplication
        onDropdownPress={onDropdownPress}
        onMultiSelectPress={onMultiSelectPress}
      />,
    );

    fireEvent.press(application.getAllByType(Dropdown)[0]);
    fireEvent.press(application.getAllByType(Dropdown)[1]);
    expect(onDropdownPress).toHaveBeenCalled();
    expect(onMultiSelectPress).toHaveBeenCalled();
  });

  it('* disabled props checks', () => {
    const onDropdownPress = jest.fn();
    const onMultiSelectPress = jest.fn();
    const application: RenderAPI = render(
      <TestApplication
        dropdownDisabled={false}
        multiSelectDisabled={true}
        onDropdownPress={onDropdownPress}
        onMultiSelectPress={onMultiSelectPress}
      />,
    );

    fireEvent.press(application.getAllByType(TouchableOpacity)[0]);
    expect(onDropdownPress).toHaveBeenCalled();
    fireEvent.press(application.getAllByType(TouchableOpacity)[1]);
    expect(onMultiSelectPress).toHaveBeenCalledTimes(0);
  });

  it('* dropdown default onSelect works properly', () => {
    const expectedSelectedOption: DropdownItemType = { text: 'Option 1' };
    const onDropdownPress = jest.fn();
    const application: RenderAPI = render(
      <TestApplication onDropdownPress={onDropdownPress}/>,
    );

    fireEvent.press(application.getAllByType(TouchableOpacity)[0]);

    fireEvent.press(application.getAllByText(expectedSelectedOption.text)[0].parent);
    const { selectedOption } = application.getAllByType(Dropdown)[0].props;

    expect(stringify(selectedOption)).toBe(stringify(expectedSelectedOption));
  });

  it('* dropdown multiSelect onSelect works properly', () => {
    const expectedSelectedOption: DropdownItemType[] = [
      { text: 'Option 4' },
      { text: 'Option 32' },
    ];
    const onMultiSelectPress = jest.fn();
    const application: RenderAPI = render(
      <TestApplication onMultiSelectPress={onMultiSelectPress}/>,
    );

    fireEvent.press(application.getAllByType(TouchableOpacity)[1]);
    fireEvent(application.getAllByText(expectedSelectedOption[0].text)[0], 'onChange');
    fireEvent(application.getAllByText(expectedSelectedOption[1].text)[0], 'onChange');
    const { selectedOption } = application.getAllByType(Dropdown)[1].props;

    expect(stringify(selectedOption)).toBe(stringify(expectedSelectedOption));
  });

  it('* multiSelect unselect works properly', () => {
    const onMultiSelectPress = jest.fn();
    const application: RenderAPI = render(
      <TestApplication onMultiSelectPress={onMultiSelectPress}/>,
    );

    fireEvent.press(application.getAllByType(TouchableOpacity)[1]);
    fireEvent(application.getAllByType(CheckBox)[5], 'onChange');
    fireEvent(application.getAllByType(CheckBox)[5], 'onChange');
    const { selectedOption } = application.getAllByType(TouchableOpacity)[1].props;

    expect(stringify(selectedOption)).toBe(stringify([]));
  });

  it('* multiSelect group selected works properly', () => {
    const expectedSelectedOption: DropdownItemType[] = [
      { text: 'Option 32' },
      { text: 'Option 33' },
    ];
    const onMultiSelectPress = jest.fn();
    const application: RenderAPI = render(
      <TestApplication onMultiSelectPress={onMultiSelectPress}/>,
    );

    fireEvent.press(application.getAllByType(TouchableOpacity)[1]);
    fireEvent(application.getAllByText('Option 3')[0], 'onChange');
    const { selectedOption: selected1 } = application.getAllByType(TouchableOpacity)[1].props;

    expect(stringify(selected1)).toBe(stringify(expectedSelectedOption));

    fireEvent(application.getAllByText('Option 3')[0], 'onChange');
    const { selectedOption: selected2 } = application.getAllByType(TouchableOpacity)[1].props;

    expect(stringify(selected2)).toBe(stringify([]));
  });

  it('* dropdown onPress* handling', () => {
    const onDropdownPressIn = jest.fn();
    const onDropdownPressOut = jest.fn();
    const onDropdownLongPress = jest.fn();
    const application: RenderAPI = render(
      <TestApplication
        onDropdownPressIn={onDropdownPressIn}
        onDropdownPressOut={onDropdownPressOut}
        onDropdownLongPress={onDropdownLongPress}
      />,
    );

    fireEvent(application.getAllByType(TouchableOpacity)[0], 'pressIn');
    fireEvent(application.getAllByType(TouchableOpacity)[0], 'pressOut');
    fireEvent(application.getAllByType(TouchableOpacity)[0], 'longPress');

    expect(onDropdownPressIn).toHaveBeenCalled();
    expect(onDropdownPressOut).toHaveBeenCalled();
    expect(onDropdownLongPress).toHaveBeenCalled();
  });

  it('* text props checks', () => {
    const passedLabel: string = 'Label';
    const passedPlaceholder: string = 'Placeholder';
    const application: RenderAPI = render(
      <TestApplication
        dropdownLabel={passedLabel}
        dropdownPlaceholder={passedPlaceholder}
      />,
    );

    const label: string = application.getAllByText(passedLabel)[0].props.children;
    const placeholder: string = application.getAllByText(passedPlaceholder)[0].props.children;

    expect(label).toBe(passedLabel);
    expect(placeholder).toBe(passedPlaceholder);
  });

});
