import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  RkCalendar,
  RkRangedCalendar,
  RkStyleSheet,
} from 'react-native-ui-kitten';

export class CalendarScreen extends React.Component {
  onDaySelect = (date) => {
  };

  getBounds = () => {
    const now = new Date();
    return {
      min: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
      max: new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()),
    };
  };

  getTextStyle = (state) => {
    const containerBaseStyle = state.isToday ? [styles.container, styles.containerToday] : styles.container;
    const containerSelectedStyle = state.isBetweenRangeBounds ? styles.containerSelectedBetween : styles.containerSelected;
    const textBaseStyle = state.isToday ? [styles.text, styles.textToday] : styles.text;
    return {
      container: {
        base: containerBaseStyle,
        selected: state.isSelected ? containerSelectedStyle : null,
        disabled: state.isDisabled ? styles.containerDisabled : null,
      },
      text: {
        base: textBaseStyle,
        selected: state.isSelected ? styles.textSelected : null,
        disabled: state.isDisabled ? styles.textDisabled : null,
      },
    };
  };

  renderDay = (date, state) => {
    const { container, text } = this.getTextStyle(state);
    const revenue = date === null ? 0 : (date.getDate() + 100) * date.getDate();
    return (
      <View style={[container.base, container.selected, container.disabled]}>
        <Text style={[text.base, text.selected, text.disabled]}>
          {state.isEmpty ? '' : date.getDate()}
        </Text>
        <Text style={[text.base, text.selected, text.disabled]}>{`${revenue}$`}</Text>
      </View>
    );
  };

  render = () => {
    const bounds = this.getBounds();
    return (
      <RkRangedCalendar
        min={bounds.min}
        max={bounds.max}
        boundingMonth={false}
        renderDay={this.renderDay}
        onSelect={this.onDaySelect}
      />
    );
  };
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 8,
  },
  containerToday: {
    backgroundColor: theme.colors.highlight,
  },
  containerSelected: {
    backgroundColor: theme.colors.button.success,
    borderRadius: 4,
  },
  containerSelectedBetween: {
    backgroundColor: theme.colors.button.success,
    opacity: 0.25,
    borderRadius: 0,
  },
  containerDisabled: {
    opacity: 0.25,
  },
  text: {
    color: theme.colors.text.base,
    fontWeight: '300',
  },
  textToday: {
    fontWeight: 'bold',
  },
  textSelected: {
    color: theme.colors.text.inverse,
    fontWeight: 'bold',
  },
  textDisabled: {
  },
}));
