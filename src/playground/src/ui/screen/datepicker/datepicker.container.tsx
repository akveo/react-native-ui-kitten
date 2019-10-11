import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { DatepickerProps } from 'react-native-ui-kitten';
import { ShowcaseContainer } from '../common/showcase.container';
import { DatepickerShowcase } from './datepickerShowcase.component';
import { RangeDatepickerShowcase } from './rangeDatepickerShowcase.component';

export class DatepickerContainer extends React.Component {

  private renderItem = (props: DatepickerProps<Date>): React.ReactElement<DatepickerProps<Date>> => {
    return (
      <View/>
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        style={styles.container}
        showcase={{
          sections: [],
        }}
        renderItem={this.renderItem}
      >
        <DatepickerShowcase/>
        <RangeDatepickerShowcase/>
      </ShowcaseContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
});
