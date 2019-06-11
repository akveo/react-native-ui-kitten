import { DAYS_IN_WEEK } from '../services/calendarDate.service';

class HorizontalLayout {
  description = 'horizontal';

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
    return daySize * DAYS_IN_WEEK;
  }

  getPrimaryAxisOffset(offset) {
    return offset.x;
  }
}

export default new HorizontalLayout();
