import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Select,
  SelectOption,
  SelectProps,
  SelectElement,
} from 'react-native-ui-kitten';

interface SelectShowcaseComponentState {
  selectedOption: SelectOption;
}

class SelectShowcaseComponent extends React.Component<SelectProps, SelectShowcaseComponentState> {

  public constructor(props: SelectProps) {
    super(props);
    this.state = {
      selectedOption: props.multiSelect ? [] : null,
    };
  }

  private setSelectedOption = (selectedOption: SelectOption): void => {
    this.setState({ selectedOption });
  };

  public render(): SelectElement {
    return (
      <Select
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

export const SelectShowcase = (props: SelectProps): SelectElement => {
  return (
    <SelectShowcaseComponent {...props}/>
  );
};
