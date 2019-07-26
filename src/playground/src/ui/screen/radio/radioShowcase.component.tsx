import React from 'react';
import {
  Radio,
  RadioElement,
  RadioProps,
} from '@kitten/ui';

interface RadioShowcaseComponentState {
  checked: boolean;
}

class RadioShowcaseComponent extends React.Component<RadioProps, RadioShowcaseComponentState> {

  static defaultProps: RadioProps = {
    checked: true,
  };

  public state: RadioShowcaseComponentState = {
    checked: this.props.checked,
  };

  private onChange = (checked: boolean) => {
    this.setState({ checked });
  };

  public render(): RadioElement {
    return (
      <Radio
        {...this.props}
        checked={this.state.checked}
        onChange={this.onChange}
      />
    );
  }
}

export const RadioShowcase = (props?: RadioProps): RadioElement => {
  return (
    <RadioShowcaseComponent {...props}/>
  );
};
