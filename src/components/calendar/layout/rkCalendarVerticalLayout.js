import { getNumberOfWeekRowsInMonth } from '../services/calendarMonthModel.service';

class VerticalLayout {
  description = 'vertical';

  getLayoutConfig() {
    return {
      showsVerticalScrollIndicator: false,
    };
  }

  /**
   * returns height of list item
   */
  getItemSize(item, index, daySize) {
    const weekRowCount = getNumberOfWeekRowsInMonth(item);
    return (weekRowCount * daySize) + 58; // + header height; TODO
  }

  getPrimaryAxisOffset(offset) {
    return offset.y;
  }
}

export default new VerticalLayout();
