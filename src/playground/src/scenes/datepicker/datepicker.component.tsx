import React from 'react';
import { StyleSheet } from 'react-native';
import {
  DatepickerProps,
  Layout,
} from 'react-native-ui-kitten';
import { ShowcaseContainer } from '@pg/components/showcaseContainer.component';
import { DatepickerShowcase } from './datepickerShowcase.component';
import { RangeDatepickerShowcase } from './rangeDatepickerShowcase.component';

export const DatepickerScreen = ({ navigation }): React.ReactElement => {

  const renderItem = (props: DatepickerProps<Date>): React.ReactElement<DatepickerProps<Date>> => (
    <DatepickerShowcase {...props} />
  );

  return (
    <ShowcaseContainer
      style={styles.container}
      showcase={{ title: 'Date Picker', sections: [] }}
      renderItem={renderItem}
      onBackPress={() => navigation.goBack()}>
      <Layout style={styles.showcaseContainer}>
        <DatepickerShowcase/>
      </Layout>
      <Layout style={styles.showcaseContainer}>
        <RangeDatepickerShowcase/>
      </Layout>
    </ShowcaseContainer>
  );
};

export const styles = StyleSheet.create({
  container: {
    // padding: 8,
  },
  showcaseContainer: {
    paddingVertical: 8,
  },
});
