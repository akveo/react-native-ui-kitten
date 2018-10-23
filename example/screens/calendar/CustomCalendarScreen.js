import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  RkCalendar,
  RkStyleSheet,
} from 'react-native-ui-kitten';

export class CustomCalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Custom Calendar',
  };

  getContentStyle = (state) => ({
    container: {
      base: state.isToday ? [styles.dayContainer, styles.dayContainerToday] : styles.dayContainer,
      selected: state.isSelected ? styles.dayContainerSelected : null,
      highlighted: state.isHighlighted ? styles.dayContainerHighlighted : null,
      disabled: state.isDisabled ? styles.dayContainerDisabled : null,
    },
    text: {
      base: state.isToday ? [styles.dayText, styles.dayTextToday] : styles.dayText,
      selected: state.isSelected ? styles.dayTextSelected : null,
      highlighted: state.isHighlighted ? styles.dayTextHighlighted : null,
      disabled: state.isDisabled ? styles.dayTextDisabled : null,
    },
    revenue: {
      fontSize: 12,
    },
  });

  renderDay = (date, state) => {
    const { container, text, revenue } = this.getContentStyle(state);
    const revenueText = state.isEmpty ? '' : `${(date.getDate() + 100) * date.getDate()}$`;
    return (
      <View style={[container.base, container.selected, container.highlighted, container.disabled]}>
        <Text style={[text.base, text.selected, text.highlighted, text.disabled]}>
          {state.isEmpty ? '' : date.getDate()}
        </Text>
        <Text style={[text.base, text.selected, text.highlighted, text.disabled, revenue]}>
          {revenueText}
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <RkCalendar
          min={new Date(2018, 0, 1)}
          max={new Date(2019, 0, 1)}
          renderDay={this.renderDay}
        />
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingHorizontal: 8,
  },
  dayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 8,
  },
  dayContainerToday: {
    backgroundColor: theme.colors.highlight,
  },
  dayContainerSelected: {
    backgroundColor: theme.colors.button.primary,
    borderRadius: 4,
  },
  dayContainerHighlighted: {
    backgroundColor: theme.colors.button.primary,
    opacity: 0.25,
    borderRadius: 0,
  },
  dayContainerDisabled: {
    opacity: 0.25,
  },
  dayText: {
    fontSize: theme.fonts.sizes.large,
    color: theme.colors.text.base,
    fontWeight: '300',
  },
  dayTextToday: {
    fontWeight: 'bold',
  },
  dayTextSelected: {
    color: theme.colors.text.inverse,
    fontWeight: 'bold',
  },
  dayTextHighlighted: {
    fontWeight: '300',
  },
  dayTextDisabled: {
  },
}));
