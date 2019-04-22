import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
} from '@kitten/theme';
import { Toggle } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  toggle1Checked: boolean;
  toggle2Checked: boolean;
  toggle3Checked: boolean;
  toggle4Checked: boolean;
  toggleErrorChecked: boolean;
}

class ToggleScreen extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Toggle',
  };

  public state: State = {
    toggle1Checked: false,
    toggle2Checked: true,
    toggle3Checked: false,
    toggle4Checked: true,
    toggleErrorChecked: false,
  };

  private onToggle1Change = (checked: boolean) => {
    this.setState({ toggle1Checked: checked });
  };

  private onToggle2Change = (checked: boolean) => {
    this.setState({ toggle2Checked: checked });
  };

  private onToggle3Change = (checked: boolean) => {
    this.setState({ toggle3Checked: checked });
  };

  private onToggle4Change = (checked: boolean) => {
    this.setState({ toggle4Checked: checked });
  };

  private onToggleErrorChange = (checked: boolean) => {
    this.setState({ toggleErrorChecked: checked });
  };

  public render(): React.ReactNode {
    return (
      <View style={this.props.themedStyle.container}>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Primary</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <Toggle
              style={this.props.themedStyle.component}
              checked={this.state.toggle1Checked}
              onChange={this.onToggle1Change}
            />
            <Toggle
              style={this.props.themedStyle.component}
              checked={this.state.toggle2Checked}
              onChange={this.onToggle2Change}
            />
            <Toggle
              style={this.props.themedStyle.component}
              checked={this.state.toggle3Checked}
              onChange={this.onToggle3Change}
              disabled={true}
            />
            <Toggle
              style={this.props.themedStyle.component}
              checked={this.state.toggle4Checked}
              onChange={this.onToggle4Change}
              disabled={true}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Danger</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <Toggle
              style={this.props.themedStyle.component}
              status='danger'
              checked={this.state.toggleErrorChecked}
              onChange={this.onToggleErrorChange}
            />
            <Toggle
              style={this.props.themedStyle.component}
              status='danger'
              checked={true}
            />
            <Toggle
              style={this.props.themedStyle.component}
              status='danger'
              disabled={true}
            />
            <Toggle
              style={this.props.themedStyle.component}
              status='danger'
              checked={true}
              disabled={true}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Success</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <Toggle
              style={this.props.themedStyle.component}
              status='success'
              checked={this.state.toggleErrorChecked}
              onChange={this.onToggleErrorChange}
            />
            <Toggle
              style={this.props.themedStyle.component}
              status='success'
              checked={true}
            />
            <Toggle
              style={this.props.themedStyle.component}
              status='success'
              disabled={true}
            />
            <Toggle
              style={this.props.themedStyle.component}
              status='success'
              checked={true}
              disabled={true}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Warning</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <Toggle
              style={this.props.themedStyle.component}
              status='warning'
              checked={this.state.toggleErrorChecked}
              onChange={this.onToggleErrorChange}
            />
            <Toggle
              style={this.props.themedStyle.component}
              status='warning'
              checked={true}
            />
            <Toggle
              style={this.props.themedStyle.component}
              status='warning'
              disabled={true}
            />
            <Toggle
              style={this.props.themedStyle.component}
              status='warning'
              checked={true}
              disabled={true}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Info</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <Toggle
              style={this.props.themedStyle.component}
              status='info'
              checked={this.state.toggleErrorChecked}
              onChange={this.onToggleErrorChange}
            />
            <Toggle
              style={this.props.themedStyle.component}
              status='info'
              checked={true}
            />
            <Toggle
              style={this.props.themedStyle.component}
              status='info'
              disabled={true}
            />
            <Toggle
              style={this.props.themedStyle.component}
              status='info'
              checked={true}
              disabled={true}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Size</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <Toggle
              style={this.props.themedStyle.component}
              size='small'
              checked={true}
            />
            <Toggle
              style={this.props.themedStyle.component}
              checked={true}
            />
            <Toggle
              style={this.props.themedStyle.component}
              size='large'
              checked={true}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default withStyles(ToggleScreen, (theme: ThemeType) => ({
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
