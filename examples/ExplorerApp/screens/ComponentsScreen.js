import React, {Component} from 'react';

import {
  StyleSheet,
  ListView,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {RkStyle} from 'react-native-ui-kit';

import {ButtonScreen} from './ButtonScreen';
import {ChoiceScreen} from './ChoiceScreen';
import {InputScreen} from './InputScreen';
import {ThemeScreen} from './ThemeScreen';
import {StartScreen} from './StartScreen';
import {ImageScreen} from './ImageScreen';
import {TabScreen} from './TabScreen';
import {BoardUpScreen} from './BoardUpScreen';
import {CardScreen} from './CardScreen';

export class ComponentsScreen extends Component {

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    let data = [
      {
        title: 'Start screen',
        screenView: StartScreen
      },
      {
        title: "Buttons",
        screenView: ButtonScreen
      },
      {
        title: "Selectable Components",
        screenView: ChoiceScreen
      },
      {
        title: "Inputs",
        screenView: InputScreen
      },
      {
        title: "Cards",
        screenView: CardScreen
      },
      {
        title: "Board Up View",
        screenView: BoardUpScreen
      },
      {
        title: "Image Viewer",
        screenView: ImageScreen
      },
      {
        title: "Tab View",
        screenView: TabScreen
      },
      {
        title: "Theme",
        screenView: ThemeScreen
      },
    ];
    this.state = {
      dataSource: ds.cloneWithRows(data)
    };
  }

  renderComponent(componentDefinition) {
    return (
      <TouchableOpacity onPress={() => this.selectComponent(componentDefinition)}>
        <View style={styles.componentRow}>
          <Text style={[styles.titleText]}>{componentDefinition.title}</Text>
          <Icon name={'angle-right'} size={18} style={RkStyle.grayText}/>
        </View>
      </TouchableOpacity>
    );
  }

  selectComponent(componentDefinition:Object) {
    if (componentDefinition.screenView === undefined) return;
    this.props.navigator.push({
      title: componentDefinition.title,
      component: componentDefinition.screenView
    });
    if (Platform.OS == 'android') {
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
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 18,
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
});
