import React, {Component} from 'react';

import {
  StyleSheet,
  ListView,
  View,
  Text,
  TouchableHighlight,
  Platform,
} from 'react-native';

import {ButtonScreen} from './ButtonScreen';
import {CheckboxScreen} from './CheckboxScreen';
import {StartScreen} from './StartScreen';

export class ComponentsScreen extends Component {

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    let data = [
      {
        title: 'Start screen',
        description: "Start screen with greeting",
        screenView: StartScreen
      },
      {
        title: "Buttons",
        description: "Different styles for buttons",
        screenView: ButtonScreen
      },
      {
        title: "Checkboxes",
        description: "Different styles for checkboxes",
        screenView: CheckboxScreen
      },
      {
        title: "Ohter"
      },
    ];
    this.state = {
      dataSource: ds.cloneWithRows(data)
    };
  }

  renderComponent(componentDefinition) {
    return (
      <TouchableHighlight onPress={() => this.selectComponent(componentDefinition)}>
        <View style={styles.componentRow}>
          <Text style={styles.titleText}>{componentDefinition.title}</Text>
          <Text style={styles.descriptionText}>{componentDefinition.description}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  selectComponent(componentDefinition:Object) {
    if (componentDefinition.screenView === undefined) return;
    if (Platform.OS === 'ios') {
      this.props.navigator.push({
        title: componentDefinition.title,
        component: componentDefinition.screenView
      });
    } else {
      this.props.navigator.push({
        title: componentDefinition.title,
        component: componentDefinition.screenView
      });
      this.props.onSelect(componentDefinition);
    }
  }

  renderSeparator(sectionID,
                  rowID,
                  adjacentRowHighlighted) {
    var style = styles.rowSeparator;
    if (adjacentRowHighlighted) {
      style = [style, styles.rowSeparatorHide];
    }
    return (
      <View key={'SEP_' + sectionID + '_' + rowID} style={style}/>
    );
  }

  render() {
    return (
      <ListView style={styles.container}
                dataSource={this.state.dataSource}
                renderRow={(...params) => this.renderComponent(...params)}
                renderSeparator={this.renderSeparator}
                automaticallyAdjustContentInsets={true}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps={true}
                showsVerticalScrollIndicator={false}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  componentRow: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  titleText: {
    color: '#2196F3',
    fontSize: 20,
  },
  descriptionText: {
    color: '#9E9E9E',
    fontSize: 16,
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
});
