import React from 'react';
import {
  ViewPager,
  ViewPagerElement,
  ViewPagerProps,
} from '../../viewPager/viewPager.component';
import { CalendarDateInfo } from '../type';
import { Override } from '../../support/typings';

export type CalendarPagerProps<D> = Override<ViewPagerProps, {
  data: CalendarDateInfo<D>[];
  children: (date: CalendarDateInfo<D>, index: number) => React.ReactElement<any>;
}>;

export type CalendarPagerElement<D> = React.ReactElement<CalendarPagerProps<D>>;

export class CalendarPager<D> extends React.Component<CalendarPagerProps<D>> {

  public scrollToIndex(params: { index: number, animated?: boolean }): void {
    this.viewPagerRef.current.scrollToIndex(params);
  }

  private viewPagerRef: React.RefObject<ViewPager> = React.createRef();

  private onSelect = (index: number): void => {
    // For any reason, this fixes layout junks
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

  private createChildElement = (date: CalendarDateInfo<D>, index: number): React.ReactElement<any> => {
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
        ref={this.viewPagerRef}
        shouldLoadComponent={this.shouldLoadComponent}
        onSelect={this.onSelect}>
        {data.map(this.createChildElement)}
      </ViewPager>
    );
  }
}
