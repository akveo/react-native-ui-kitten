import React from 'react';
import {
  View,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import {
  Dropdown,
  DropdownItemType,
  Text,
} from '@kitten/ui';

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

  public render(): React.ReactNode {
    return (
      <View style={styles.container}>
        <Dropdown
          label='Options'
          placeholder='Select Option'
          // appearance='outline'
          status='warning'
          // disabled={true}
          // size='giant'
          items={this.items}
          selectedIndex={this.state.selectedIndex}
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
    // backgroundColor: 'yellow',
  },
});
