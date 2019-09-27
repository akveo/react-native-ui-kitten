import React from 'react';
import { CalendarProps } from '@kitten/ui';
import { ShowcaseContainer } from '../common/showcase.container';
import { CalendarShowcase } from './calendarShowcase.component';
import { calendarShowcase } from './type';

export class CalendarContainer extends React.Component {

  private renderItem = (props: CalendarProps<Date>): React.ReactElement<CalendarProps<Date>> => {
    return (
      <CalendarShowcase style={{flex: 1}} {...props}/>
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
