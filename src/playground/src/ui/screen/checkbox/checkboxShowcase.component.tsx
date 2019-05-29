import React from 'react';
import {
  CheckBox,
  CheckBoxProps,
} from '@kitten/ui';

interface CheckBoxShowcaseComponentState {
  checked: boolean;
  indeterminate: boolean;
}

class CheckBoxShowcaseComponent extends React.Component<CheckBoxProps, CheckBoxShowcaseComponentState> {

  static defaultProps: CheckBoxProps = {
    checked: true,
    indeterminate: false,
  };

  public state: CheckBoxShowcaseComponentState = {
    checked: this.props.checked,
    indeterminate: this.props.indeterminate,
  };

  private onChange = (checked: boolean, indeterminate: boolean) => {
    this.setState({ checked, indeterminate });
  };

  public render(): React.ReactElement<CheckBoxProps> {
    return (
      <CheckBox
        {...this.props}
        checked={this.state.checked}
        indeterminate={this.state.indeterminate}
        onChange={this.onChange}
      />
    );
  }
}

export const CheckBoxShowcase = (props?: CheckBoxProps): React.ReactElement<CheckBoxProps> => {
  return (
    <CheckBoxShowcaseComponent {...props}/>
  );
};
