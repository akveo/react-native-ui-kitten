import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import { CheckBox } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  isCheckBoxIndeterminateIndeterminate: boolean;
  isCheckBoxIndeterminateChecked: boolean;
  isCheckBoxPrimaryChecked: boolean;
  isCheckBoxSuccessChecked: boolean;
  isCheckBoxWarningChecked: boolean;
  isCheckBoxDangerChecked: boolean;
  isCheckBoxInfoChecked: boolean;
  isCheckBoxWhiteChecked: boolean;
}

class CheckBoxScreen extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'CheckBox',
  };

  public state: State = {
    isCheckBoxIndeterminateIndeterminate: true,
    isCheckBoxIndeterminateChecked: true,
    isCheckBoxPrimaryChecked: true,
    isCheckBoxSuccessChecked: true,
    isCheckBoxWarningChecked: true,
    isCheckBoxDangerChecked: true,
    isCheckBoxInfoChecked: true,
    isCheckBoxWhiteChecked: true,
  };

  private onIndeterminateChange = (selected: boolean, indeterminate: boolean) => {
    this.setState({
      isCheckBoxIndeterminateChecked: selected,
      isCheckBoxIndeterminateIndeterminate: indeterminate,
    });
  };

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

  public render(): React.ReactNode {
    return (
      <View style={this.props.themedStyle.container}>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Indeterminate</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <CheckBox
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBoxIndeterminateChecked}
              indeterminate={this.state.isCheckBoxIndeterminateIndeterminate}
              onChange={this.onIndeterminateChange}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Status</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <CheckBox
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBoxPrimaryChecked}
              status='primary'
              onChange={this.onCheckBoxPrimaryChange}
            />
            <CheckBox
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBoxSuccessChecked}
              status='success'
              onChange={this.onCheckBoxSuccessChange}
            />
            <CheckBox
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBoxInfoChecked}
              status='info'
              onChange={this.onCheckBoxInfoChange}
            />
            <CheckBox
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBoxWarningChecked}
              status='warning'
              onChange={this.onCheckBoxWarningChange}
            />
            <CheckBox
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBoxDangerChecked}
              status='danger'
              onChange={this.onCheckBoxDangerChange}
            />
            <CheckBox
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBoxWhiteChecked}
              status='white'
              onChange={this.onCheckBoxWhiteChange}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Size</Text>
          <View style={this.props.themedStyle.containerPreviewColumn}>
            <CheckBox
              style={this.props.themedStyle.component}
              size='giant'
              checked={true}
              text='Place your text'
            />
            <CheckBox
              style={this.props.themedStyle.component}
              size='large'
              checked={true}
              text='Place your text'
            />
            <CheckBox
              style={this.props.themedStyle.component}
              size='medium'
              checked={true}
              text='Place your text'
            />
            <CheckBox
              style={this.props.themedStyle.component}
              size='small'
              checked={true}
              text='Place your text'
            />
            <CheckBox
              style={this.props.themedStyle.component}
              size='tiny'
              checked={true}
              text='Place your text'
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Text</Text>
          <View style={this.props.themedStyle.containerPreviewColumn}>
            <CheckBox
              style={this.props.themedStyle.component}
              text='Place your text'
            />
            <CheckBox
              style={this.props.themedStyle.component}
              checked={true}
              text='Place your text'
            />
            <CheckBox
              style={this.props.themedStyle.component}
              disabled={true}
              text='Place your text'
            />
            <CheckBox
              style={this.props.themedStyle.component}
              checked={true}
              disabled={true}
              text='Place your text'
            />
          </View>
        </View>
      </View>
    );
  }
}

export default withStyles(CheckBoxScreen, (theme: ThemeType) => ({
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
}));
