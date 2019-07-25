import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  GestureResponderEvent,
  ImageProps,
  ListRenderItemInfo,
} from 'react-native';
import {
  Dropdown,
  DropdownItemType,
  Text,
} from '@kitten/ui';
import { StyleType } from '@kitten/theme';

interface State {
  selectedOption: DropdownItemType;
  selectedOptions: DropdownItemType[];
}

export class DropdownContainer extends React.Component<any, State> {

  private items: DropdownItemType[] = [
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
    { text: 'Option 5' },
    { text: 'Option 6' },
    { text: 'Option 8' },
    { text: 'Option 9' },
    { text: 'Option 10' },
    { text: 'Option 11' },
    { text: 'Option 12' },
  ];

  public state: State = {
    selectedOption: null,
    selectedOptions: [],
  };

  private onSelect = (selectedOption: DropdownItemType, event?: GestureResponderEvent): void => {
    this.setState({ selectedOption });
  };

  private onMultiSelect = (selectedOptions: DropdownItemType[]): void => {
    this.setState({ selectedOptions });
  };

  private renderIcon = (style: StyleType, visible: boolean): React.ReactElement<ImageProps> => {
    const uri: string = visible ?
      'https://akveo.github.io/eva-icons/fill/png/128/arrow-ios-upward.png' :
      'https://akveo.github.io/eva-icons/fill/png/128/arrow-ios-downward.png';
    return (
      <Image
        source={{ uri }}
        style={style}
      />
    );
  };

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Dropdown
          style={styles.dropdown}
          label='Options'
          placeholder='Select Option'
          // appearance='outline'
          status='info'
          // disabled={true}
          // size='tiny'
          items={this.items}
          selectedOption={this.state.selectedOption}
          icon={this.renderIcon}
          onSelect={this.onSelect}
        />
        <Dropdown
          style={styles.dropdown}
          label='Options'
          placeholder='Select Option'
          items={this.items}
          selectedOption={this.state.selectedOptions}
          icon={this.renderIcon}
          multiSelect
          onSelect={this.onMultiSelect}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // backgroundColor: 'gray',
    // justifyContent: 'flex-end',
  },
  dropdown: {
    // marginTop: 500,
    marginTop: 20,
  },
});
