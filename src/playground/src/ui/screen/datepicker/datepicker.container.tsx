import React from 'react';
import { StyleSheet } from 'react-native';
import {
  DatepickerProps,
  Layout,
} from 'react-native-ui-kitten';
import { ShowcaseContainer } from '../common/showcase.container';
import { DatepickerShowcase } from './datepickerShowcase.component';
import { RangeDatepickerShowcase } from './rangeDatepickerShowcase.component';

export class DatepickerContainer extends React.Component {

  private renderItem = (props: DatepickerProps<Date>): React.ReactElement<DatepickerProps<Date>> => {
    return null;
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        style={styles.container}
        showcase={{ sections: [] }}
        renderItem={this.renderItem}>
        <Layout style={styles.showcaseContainer}>
          <DatepickerShowcase />
        </Layout>
        <Layout style={styles.showcaseContainer}>
          <RangeDatepickerShowcase />
        </Layout>
      </ShowcaseContainer>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  showcaseContainer: {
    paddingVertical: 8,
  },
});
