import React from 'react';
import PropTypes from 'prop-types';
import {
  ListView,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
} from 'react-native-ui-kitten';


export class ComponentsScreen extends React.Component {
  static navigationOptions = {
    title: 'UI KIT',
  };
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };
  static data = [
    {
      title: 'Pickers',
      route: 'Picker',
    }, {
      title: 'Buttons',
      route: 'Button',
    }, {
      title: 'Calendars',
      route: 'Calendars',
    }, {
      title: 'Switches',
      route: 'Switch',
    }, {
      title: 'Selectable Components',
      route: 'Choice',
    }, {
      title: 'Inputs',
      route: 'Input',
    }, {
      title: 'Cards',
      route: 'Card',
    }, {
      title: 'Image Viewer',
      route: 'Image',
    }, {
      title: 'Gallery',
      route: 'Gallery',
    }, {
      title: 'Tab Set',
      route: 'TabSet',
    }, {
      title: 'Custom Control View',
      route: 'Avatar',
    },
  ];

  state = {
    dataSource: undefined,
  };

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: this.onListViewRowChange,
    });
    this.state.dataSource = dataSource.cloneWithRows(ComponentsScreen.data);
  }

  onListViewRowChange = (lhs, rhs) => lhs !== rhs;

  onComponentSelected = (componentDefinition) => {
    this.props.navigation.navigate(componentDefinition.route);
  };

  renderSeparator = (sectionID, rowID, adjacentRowHighlighted) => (
    <View
      style={[styles.rowSeparator, { opacity: adjacentRowHighlighted ? 0.0 : 1.0 }]}
      key={`SEP_${sectionID}_${rowID}`}
    />
  );

  renderComponent = (componentDefinition) => (
    <TouchableOpacity onPress={() => this.onComponentSelected(componentDefinition)}>
      <View style={styles.componentRow}>
        <RkText rkType='bold'>{componentDefinition.title}</RkText>
      </View>
    </TouchableOpacity>
  );

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(...params) => this.renderComponent(...params)}
        renderSeparator={this.renderSeparator}
        automaticallyAdjustContentInsets={true}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='always'
        showsVerticalScrollIndicator={false}
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
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
  },
}));
