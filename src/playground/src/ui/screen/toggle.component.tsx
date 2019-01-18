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
import { Toggle as ToggleComponent } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  toggle1Checked: boolean;
  toggle2Checked: boolean;
  toggle3Checked: boolean;
  toggle4Checked: boolean;
}

class Toggle extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Toggle',
  };

  state: State = {
    toggle1Checked: false,
    toggle2Checked: true,
    toggle3Checked: false,
    toggle4Checked: true,
  };

  onToggle1Change = () => {
    this.setState({ toggle1Checked: !this.state.toggle1Checked });
  };

  onToggle2Change = () => {
    this.setState({ toggle2Checked: !this.state.toggle2Checked });
  };

  onToggle3Change = () => {
    this.setState({ toggle3Checked: !this.state.toggle3Checked });
  };

  onToggle4Change = () => {
    this.setState({ toggle4Checked: !this.state.toggle4Checked });
  };

  render() {
    return (
      <View style={this.props.themedStyle.container}>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Interactive</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <ToggleComponent
              value={this.state.toggle1Checked}
              onValueChange={this.onToggle1Change}
              style={this.props.themedStyle.component}
            />
            <ToggleComponent
              value={this.state.toggle2Checked}
              onValueChange={this.onToggle2Change}
              style={this.props.themedStyle.component}
            />
            <ToggleComponent
              value={this.state.toggle3Checked}
              onValueChange={this.onToggle3Change}
              disabled={true}
              style={this.props.themedStyle.component}
            />
            <ToggleComponent
              value={this.state.toggle4Checked}
              onValueChange={this.onToggle4Change}
              disabled={true}
              style={this.props.themedStyle.component}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Error</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <ToggleComponent
              status='error'
              style={this.props.themedStyle.component}
            />
            <ToggleComponent
              status='error'
              style={this.props.themedStyle.component}
              value={true}
            />
            <ToggleComponent
              status='error'
              style={this.props.themedStyle.component}
              disabled={true}
            />
            <ToggleComponent
              status='error'
              style={this.props.themedStyle.component}
              value={true}
              disabled={true}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Size</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <ToggleComponent
              size='big'
              style={this.props.themedStyle.component}
              value={true}
            />
            <ToggleComponent
              style={this.props.themedStyle.component}
              value={true}
            />
            <ToggleComponent
              size='small'
              style={this.props.themedStyle.component}
              value={true}
            />
          </View>
        </View>
      </View>
    )
  }

}

export const ToggleScreen = withStyles(Toggle, (theme: ThemeType) => ({
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
