import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@kitten/theme';
import { CheckBox as CheckBoxComponent } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  isCheckBoxPrimaryChecked: boolean;
  isCheckBoxSuccessChecked: boolean;
  isCheckBoxWarningChecked: boolean;
  isCheckBoxDangerChecked: boolean;
  isCheckBoxInfoChecked: boolean;
  isCheckBoxWhiteChecked: boolean;
  isCheckBoxDisabled1Checked: boolean;
  isCheckBoxDisabled2Checked: boolean;
  isIndeterminateTree: boolean;
  indeterminateValue: boolean;
  treeCheckbox1Value: boolean;
  treeCheckbox2Value: boolean;
  treeCheckbox3Value: boolean;
  indeterminateSingleValue: boolean;
  isIndeterminateSingle: boolean;
}

const STATUS: string = '';

class CheckBox extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'CheckBox',
  };

  public state: State = {
    isCheckBoxPrimaryChecked: true,
    isCheckBoxSuccessChecked: true,
    isCheckBoxWarningChecked: true,
    isCheckBoxDangerChecked: true,
    isCheckBoxInfoChecked: true,
    isCheckBoxWhiteChecked: true,
    isCheckBoxDisabled1Checked: true,
    isCheckBoxDisabled2Checked: false,
    isIndeterminateTree: false,
    indeterminateValue: undefined,
    treeCheckbox1Value: true,
    treeCheckbox2Value: false,
    treeCheckbox3Value: false,
    indeterminateSingleValue: true,
    isIndeterminateSingle: true,
  };

  public componentWillMount(): void {
    this.changeIndeterminateTree();
  }

  private onCheckBoxPrimaryChange = (selected: boolean) => {
    this.setState({ isCheckBoxPrimaryChecked: selected });
  };

  private onCheckBoxSuccessChange = (selected: boolean) => {
    this.setState({ isCheckBoxSuccessChecked: selected });
  };

  private onCheckBoxWarningChange = (selected: boolean) => {
    this.setState({ isCheckBoxWarningChecked: selected });
  };

  private onCheckBoxDangerChange = (selected: boolean) => {
    this.setState({ isCheckBoxDangerChecked: selected });
  };

  private onCheckBoxInfoChange = (selected: boolean) => {
    this.setState({ isCheckBoxInfoChecked: selected });
  };

  private onCheckBoxWhiteChange = (selected: boolean) => {
    this.setState({ isCheckBoxWhiteChecked: selected });
  };

  private onCheckBoxDisabled1Change = (selected: boolean) => {
    this.setState({ isCheckBoxDisabled1Checked: selected });
  };

  private onCheckBoxDisabled2Change = (selected: boolean) => {
    this.setState({ isCheckBoxDisabled2Checked: selected });
  };

  private onIndeterminateValue = (selected: boolean, indeterminate: boolean) => {
    this.setState({
      indeterminateValue: selected,
      treeCheckbox1Value: selected,
      treeCheckbox2Value: selected,
      treeCheckbox3Value: selected,
    }, this.changeIndeterminateTree);
  };

  private changeIndeterminateTree = () => {
    const {
      treeCheckbox1Value,
      treeCheckbox2Value,
      treeCheckbox3Value,
    } = this.state;
    const statesArray: boolean[] = [treeCheckbox1Value, treeCheckbox2Value, treeCheckbox3Value];
    const everyChecked: boolean = statesArray.every((value: boolean) => value);
    const someChecked: boolean = statesArray.some((value: boolean) => value);
    const everyUnchecked: boolean = statesArray.every((value: boolean) => !value);

    if (someChecked && !everyChecked) {
      this.setState({ isIndeterminateTree: true });
    } else if (everyChecked) {
      this.setState({
        isIndeterminateTree: false,
        indeterminateValue: true,
      });
    } else if (everyUnchecked) {
      this.setState({
        isIndeterminateTree: false,
        indeterminateValue: false,
      });
    }
  };

  private onTreeCheckbox1ValueChange = (selected: boolean) => {
    this.setState({ treeCheckbox1Value: selected }, this.changeIndeterminateTree);
  };

  private onTreeCheckbox2ValueChange = (selected: boolean) => {
    this.setState({ treeCheckbox2Value: selected }, this.changeIndeterminateTree);
  };

  private onTreeCheckbox3ValueChange = (selected: boolean) => {
    this.setState({ treeCheckbox3Value: selected }, this.changeIndeterminateTree);
  };

  private onIndeterminateSingle = (selected: boolean, indeterminate: boolean) => {
    this.setState({
      indeterminateSingleValue: selected,
      isIndeterminateSingle: indeterminate,
    });
  };

  public render(): React.ReactNode {
    return (
      <View style={this.props.themedStyle.container}>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Interactive</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBoxPrimaryChecked}
              status='primary'
              onChange={this.onCheckBoxPrimaryChange}
            />
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBoxSuccessChecked}
              status='success'
              onChange={this.onCheckBoxSuccessChange}
            />
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBoxWarningChecked}
              status='warning'
              onChange={this.onCheckBoxWarningChange}
            />
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBoxDangerChecked}
              status='danger'
              onChange={this.onCheckBoxDangerChange}
            />
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBoxInfoChecked}
              status='info'
              onChange={this.onCheckBoxInfoChange}
            />
            <View style={this.props.themedStyle.whiteContainer}>
              <CheckBoxComponent
                style={this.props.themedStyle.component}
                checked={this.state.isCheckBoxWhiteChecked}
                status='white'
                onChange={this.onCheckBoxWhiteChange}
              />
            </View>
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBoxDisabled1Checked}
              disabled={true}
              onChange={this.onCheckBoxDisabled1Change}
            />
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBoxDisabled2Checked}
              disabled={true}
              onChange={this.onCheckBoxDisabled2Change}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Text</Text>
          <View style={this.props.themedStyle.containerPreviewColumn}>
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              status={STATUS}
              text='Place your text'
            />
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={true}
              status={STATUS}
              text='Place your text'
            />
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              disabled={true}
              status={STATUS}
              text='Place your text'
            />
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={true}
              disabled={true}
              status={STATUS}
              text='Place your text'
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Indeterminate Tree</Text>
          <View style={this.props.themedStyle.containerPreviewColumn}>
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={this.state.indeterminateValue}
              status={STATUS}
              isIndeterminate={this.state.isIndeterminateTree}
              onChange={this.onIndeterminateValue}
            />
            <View style={this.props.themedStyle.treeContainer}>
              <CheckBoxComponent
                style={this.props.themedStyle.component}
                checked={this.state.treeCheckbox1Value}
                status={STATUS}
                onChange={this.onTreeCheckbox1ValueChange}
              />
              <CheckBoxComponent
                style={this.props.themedStyle.component}
                checked={this.state.treeCheckbox2Value}
                status={STATUS}
                onChange={this.onTreeCheckbox2ValueChange}
              />
              <CheckBoxComponent
                style={this.props.themedStyle.component}
                checked={this.state.treeCheckbox3Value}
                status={STATUS}
                onChange={this.onTreeCheckbox3ValueChange}
              />
            </View>
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Indeterminate Single</Text>
          <View style={this.props.themedStyle.containerPreviewColumn}>
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={this.state.indeterminateSingleValue}
              status={STATUS}
              isIndeterminate={this.state.isIndeterminateSingle}
              onChange={this.onIndeterminateSingle}
            />
          </View>
        </View>
      </View>
    );
  }
}

export const CheckBoxScreen = withStyles(CheckBox, (theme: ThemeType) => ({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  containerSection: {
    marginVertical: 16,
  },
  containerPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  containerPreviewColumn: {
    marginTop: 4,
  },
  textDescription: {
    fontSize: 18,
  },
  component: {
    margin: 4,
  },
  treeContainer: {
    marginLeft: 16,
  },
  whiteContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#DDE1EB',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
