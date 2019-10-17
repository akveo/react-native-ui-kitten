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
  Select,
  SelectOption,
} from './select.component';
import { SelectOptionType } from './selectOption.component';
import { CheckBox } from '../checkbox/checkbox.component';
import {
  mapping,
  theme,
} from '../support/tests';

jest.useFakeTimers();

const stringify = (obj: any): string => JSON.stringify(obj);

const iconClosedUri: string = 'https://akveo.github.io/eva-icons/fill/png/128/arrow-ios-downward.png';
const iconOpenedUri: string = 'https://akveo.github.io/eva-icons/fill/png/128/arrow-ios-upward.png';

const data: SelectOptionType[] = [
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
  selectLabel?: string;
  selectPlaceholder?: string;
  selectDisabled?: boolean;
  multiSelectDisabled?: boolean;
  labelStyle?: StyleType;
  placeholderStyle?: StyleType;
  controlStyle?: StyleType;
  preselectedRef?: SelectOption;
  preselectedInline?: SelectOption;
  preselectedMultiRef?: SelectOption;
  preselectedMultiInline?: SelectOption;
  onSelectPress?: () => void;
  onSelectPressIn?: () => void;
  onSelectPressOut?: () => void;
  onSelectLongPress?: () => void;
  onMultiSelectPress?: () => void;
  keyExtractor?: (item: SelectOptionType) => string;
}

interface State {
  selectSelected: SelectOption;
  selectMultiSelected: SelectOption;
}

class TestApplication extends React.Component<Props, State> {

  private getSelectedOption = (): SelectOption => {
    const { preselectedRef, preselectedInline } = this.props;

    if (preselectedInline) {
      return preselectedInline;
    } else if (preselectedRef) {
      return preselectedRef;
    } else {
      return null;
    }
  };

  private getSelectedOptionMulti = (): SelectOption => {
    const { preselectedMultiInline, preselectedMultiRef } = this.props;

    if (preselectedMultiInline) {
      return preselectedMultiInline;
    } else if (preselectedMultiRef) {
      return preselectedMultiRef;
    } else {
      return [];
    }
  };

  public state: State = {
    selectSelected: this.getSelectedOption(),
    selectMultiSelected: this.getSelectedOptionMulti(),
  };

  private onSelectSelect = (selectSelected: SelectOption): void => {
    this.setState({ selectSelected });
  };

  private onSelectMultiSelect = (selectMultiSelected: SelectOption): void => {
    this.setState({ selectMultiSelected });
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
      onSelectPress,
      onMultiSelectPress,
      selectLabel,
      selectPlaceholder,
      selectDisabled,
      multiSelectDisabled,
      onSelectPressIn,
      onSelectPressOut,
      onSelectLongPress,
      keyExtractor,
    } = this.props;

    return (
      <ApplicationProvider mapping={mapping} theme={theme}>
        <Select
          disabled={selectDisabled}
          label={selectLabel}
          placeholder={selectPlaceholder}
          data={data}
          selectedOption={this.state.selectSelected}
          icon={this.renderIcon}
          onPress={onSelectPress}
          onPressIn={onSelectPressIn}
          onPressOut={onSelectPressOut}
          onLongPress={onSelectLongPress}
          onSelect={this.onSelectSelect}
          keyExtractor={keyExtractor}
        />
        <Select
          disabled={multiSelectDisabled}
          label={selectLabel}
          placeholder={selectPlaceholder}
          data={data}
          selectedOption={this.state.selectMultiSelected}
          multiSelect
          icon={this.renderIcon}
          onPress={onMultiSelectPress}
          onSelect={this.onSelectMultiSelect}
          keyExtractor={keyExtractor}
        />
      </ApplicationProvider>
    );
  }
}


describe('@ select component checks', () => {

  it('* select onPress have been called', () => {
    const onSelectPress = jest.fn();
    const onMultiSelectPress = jest.fn();
    const application: RenderAPI = render(
      <TestApplication
        onSelectPress={onSelectPress}
        onMultiSelectPress={onMultiSelectPress}
      />,
    );

    fireEvent.press(application.getAllByType(Select)[0]);
    fireEvent.press(application.getAllByType(Select)[1]);
    expect(onSelectPress).toHaveBeenCalled();
    expect(onMultiSelectPress).toHaveBeenCalled();
  });

  it('* disabled props checks', () => {
    const onSelectPress = jest.fn();
    const onMultiSelectPress = jest.fn();
    const application: RenderAPI = render(
      <TestApplication
        selectDisabled={false}
        multiSelectDisabled={true}
        onSelectPress={onSelectPress}
        onMultiSelectPress={onMultiSelectPress}
      />,
    );

    fireEvent.press(application.getAllByType(TouchableOpacity)[0]);
    expect(onSelectPress).toHaveBeenCalled();
    fireEvent.press(application.getAllByType(TouchableOpacity)[1]);
    expect(onMultiSelectPress).toHaveBeenCalledTimes(0);
  });

  it('* select default onSelect works properly', () => {
    const expectedSelectedOption: SelectOptionType = { text: 'Option 1' };
    const onSelectPress = jest.fn();
    const application: RenderAPI = render(
      <TestApplication onSelectPress={onSelectPress}/>,
    );

    fireEvent.press(application.getAllByType(TouchableOpacity)[0]);

    fireEvent.press(application.getAllByText(expectedSelectedOption.text)[0].parent);
    const { selectedOption } = application.getAllByType(Select)[0].props;

    expect(stringify(selectedOption)).toBe(stringify(expectedSelectedOption));
  });

  it('* select multiSelect onSelect works properly', () => {
    const expectedSelectedOption: SelectOptionType[] = [
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
    const { selectedOption } = application.getAllByType(Select)[1].props;

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
    const expectedSelectedOption: SelectOptionType[] = [
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

  it('* select onPress* handling', () => {
    const onSelectPressIn = jest.fn();
    const onSelectPressOut = jest.fn();
    const onSelectLongPress = jest.fn();
    const application: RenderAPI = render(
      <TestApplication
        onSelectPressIn={onSelectPressIn}
        onSelectPressOut={onSelectPressOut}
        onSelectLongPress={onSelectLongPress}
      />,
    );

    fireEvent(application.getAllByType(TouchableOpacity)[0], 'pressIn');
    fireEvent(application.getAllByType(TouchableOpacity)[0], 'pressOut');
    fireEvent(application.getAllByType(TouchableOpacity)[0], 'longPress');

    expect(onSelectPressIn).toHaveBeenCalled();
    expect(onSelectPressOut).toHaveBeenCalled();
    expect(onSelectLongPress).toHaveBeenCalled();
  });

  it('* text props checks', () => {
    const passedLabel: string = 'Label';
    const passedPlaceholder: string = 'Placeholder';
    const application: RenderAPI = render(
      <TestApplication
        selectLabel={passedLabel}
        selectPlaceholder={passedPlaceholder}
      />,
    );

    const label: string = application.getAllByText(passedLabel)[0].props.children;
    const placeholder: string = application.getAllByText(passedPlaceholder)[0].props.children;

    expect(label).toBe(passedLabel);
    expect(placeholder).toBe(passedPlaceholder);
  });

  it('* preselected item by reference objects equality checks', () => {
    const preselectedDefault: SelectOption = data[3];
    const preselectedMulti: SelectOption = [data[3], data[4]];
    const application: RenderAPI = render(
      <TestApplication
        preselectedRef={preselectedDefault}
        preselectedMultiRef={preselectedMulti}
      />,
    );

    const { selectedOption: defaultSelect } = application.getAllByType(TouchableOpacity)[0].props;
    const { selectedOption: multiSelect } = application.getAllByType(TouchableOpacity)[1].props;

    expect(defaultSelect).toEqual(preselectedDefault);
    expect(multiSelect).toEqual(preselectedMulti);
  });

  it('* preselected item inline objects equality checks', () => {
    const preselectedMulti: SelectOption = [{ text: 'Option 4' }, { text: 'Option 6' }];
    const application: RenderAPI = render(
      <TestApplication
        preselectedMultiInline={preselectedMulti}
        keyExtractor={(item: SelectOptionType) => item.text}
      />,
    );

    fireEvent.press(application.getAllByType(TouchableOpacity)[1]);
    fireEvent(application.getAllByType(CheckBox)[6], 'onChange');

    const { selectedOption: multiSelect } = application.getAllByType(TouchableOpacity)[1].props;

    expect(multiSelect.length).toBe(1);
    expect(stringify(multiSelect)).toBe(stringify([{ text: 'Option 6' }]));
  });

  it('* unexpected preselected', () => {
    const preselectedDefault: SelectOption = { text: 'Option 4545'};

    expect(() => {
      render(<TestApplication preselectedInline={preselectedDefault}/>);
    }).toThrowError();
  });

});
