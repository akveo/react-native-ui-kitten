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
} from '@rk-kit/theme';
import { Radio as RadioComponent } from '@rk-kit/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  isRadio1Checked: boolean;
  isRadio2Checked: boolean;
  isRadio3Checked: boolean;
  isRadio4Checked: boolean;
  variant: string;
}

class Radio extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Radio',
  };

  state: State = {
    isRadio1Checked: false,
    isRadio2Checked: true,
    isRadio3Checked: false,
    isRadio4Checked: true,
    variant: 'default',
  };

  onRadio1Change = (selected: boolean) => {
    this.setState({ isRadio1Checked: !selected });
  };

  onRadio2Change = (selected: boolean) => {
    this.setState({ isRadio2Checked: !selected });
  };

  onRadio3Change = (selected: boolean) => {
    this.setState({ isRadio3Checked: !selected });
  };

  onRadio4Change = (selected: boolean) => {
    this.setState({ isRadio4Checked: !selected });
  };

  render() {
    return (
      <View style={this.props.themedStyle.container}>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Default</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <RadioComponent
              style={this.props.themedStyle.component}
              appearance='bold'
              status='info'
              size='small'
              checked={this.state.isRadio1Checked}
              onChange={this.onRadio1Change}
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
    marginTop: 4,
  },
  textDescription: {
    fontSize: 18,
  },
  component: {
    marginHorizontal: 4,
  },
}));
