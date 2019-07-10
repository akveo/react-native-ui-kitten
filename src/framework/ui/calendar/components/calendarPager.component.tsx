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

  private onSelect = (index: number) => {
    // TODO: This fixes layout junks (for any reason)
    setTimeout(() => {
      this.props.onSelect(index);
    });
  };

  private shouldLoadComponent = (index: number): boolean => {
    if (this.props.shouldLoadComponent) {
      return this.props.shouldLoadComponent(index);
    }
    return true;
  };

  private createChildElement = (date: D, index: number): React.ReactElement<any> => {
    if (this.shouldLoadComponent(index)) {
      return this.props.children(date, index);
    }
    return null;
  };

  public render(): ViewPagerElement {
    const { data, children, ...restProps } = this.props;

    return (
      <ViewPager
        {...restProps}
        shouldLoadComponent={this.shouldLoadComponent}
        onSelect={this.onSelect}>
        {data.map(this.createChildElement)}
      </ViewPager>
    );
  }
}
