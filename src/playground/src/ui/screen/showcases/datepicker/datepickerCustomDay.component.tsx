import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Datepicker,
  Text,
} from 'react-native-ui-kitten';

export class DatepickerCustomDayShowcase extends React.Component {

  state = {
    date: new Date(),
  };

  onSelect = (date) => {
    this.setState({ date });
  };

  renderDay = ({ date }, style) => (
    <View
      style={[styles.container, style.container]}>
      <Text style={style.text}>{`${date.getDate()}`}</Text>
      <Text style={[style.text, styles.value]}>
        {`${100 * date.getDate() + Math.pow(date.getDate(), 2)}$`}
      </Text>
    </View>
  );

  render() {
    return (
      <Datepicker
        date={this.state.date}
        onSelect={this.onSelect}
        renderDay={this.renderDay}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
  },
  value: {
    fontSize: 12,
    fontWeight: '400',
  },
});
