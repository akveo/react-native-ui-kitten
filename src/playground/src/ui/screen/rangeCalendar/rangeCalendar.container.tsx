import React from 'react';
import { RangeCalendarProps } from 'react-native-ui-kitten';
import { ShowcaseContainer } from '../common/showcase.container';
import { RangeCalendarShowcase } from './rangeCalendarShowcase.component';
import { calendarShowcase } from './type';

export class RangeCalendarContainer extends React.Component {

  private renderItem = (props: RangeCalendarProps<Date>): React.ReactElement<RangeCalendarProps<Date>> => {
    return (
      <RangeCalendarShowcase style={{flex: 1}} {...props}/>
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={calendarShowcase}
        renderItem={this.renderItem}
      />
    );
  }
}
