import * as RkCalendarService from '../services';

class HorizontalLayout {
  getLayoutConfig() {
    return {
      horizontal: true,
      pagingEnabled: true,
      showsHorizontalScrollIndicator: false,
    };
  }

  /**
   * returns width of list item
   */
  getItemSize(item, index, daySize) {
    return daySize * RkCalendarService.Date.DAYS_IN_WEEK;
  }

  getPrimaryAxisOffset(offset) {
    return offset.x;
  }
}

export const layout = new HorizontalLayout();
export const description = 'horizontal';
