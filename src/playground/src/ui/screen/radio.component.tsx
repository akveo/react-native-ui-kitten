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
  isRadio1Selected: boolean;
  isRadio2Selected: boolean;
  isRadio3Selected: boolean;
  isRadio4Selected: boolean;
}

class Radio extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Radio',
  };

  state: State = {
    isRadio1Selected: false,
    isRadio2Selected: true,
    isRadio3Selected: false,
    isRadio4Selected: true,
  };

  onRadio1Change = (selected: boolean) => {
    this.setState({ isRadio1Selected: !this.state.isRadio1Selected });
  };

  onRadio2Change = (selected: boolean) => {
    this.setState({ isRadio2Selected: !this.state.isRadio2Selected });
  };

  onRadio3Change = (selected: boolean) => {
    this.setState({ isRadio3Selected: !this.state.isRadio3Selected });
  };

  onRadio4Change = (selected: boolean) => {
    this.setState({ isRadio4Selected: !this.state.isRadio4Selected });
  };

  render() {
    return (
      <View style={this.props.themedStyle.container}>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Interactive</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <RadioComponent onChange={this.onRadio1Change} selected={this.state.isRadio1Selected}/>
            <RadioComponent onChange={this.onRadio2Change} selected={this.state.isRadio2Selected}/>
            <RadioComponent onChange={this.onRadio3Change} selected={this.state.isRadio3Selected} disabled={true}/>
            <RadioComponent onChange={this.onRadio4Change} selected={this.state.isRadio4Selected} disabled={true}/>
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Small</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <RadioComponent variant='small'/>
            <RadioComponent variant='small' selected={true}/>
            <RadioComponent variant='small' disabled={true}/>
            <RadioComponent variant='small' selected={true} disabled={true}/>
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Default</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <RadioComponent/>
            <RadioComponent selected={true}/>
            <RadioComponent disabled={true}/>
            <RadioComponent selected={true} disabled={true}/>
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Large</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <RadioComponent variant='large'/>
            <RadioComponent variant='large' selected={true}/>
            <RadioComponent variant='large' disabled={true}/>
            <RadioComponent variant='large' selected={true} disabled={true}/>
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
    fontSize: 20,
  },
}));
