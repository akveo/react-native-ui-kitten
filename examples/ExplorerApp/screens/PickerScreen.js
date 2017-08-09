import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
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
      pickedValue: [0, 0, 0]
    };
    this.hidePicker = this.hidePicker.bind(this)
    this.handlePickedValue = this.handlePickedValue.bind(this)
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
    let months = this.generateArrayFromRange(1, 12);
    let years = this.generateArrayFromRange(1985, 2025);
    return (
      <ScrollView
        style={UtilStyles.container}
        automaticallyAdjustContentInsets={true}>
        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Picker Examples</RkText>
          <View style={UtilStyles.columnContainer}>
            <View style={styles.componentRow}>
              <TouchableHighlight onPress={() => this.showPicker()}>
                <Text>
                  {days[this.state.pickedValue[0]]}.
                  {months[this.state.pickedValue[1]]}.
                  {years[this.state.pickedValue[2]]}
                </Text>
              </TouchableHighlight>
              <RkPicker rkType='rounded'
                        title='Set Date'
                        data={[days, months, years]}
                        visible={this.state.pikerVisible}
                        onConfirm={this.handlePickedValue}
                        onCancel={this.hidePicker}
                        optionNumberOnPicker={5}
                        selectedIndexes={this.state.pickedValue}/>
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
