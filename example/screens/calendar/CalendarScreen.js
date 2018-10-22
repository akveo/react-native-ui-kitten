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
  static navigationOptions = {
    title: 'Calendars',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  static data = [
    {
      title: 'Base',
      description: "'Minimum code' implementation",
      route: 'BaseCalendar',
    },
    {
      title: 'Range',
      description: 'If you want to select date range',
      route: 'RangeCalendar',
    },
    {
      title: 'Bounding Month',
      description: 'No next month days at the end of the current',
      route: 'BoundingCalendar',
    },
    {
      title: 'Custom Day Cell',
      description: "Don't like default implementation?",
      route: 'CustomCalendar',
    },
    {
      title: 'Horizontal',
      description: 'Like vertical but horizontal',
      route: 'HorizontalCalendar',
    },
  ];

  getItemKey = (item, index) => index.toString();

  onItemClick = (item) => {
    this.props.navigation.navigate(item.route);
  };

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.onItemClick(item)}>
      <View style={styles.componentRow}>
        <RkText rkType='header'>{item.title}</RkText>
        <RkText rkType='subtitle'>{item.description}</RkText>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <RkText>
          {'RkCalendar is a component which allows user to select date or date range.' +
          ' Check out some examples below prepared for you to see the power!'}
        </RkText>
        <View style={styles.descriptionSeparator} />
        <FlatList
          data={CalendarScreen.data}
          keyExtractor={this.getItemKey}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  container: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.screen.base,
  },
  descriptionSeparator: {
    height: 2,
    marginVertical: 8,
    backgroundColor: theme.colors.border.base,
  },
  componentRow: {
    paddingVertical: 8,
    justifyContent: 'space-between',
  },
}));
