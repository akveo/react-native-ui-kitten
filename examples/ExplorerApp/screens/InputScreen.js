import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput
} from 'react-native';

import { RkConfig, RkTextInput} from 'react-native-ui-kit';
import Icon from 'react-native-vector-icons/Ionicons';


export class InputScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: true
    };
  }

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.titleText}>Default input</Text>
          <View style={styles.rowContainer}>
            <RkTextInput placeholder={'placeholder'}/>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Rounded input</Text>
          <View style={styles.rowContainer}>
            <RkTextInput type={'rounded'} placeholder={'placeholder'}/>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>Bordered input</Text>
          <View style={styles.rowContainer}>
            <RkTextInput type={'bordered'} placeholder={'placeholder'}/>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.titleText}>With icon</Text>
          <View style={[styles.rowContainer, {flexDirection: 'row'}]}>
            <RkTextInput icon={'ios-search'} containerStyle={{flex: 1, marginRight: 10}} placeholder={'placeholder'}/>
            <RkTextInput type={'rounded'} icon={'ios-search-outline'} containerStyle={{flex: 1}} placeholder={'placeholder'}/>
          </View>
        </View>
      </ScrollView>

    );
  }


}


const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    paddingHorizontal: 15,
    flex: 1
  },
  titleText: {
    fontSize: 20
  },
  section: {
    marginTop: 10
  },
  rowContainer: {
    marginTop: 5,
  },
  spaceAround: {
    marginHorizontal: 5
  }
});
