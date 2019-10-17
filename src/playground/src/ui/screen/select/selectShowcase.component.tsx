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

interface AdditionalProps {
  preselectedItem?: SelectOption;
}

type Props = SelectProps & AdditionalProps;

class SelectShowcaseComponent extends React.Component<Props, SelectShowcaseComponentState> {

  public constructor(props: SelectProps) {
    super(props);
    this.state = {
      selectedOption: this.getInitialSelectedOption(),
    };
  }

  private getInitialSelectedOption = (): SelectOption => {
    const { multiSelect, preselectedItem } = this.props;

    if (multiSelect) {
      return preselectedItem ? preselectedItem : [];
    } else {
      return preselectedItem ? preselectedItem : null;
    }
  };

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
