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
  RadioGroup,
  Radio,
} from '@kitten/ui';

type Props = & ThemedComponentProps & NavigationScreenProps;

interface State {
  selectedIndexGroup1: number;
  selectedIndexGroup2: number;
  selectedIndexGroup3: number;
}

class RadioGroupScreen extends React.Component<Props, State> {

  static navigationOptions = {
    title: 'Radio Group',
  };

  public state: State = {
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

  public render(): React.ReactNode {
    return (
      <View style={this.props.themedStyle.container}>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Vertical</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <RadioGroup
              selectedIndex={this.state.selectedIndexGroup2}
              onChange={this.onGroup2SelectionChange}>
              <Radio style={this.props.themedStyle.component}/>
              <Radio style={this.props.themedStyle.component}/>
            </RadioGroup>
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Horizontal</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <RadioGroup
              style={{ flexDirection: 'row' }}
              selectedIndex={this.state.selectedIndexGroup1}
              onChange={this.onGroup1SelectionChange}>
              <Radio style={this.props.themedStyle.component}/>
              <Radio style={this.props.themedStyle.component}/>
            </RadioGroup>
          </View>
        </View>
        <View style={this.props.themedStyle.containerSection}>
          <Text style={this.props.themedStyle.textDescription}>Danger</Text>
          <View style={this.props.themedStyle.containerPreview}>
            <RadioGroup
              selectedIndex={this.state.selectedIndexGroup3}
              onChange={this.onGroup3SelectionChange}>
              <Radio
                style={this.props.themedStyle.component}
                status='danger'
                size='small'
              />
              <Radio
                style={this.props.themedStyle.component}
                status='danger'
              />
              <Radio
                style={this.props.themedStyle.component}
                status='danger'
                size='large'
              />
            </RadioGroup>
          </View>
        </View>
      </View>
    );
  }
}

export default withStyles(RadioGroupScreen, (theme: ThemeType) => ({
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

