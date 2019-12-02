import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Calendar,
  CalendarProps,
  Divider,
} from '@ui-kitten/components';

interface AdditionalProps {
  withFooter?: boolean;
}

export const CalendarShowcase = ({ withFooter, ...props }: CalendarProps & AdditionalProps): React.ReactElement => {

  const calendarRef: React.RefObject<any> = React.useRef();
  const [date, setDate] = React.useState<Date>(props.date);

  const onTodayPress = (): void => {
    calendarRef.current.scrollToToday();
  };

  const renderFooterElement = (): React.ReactElement => (
    <React.Fragment>
      <Divider style={styles.footerDivider}/>
      <View style={styles.footerContainer}>
        <Button onPress={onTodayPress}>
          Today
        </Button>
      </View>
    </React.Fragment>
  );

  return (
    <Calendar
      {...props}
      ref={calendarRef}
      date={date}
      onSelect={setDate}
      renderFooter={withFooter && renderFooterElement}
    />
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  footerDivider: {
    marginVertical: 12,
  },
});
