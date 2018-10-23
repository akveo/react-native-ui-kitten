import * as RkCalendarService from '../services';

class VerticalLayout {
  getLayoutConfig() {
    return {
      showsVerticalScrollIndicator: false,
    };
  }

  /**
   * returns height of list item
   */
  getItemSize(item, index, daySize) {
    const weekRowCount = RkCalendarService.Month.getNumberOfWeekRowsInMonth(item);
    return (weekRowCount * daySize) + 58; // + header height; TODO
  }

  getPrimaryAxisOffset(offset) {
    return offset.y;
  }
}

export const layout = new VerticalLayout();
export const description = 'vertical';
