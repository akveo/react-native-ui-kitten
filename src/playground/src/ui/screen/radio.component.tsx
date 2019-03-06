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
import { Radio as RadioComponent } from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  isRadio1Checked: boolean;
  isRadio2Checked: boolean;
  isRadio3Checked: boolean;
  isRadio4Checked: boolean;
}

class Radio extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Radio',
  };

  public state: State = {
    isRadio1Checked: false,
    isRadio2Checked: true,
    isRadio3Checked: false,
    isRadio4Checked: true,
  };

  private onRadio1Change = (selected: boolean) => {
    this.setState({ isRadio1Checked: selected });
  };

  private onRadio2Change = (selected: boolean) => {
    this.setState({ isRadio2Checked: selected });
  };

  private onRadio3Change = (selected: boolean) => {
    this.setState({ isRadio3Checked: selected });
  };

  private onRadio4Change = (selected: boolean) => {
    this.setState({ isRadio4Checked: selected });
  };

  public render(): React.ReactNode {
    return (
      <View style={this.props.themedStyle.container}>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Interactive</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <RadioComponent
              style={this.props.themedStyle.component}
              checked={this.state.isRadio1Checked}
              onChange={this.onRadio1Change}
            />
            <RadioComponent
              style={this.props.themedStyle.component}
              checked={this.state.isRadio2Checked}
              onChange={this.onRadio2Change}
            />
            <RadioComponent
              style={this.props.themedStyle.component}
              checked={this.state.isRadio3Checked}
              disabled={true}
              onChange={this.onRadio3Change}
            />
            <RadioComponent
              style={this.props.themedStyle.component}
              checked={this.state.isRadio4Checked}
              disabled={true}
              onChange={this.onRadio4Change}
            />
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Error</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <RadioComponent
              status='error'
              style={this.props.themedStyle.component}
            />
            <RadioComponent
              status='error'
              style={this.props.themedStyle.component}
              checked={true}
            />
            <RadioComponent
              status='error'
              style={this.props.themedStyle.component}
              disabled={true}
            />
            <RadioComponent
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
            <RadioComponent
              size='large'
              style={this.props.themedStyle.component}
              checked={true}
            />
            <RadioComponent
              style={this.props.themedStyle.component}
              checked={true}
            />
            <RadioComponent
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

export const RadioScreen = withStyles(Radio, (theme: ThemeType) => ({
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
