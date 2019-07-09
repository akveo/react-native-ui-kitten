import React from 'react';
import {
  ViewPager,
  ViewPagerElement,
  ViewPagerProps,
} from '../../viewPager/viewPager.component';
import { Override } from '../../support/typings';

export type CalendarPagerProps<D> = Override<ViewPagerProps, {
  data: D[];
  children: (date: D, index: number) => React.ReactElement<any>;
}>;

export type CalendarPagerElement<D> = React.ReactElement<CalendarPagerProps<D>>;

export class CalendarPager<D> extends React.Component<CalendarPagerProps<D>> {

  public render(): ViewPagerElement {
    const { data, children, ...restProps } = this.props;

    return (
      <ViewPager {...restProps}>
        {data.map(children)}
      </ViewPager>
    );
  }
}
