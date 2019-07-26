import React from 'react';
import {
  Radio,
  RadioGroup,
  RadioGroupElement,
  RadioGroupProps,
} from '@kitten/ui';

interface State {
  selectedIndex: number;
}

export class RadioGroupShowcase extends React.Component<RadioGroupProps, State> {

  public state: State = {
    selectedIndex: 0,
  };

  private onChange = (selectedIndex: number) => {
    this.setState({ selectedIndex });
  };

  public render(): RadioGroupElement {
    return (
      <RadioGroup
        selectedIndex={this.state.selectedIndex}
        onChange={this.onChange}>
        <Radio text='Option 1'/>
        <Radio text='Option 2'/>
        <Radio text='Option 3'/>
      </RadioGroup>
    );
  }
}
