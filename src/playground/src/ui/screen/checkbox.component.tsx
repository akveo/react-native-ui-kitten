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
  isCheckBox1Checked: boolean;
  isCheckBox2Checked: boolean;
  isCheckBox3Checked: boolean;
  isCheckBox4Checked: boolean;
}

const STATUS: string = '';

class CheckBox extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'CheckBox',
  };

  public state: State = {
    isCheckBox1Checked: false,
    isCheckBox2Checked: true,
    isCheckBox3Checked: false,
    isCheckBox4Checked: true,
  };

  private onCheckBox1Change = (selected: boolean) => {
    this.setState({ isCheckBox1Checked: selected });
  };

  private onCheckBox2Change = (selected: boolean) => {
    this.setState({ isCheckBox2Checked: selected });
  };

  private onCheckBox3Change = (selected: boolean) => {
    this.setState({ isCheckBox3Checked: selected });
  };

  private onCheckBox4Change = (selected: boolean) => {
    this.setState({ isCheckBox4Checked: selected });
  };

  public render(): React.ReactNode {
    return (
      <View style={this.props.themedStyle.container}>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Interactive</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBox1Checked}
              status={STATUS}
              onChange={this.onCheckBox1Change}
            />
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBox2Checked}
              status={STATUS}
              onChange={this.onCheckBox2Change}
            />
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBox3Checked}
              disabled={true}
              status={STATUS}
              onChange={this.onCheckBox3Change}
            />
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBox4Checked}
              disabled={true}
              status={STATUS}
              onChange={this.onCheckBox4Change}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Size</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={true}
              status={STATUS}
              size='large'
            />
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={true}
              status={STATUS}
              size='medium'
            />
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={true}
              status={STATUS}
              size='small'
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
}));
