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
  RkPicker,
} from 'react-native-ui-kitten';
import { UtilStyles } from '../style/styles';


export class PickerScreen extends React.Component {
  static navigationOptions = {
    title: 'Selectable components',
  };

  state = {
    pickerVisible: false,
    pickedValue: [{ key: 8, value: 'Aug' }, 26, 2017],
  };

  constructor(props) {
    super(props);
    this.pickerItems = {
      days: this.generateArrayFromRange(1, 31),
      months: [
        { key: 1, value: 'Jun' },
        { key: 2, value: 'Feb' },
        { key: 3, value: 'Mar' },
        { key: 4, value: 'Apr' },
        { key: 5, value: 'May' },
        { key: 6, value: 'Jun' },
        { key: 7, value: 'Jul' },
        { key: 8, value: 'Aug' },
        { key: 9, value: 'Sep' },
        { key: 10, value: 'Oct' },
        { key: 11, value: 'Nov' },
        { key: 12, value: 'Dec' },
      ],
      years: this.generateArrayFromRange(1985, 2025),
    };
  }

  onDateTouchablePress = () => {
    this.setState({ pickerVisible: true });
  };

  onPickerCancelButtonPress = () => {
    this.setState({ pickerVisible: false });
  };

  onPickerConfirmButtonPress = (value) => {
    this.setState({
      pickedValue: value,
      pickerVisible: false,
    });
  };

  // eslint-disable-next-line arrow-body-style
  generateArrayFromRange = (start, finish) => {
    return Array(...Array((finish - start) + 1)).map((_, i) => start + i);
  };

  render() {
    return (
      <ScrollView
        style={UtilStyles.container}
        automaticallyAdjustContentInsets={true}>
        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Picker Examples</RkText>
          <View style={UtilStyles.columnContainer}>
            <View style={styles.componentRow}>
              <TouchableOpacity onPress={this.onDateTouchablePress}>
                <Text>
                  {this.state.pickedValue[0].value}.
                  {this.state.pickedValue[1]}.
                  {this.state.pickedValue[2]}
                </Text>
              </TouchableOpacity>
              <RkPicker
                title='Set Date'
                data={[this.pickerItems.months, this.pickerItems.days, this.pickerItems.years]}
                selectedOptions={this.state.pickedValue}
                visible={this.state.pickerVisible}
                onConfirm={this.onPickerConfirmButtonPress}
                onCancel={this.onPickerCancelButtonPress}
              />
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
    marginBottom: 25,
  },
  caption: {
    marginLeft: 16,
  },
});
