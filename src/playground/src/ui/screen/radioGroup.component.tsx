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
import {
  RadioGroup as RadioGroupComponent,
  Radio as RadioComponent,
} from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  selectedIndexGroup1: number;
  selectedIndexGroup2: number;
  selectedIndexGroup3: number;
}

class RadioGroup extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Radio Group',
  };

  state: State = {
    selectedIndexGroup1: 0,
    selectedIndexGroup2: 0,
    selectedIndexGroup3: 0,
  };

  private onGroup1SelectionChange = (index: number) => {
    this.setState({
      selectedIndexGroup1: index,
    });
  };

  private onGroup2SelectionChange = (index: number) => {
    this.setState({
      selectedIndexGroup2: index,
    });
  };

  private onGroup3SelectionChange = (index: number) => {
    this.setState({
      selectedIndexGroup3: index,
    });
  };

  render() {
    return (
      <View style={this.props.themedStyle.container}>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Vertical</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <RadioGroupComponent
              selectedIndex={this.state.selectedIndexGroup2}
              onChange={this.onGroup2SelectionChange}>
              <RadioComponent style={this.props.themedStyle.component}/>
              <RadioComponent style={this.props.themedStyle.component}/>
            </RadioGroupComponent>
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Horizontal</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <RadioGroupComponent
              style={{ flexDirection: 'row' }}
              selectedIndex={this.state.selectedIndexGroup1}
              onChange={this.onGroup1SelectionChange}>
              <RadioComponent style={this.props.themedStyle.component}/>
              <RadioComponent style={this.props.themedStyle.component}/>
            </RadioGroupComponent>
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Error</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <RadioGroupComponent
              selectedIndex={this.state.selectedIndexGroup3}
              onChange={this.onGroup3SelectionChange}>
              <RadioComponent
                style={this.props.themedStyle.component}
                status='error'
                size='small'
              />
              <RadioComponent
                style={this.props.themedStyle.component}
                status='error'
              />
              <RadioComponent
                style={this.props.themedStyle.component}
                status='error'
                size='big'
              />
            </RadioGroupComponent>
          </View>
        </View>
      </View>
    );
  }
}

export const RadioGroupScreen = withStyles(RadioGroup, (theme: ThemeType) => ({
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
    margin: 4,
  },
}));

