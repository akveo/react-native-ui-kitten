import React, {Component} from 'react';

import {
  StyleSheet,
  ListView,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar
} from 'react-native';

import {RkText, RkTheme} from 'react-native-ui-kitten';

export class ComponentsScreen extends Component {
  static navigationOptions = {
    title: 'UI KIT',
    header: ({state, setParams}) => ({
      style: {
        backgroundColor: RkTheme.current.colors.back.base
      }
    })
  };

  constructor(props) {
    super(props);
    let ds = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    let data = [
      {
        title: "Buttons",
        route: 'Button',
      },
      {
        title: "Selectable Components",
        route: 'Choice'
      },
      {
        title: "Inputs",
        route: 'Input'
      },
      {
        title: "Cards",
        route: 'Card'
      },
      {
        title: "Image Viewer",
        route: 'Image'
      },
      {
        title: "Tab View",
        route: 'Tab'
      },
      {
        title: "Custom Control View",
        route: 'Avatar'
      }
    ];
    this.state = {
      dataSource: ds.cloneWithRows(data)
    };
  }

  renderComponent(componentDefinition) {
    return (
      <TouchableOpacity onPress={() => this.selectComponent(componentDefinition)}>
        <View style={styles.componentRow}>
          <RkText rkType='bold'>{componentDefinition.title}</RkText>
        </View>
      </TouchableOpacity>
    );
  }

  selectComponent(componentDefinition) {
    const {navigate} = this.props.navigation;
    navigate(componentDefinition.route);
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
                keyboardShouldPersistTaps='always'
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
    paddingHorizontal: 24,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 1,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
});
