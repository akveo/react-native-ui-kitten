import React from 'react';
import {
  Toggle,
  ToggleElement,
  ToggleProps,
} from 'react-native-ui-kitten';

interface ToggleShowcaseComponentState {
  checked: boolean;
}

class ToggleShowcaseComponent extends React.Component<ToggleProps, ToggleShowcaseComponentState> {

  static defaultProps: ToggleProps = {
    checked: true,
  };

  public state: ToggleShowcaseComponentState = {
    checked: this.props.checked,
  };

  private onChange = (checked: boolean) => {
    this.setState({ checked });
  };

  public render(): React.ReactElement<ToggleProps> {
    return (
      <Toggle
        {...this.props}
        checked={this.state.checked}
        onChange={this.onChange}
      />
    );
  }
}

export const ToggleShowcase = (props?: ToggleProps): ToggleElement => {
  return (
    <ToggleShowcaseComponent {...props}/>
  );
};
