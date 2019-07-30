import React from 'react';
import {
  Dropdown,
  DropdownItemType,
  DropdownOption,
} from '@kitten/ui';

interface State {
  selectedOption: DropdownOption;
}

export class DropdownContainer extends React.Component<any, State> {

  private items: DropdownItemType[] = [
    { text: 'Option 1' },
    { text: 'Option 2', disabled: true },
    { text: 'Option 3', items: [ { text: 'Option 31', disabled: true }, { text: 'Option 32' }, { text: 'Option 33' } ] },
    { text: 'Option 4' },
  ];

  public state: State = {
    selectedOption: [],
  };

  private onSelect = (selectedOption: DropdownOption): void => {
    this.setState({ selectedOption });
  };

  public render(): React.ReactNode {
    return (
      <Dropdown
        data={this.items}
        multiSelect
        selectedOption={this.state.selectedOption}
        onSelect={this.onSelect}
      />
    );
  }
}

