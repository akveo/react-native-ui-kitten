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

  private onCheckBox1Change = (checked: boolean) => {
    this.setState({ isCheckBox1Checked: checked });
  };

  private onCheckBox2Change = (checked: boolean) => {
    this.setState({ isCheckBox2Checked: checked });
  };

  private onCheckBox3Change = (checked: boolean) => {
    this.setState({ isCheckBox3Checked: checked });
  };

  private onCheckBox4Change = (checked: boolean) => {
    this.setState({ isCheckBox4Checked: checked });
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
              onChange={this.onCheckBox1Change}
            />
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBox2Checked}
              onChange={this.onCheckBox2Change}
            />
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBox3Checked}
              disabled={true}
              onChange={this.onCheckBox3Change}
            />
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={this.state.isCheckBox4Checked}
              disabled={true}
              onChange={this.onCheckBox4Change}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Error</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <CheckBoxComponent
              status='error'
              style={this.props.themedStyle.component}
            />
            <CheckBoxComponent
              status='error'
              style={this.props.themedStyle.component}
              checked={true}
            />
            <CheckBoxComponent
              status='error'
              style={this.props.themedStyle.component}
              disabled={true}
            />
            <CheckBoxComponent
              status='error'
              style={this.props.themedStyle.component}
              checked={true}
              disabled={true}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Size</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <CheckBoxComponent
              size='big'
              style={this.props.themedStyle.component}
              checked={true}
            />
            <CheckBoxComponent
              style={this.props.themedStyle.component}
              checked={true}
            />
            <CheckBoxComponent
              size='small'
              style={this.props.themedStyle.component}
              checked={true}
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
  textDescription: {
    fontSize: 18,
  },
  component: {
    marginHorizontal: 4,
  },
}));
