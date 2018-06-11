import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import {
  RkText,
  RkSeparator,
  RkPicker
} from 'react-native-ui-kitten';
import {UtilStyles} from '../style/styles';


export class PickerScreen extends React.Component {
  static navigationOptions = {
    title: 'Selectable components'
  };

  constructor(props) {
    super(props);
    this.state = {
      settingsOption: {
        index: 0,
        name: 'Option 1'
      },
      pikerVisible: false,
      pickedValue: [{key: 8, value: 'Aug'}, 26, 2017]
    };
    this.hidePicker = this.hidePicker.bind(this);
    this.handlePickedValue = this.handlePickedValue.bind(this);
  }

  showPicker() {
    this.setState({pikerVisible: true})
  };

  hidePicker() {
    this.setState({pikerVisible: false});
  }

  handlePickedValue(date) {
    this.setState({pickedValue: date});
    this.hidePicker();
  };

  generateArrayFromRange(start, finish) {
    return Array.apply(null, Array(finish - start + 1)).map((_, i) => start + i);
  }

  render() {
    let days = this.generateArrayFromRange(1, 31);
    let years = this.generateArrayFromRange(1985, 2025);
    let months = [
      {key: 1, value: 'Jun'}, {key: 2, value: 'Feb'},
      {key: 3, value: 'Mar'}, {key: 4, value: 'Apr'},
      {key: 5, value: 'May'}, {key: 6, value: 'Jun'},
      {key: 7, value: 'Jul'}, {key: 8, value: 'Aug'},
      {key: 9, value: 'Sep'}, {key: 10, value: 'Oct'},
      {key: 11, value: 'Nov'}, {key: 12, value: 'Dec'},
    ];
    return (
      <ScrollView
        style={UtilStyles.container}
        automaticallyAdjustContentInsets={true}>
        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Picker Examples</RkText>
          <View style={UtilStyles.columnContainer}>
            <View style={styles.componentRow}>
              <TouchableOpacity onPress={() => this.showPicker()}>
                <Text>
                  {this.state.pickedValue[0].value}.
                  {this.state.pickedValue[1]}.
                  {this.state.pickedValue[2]}
                </Text>
              </TouchableOpacity>
              <RkPicker
                title='Set Date'
                data={[months, days, years]}
                visible={this.state.pikerVisible}
                onConfirm={this.handlePickedValue}
                onCancel={this.hidePicker}
                selectedOptions={this.state.pickedValue}/>
              <RkText rkType='bold' style={styles.caption}>Date Picker</RkText>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  componentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25
  },
  caption: {
    marginLeft: 16
  }
});
