import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Dropdown,
  DropdownOption,
  DropdownProps,
  DropdownElement,
} from '@kitten/ui';

interface DropdownShowcaseComponentState {
  selectedOption: DropdownOption;
}

class DropdownShowcaseComponent extends React.Component<DropdownProps, DropdownShowcaseComponentState> {

  public constructor(props: DropdownProps) {
    super(props);
    this.state = {
      selectedOption: props.multiSelect ? [] : null,
    };
  }

  private setSelectedOption = (selectedOption: DropdownOption): void => {
    this.setState({ selectedOption });
  };

  public render(): DropdownElement {
    return (
      <Dropdown
        {...this.props}
        style={styles.dropdown}
        selectedOption={this.state.selectedOption}
        onSelect={this.setSelectedOption}
      />
    );
  }
}

const styles = StyleSheet.create({
  dropdown: {
    width: 200,
  },
});

export const DropdownShowcase = (props: DropdownProps): DropdownElement => {
  return (
    <DropdownShowcaseComponent {...props}/>
  );
};
