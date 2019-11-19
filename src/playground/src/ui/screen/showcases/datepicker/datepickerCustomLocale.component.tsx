import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Datepicker,
  Layout,
  NativeDateService,
} from 'react-native-ui-kitten';

const i18n = {
  dayNames: {
    short: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    long: ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
  },
  monthNames: {
    short: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    long: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  },
};

const dateService = new NativeDateService('zh', { i18n });

export const DatepickerCustomLocaleShowcase = () => {

  const [selectedDate, setSelectedDate] = React.useState(null);

  return (
    <Layout style={styles.container}>
      <Datepicker
        placeholder='Pick Date'
        date={selectedDate}
        onSelect={setSelectedDate}
        dateService={dateService}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 376,
  },
});
