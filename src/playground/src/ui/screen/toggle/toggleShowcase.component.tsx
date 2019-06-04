import React from 'react';
import {
  Toggle,
  ToggleProps,
} from '@kitten/ui';

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

export const ToggleShowcase = (props?: ToggleProps): React.ReactElement<ToggleProps> => {
  return (
    <ToggleShowcaseComponent {...props}/>
  );
};
