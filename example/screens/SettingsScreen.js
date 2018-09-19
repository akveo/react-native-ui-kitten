import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  RkText,
  RkChoiceGroup,
  RkChoice,
  RkTheme,
} from 'react-native-ui-kitten';
import { UtilStyles } from '../style/styles';

export class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings example',
  };
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: navigationParamsType,
      }).isRequired,
    }).isRequired,
  };

  options = [
    {
      index: 0,
      name: 'Option 1',
    }, {
      index: 1,
      name: 'Option 2',
    }, {
      index: 2,
      name: 'Option 3',
    },
  ];

  onChoiceGroupValueChange = (index) => {
    this.props.navigation.state.params.onChange(this.options[index]);
  };

  renderOption = (item, index) => (
    <View key={index}>
      <TouchableOpacity choiceTrigger={true}>
        <View style={styles.checkRow}>
          <RkText rkType='bold'>{item.name}</RkText>
          <RkChoice rkType='clear' />
        </View>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <ScrollView
        style={UtilStyles.container}
        automaticallyAdjustContentInsets={true}>
        <View style={[UtilStyles.section]}>
          <RkChoiceGroup
            rkType='stretch'
            selectedIndex={this.props.navigation.state.params.option.index}
            radio={true}
            onChange={this.onChoiceGroupValueChange}>
            {this.options.map(this.renderOption)}
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
    borderColor: RkTheme.current.colors.border.base,
  },
});

const navigationParamsType = PropTypes.shape({
  option: PropTypes.shape({
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
});
