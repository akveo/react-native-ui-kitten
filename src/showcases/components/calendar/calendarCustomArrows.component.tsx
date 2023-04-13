import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, Text } from '@ui-kitten/components';

const LeftArrow = (arrowProps: { onPress: () => void }): React.ReactElement => {
  return (
    <TouchableOpacity
      style={styles.arrow}
      onPress={arrowProps.onPress}
    >
      <Text>
        PREV
      </Text>
    </TouchableOpacity>
  );
};

export const CalendarCustomDayShowcase = (): React.ReactElement => {
  const [date, setDate] = React.useState(null);

  return (
    <Calendar
      date={date}
      onSelect={(nextDate) => setDate(nextDate)}
      renderArrowLeft={LeftArrow}
      renderArrowRight={(arrowProps) => {
        return (
          <TouchableOpacity
            style={styles.arrow}
            onPress={arrowProps.onPress}
          >
            <Text>
              NEXT
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  arrow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
