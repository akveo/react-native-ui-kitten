import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
} from 'react-native-ui-kitten';

export class CalendarScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };
  static data = [
    {
      title: 'Base',
      route: 'BaseCalendar',
    },
    {
      title: 'Range',
      route: 'RangeCalendar',
    },
    {
      title: 'Bounding Month',
      route: 'BoundingCalendar',
    },
    {
      title: 'Custom Day Cell',
      route: 'CustomCalendar',
    },
  ];

  getItemKey = (item, index) => index.toString();

  onItemClick = (item) => {
    this.props.navigation.navigate(item.route);
  };

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onItemClick(item)}>
      <View style={styles.componentRow}>
        <RkText rkType='bold'>{item.title}</RkText>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <FlatList
        style={styles.container}
        data={CalendarScreen.data}
        keyExtractor={this.getItemKey}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.screen.base,
  },
  componentRow: {
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
