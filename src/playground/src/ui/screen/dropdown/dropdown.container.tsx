import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  GestureResponderEvent,
  ImageProps,
} from 'react-native';
import {
  Dropdown,
  DropdownItemType,
  Text,
} from '@kitten/ui';
import { StyleType } from '@kitten/theme';

interface State {
  selectedIndex: number;
}

export class DropdownContainer extends React.Component<any, State> {

  public state: State = {
    selectedIndex: 0,
  };

  private items: DropdownItemType[] = [
    { text: 'Option 1' },
    { text: 'Option 2', disabled: true },
    { text: 'Option 3' },
    { text: 'Option 4' },
    { text: 'Option 5' },
    { text: 'Option 6' },
    { text: 'Option 8' },
    { text: 'Option 9' },
    { text: 'Option 10' },
    { text: 'Option 11' },
    { text: 'Option 12' },
  ];

  private onSelect = (selectedIndex: number, event?: GestureResponderEvent): void => {
    this.setState({ selectedIndex });
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
          selectedIndex={this.state.selectedIndex}
          icon={this.renderIcon}
          onSelect={this.onSelect}
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
  },
});
