import React, {Component} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {UtilStyles} from '../style/styles';
import {
  RkText,
  RkChoiceGroup,
  RkChoice,
  RkTheme
} from 'react-native-ui-kitten';

export class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings example'
  };

  constructor(props) {
    super(props);
    this.state = {
      options: [
        {
          index: 0,
          name: 'Option 1'
        },
        {
          index: 1,
          name: 'Option 2'
        },
        {
          index: 2,
          name: 'Option 3'
        }
      ]
    }
  }

  render() {
    const {params} = this.props.navigation.state;
    let renderOption = (option, i) => (
      <View key={i}>
        <TouchableOpacity choiceTrigger>
          <View style={styles.checkRow}>
            <RkText rkType='bold'>{option.name}</RkText>
            <RkChoice rkType='clear'/>
          </View>
        </TouchableOpacity>
      </View>);

    return (
      <ScrollView
        style={UtilStyles.container}
        automaticallyAdjustContentInsets={true}>

        <View style={[UtilStyles.section,]}>
          <RkChoiceGroup selectedIndex={params.option.index} radio rkType='stretch'
                         onChange={(index) => params.onChange(this.state.options[index])}>
            {this.state.options.map(renderOption)}
          </RkChoiceGroup>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  checkRow: {
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 16,
    paddingLeft: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: RkTheme.current.colors.border.base
  },
});