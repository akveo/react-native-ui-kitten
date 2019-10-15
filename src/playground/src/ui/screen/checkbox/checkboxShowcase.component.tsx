import React from 'react';
import {
  CheckBox,
  CheckBoxElement,
  CheckBoxProps,
} from 'react-native-ui-kitten';

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

  public render(): CheckBoxElement {
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

export const CheckBoxShowcase = (props?: CheckBoxProps): CheckBoxElement => {
  return (
    <CheckBoxShowcaseComponent {...props}/>
  );
};
