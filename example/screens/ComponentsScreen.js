import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  StyleSheet,
  ListView,
  View,
  TouchableOpacity,
} from 'react-native';

import { RkText, RkTheme, RkStyleSheet } from 'react-native-ui-kitten';


export class ComponentsScreen extends Component {
  static navigationOptions = {
    title: 'UI KIT',
  };


  constructor(props) {
    super(props);
    this.data = [
      {
        title: 'Pickers',
        route: 'Picker',
      },
      {
        title: 'Buttons',
        route: 'Button',
      },
      {
        title: 'Switches',
        route: 'Switch',
      },
      {
        title: 'Selectable Components',
        route: 'Choice',
      },
      {
        title: 'Inputs',
        route: 'Input',
      },
      {
        title: 'Cards',
        route: 'Card',
      },
      {
        title: 'Image Viewer',
        route: 'Image',
      },
      {
        title: 'Gallery',
        route: 'Gallery',
      },
      {
        title: 'Tab View',
        route: 'Tab',
      },
      {
        title: 'Custom Control View',
        route: 'Avatar',
      },
    ];
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }).cloneWithRows(this.data),
      theme: _.cloneDeep(RkTheme.current),
    };
  }

  // componentWillReceiveProps() {
  //   if (this.state.theme !== RkTheme.current) {
  //     this.setState({
  //       theme: _.cloneDeep(RkTheme.current),
  //       dataSource: new ListView.DataSource({
  //         rowHasChanged: (r1, r2) => r1 !== r2
  //       }).cloneWithRows(this.data)
  //     });
  //   }
  // }

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
    const { navigate } = this.props.navigation;
    navigate(componentDefinition.route);
  }

  renderSeparator(
    sectionID,
    rowID,
    adjacentRowHighlighted,
  ) {
    let style = styles.rowSeparator;
    if (adjacentRowHighlighted) {
      style = [style, styles.rowSeparatorHide];
    }
    return (
      <View key={`SEP_${sectionID}_${rowID}`} style={style} />
    );
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(...params) => this.renderComponent(...params)}
        renderSeparator={this.renderSeparator}
        automaticallyAdjustContentInsets
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps='always'
        showsVerticalScrollIndicator={false}
      />
    );
  }
}

const
  styles = RkStyleSheet.create(theme => ({
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
    rowSeparatorHide: {
      opacity: 0.0,
    },
  }));
