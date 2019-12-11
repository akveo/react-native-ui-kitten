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
import { Select } from './select.component';
import { SelectOptionType } from './selectOption.component';
import {
  mapping,
  theme,
} from '../support/tests';

jest.useFakeTimers();

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
  labelStyle?: StyleType;
  placeholderStyle?: StyleType;
  controlStyle?: StyleType;
  onSelectPress?: () => void;
  onSelectPressIn?: () => void;
  onSelectPressOut?: () => void;
  onSelectLongPress?: () => void;
  onMultiSelectPress?: () => void;
}

class TestApplication extends React.Component<Props> {

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
      onSelectPressIn,
      onSelectPressOut,
      onSelectLongPress,
    } = this.props;

    return (
      <ApplicationProvider mapping={mapping} theme={theme}>
        <Select
          label={selectLabel}
          placeholder={selectPlaceholder}
          data={data}
          icon={this.renderIcon}
          onPress={onSelectPress}
          onPressIn={onSelectPressIn}
          onPressOut={onSelectPressOut}
          onLongPress={onSelectLongPress}
          onSelect={() => {}}
        />
        <Select
          label={selectLabel}
          placeholder={selectPlaceholder}
          data={data}
          multiSelect={true}
          icon={this.renderIcon}
          onPress={onMultiSelectPress}
          onSelect={() => {}}
        />
      </ApplicationProvider>
    );
  }
}


describe('@select component checks', () => {

  const message: string = [
    'Unfortunately, there is no way to test Select since it relies on native code to perform measuring.',
    'However, most use cases are covered with tests of List and the Input element of Select',
  ].join('\n');

  console.info(message);

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
});
