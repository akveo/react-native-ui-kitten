import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';



import {RkButton, RkConfig, RkRadioButton, RkRadioGroup} from 'react-native-ui-kit';

export class ThemeScreen extends Component {

  _themes = [
    RkConfig.themes.iosLike,
    RkConfig.themes.material
  ];


  constructor(props) {
    super(props);
    this.state = {
      selected: this._themes.indexOf(RkConfig.theme)
    };
  }


  _changeTheme(index) {
    RkConfig.theme = this._themes[index];
    this.setState({selected: index});
  }

  render() {
    return (
      <View style={styles.container}>
        <RkRadioGroup selectedIndex={this.state.selected} onChange={(index) => this._changeTheme(index)}>
          <View style={[styles.rowRadio, {"flexDirection": "row"}]}>
            <TouchableOpacity radioTrigger={true}
                              style={{borderWidth: 0.5, borderColor: RkConfig.colors.gray, padding: 5, borderRadius: 3, margin: 5}}>
              <View style={{"flex": 1, "flexDirection": "row", "alignItems": "center"}}>
                <Text>Ios like theme</Text>
                <RkRadioButton style={styles.spaceAround} innerStyle={{width: 10}} innerSelectedStyle={{fontSize: 16}} icon={'md-checkmark'}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity radioTrigger={true}
                              style={{borderWidth: 0.5, borderColor: RkConfig.colors.gray, padding: 5, borderRadius: 3, margin: 5}}>
              <View style={{"flex": 1, "flexDirection": "row", "alignItems": "center"}}>
                <Text>Material theme</Text>
                <RkRadioButton style={styles.spaceAround} innerStyle={{width: 10}} innerSelectedStyle={{fontSize: 16}} icon={'md-checkmark'}/>
              </View>
            </TouchableOpacity>
          </View>
        </RkRadioGroup>
        <ScrollView
          automaticallyAdjustContentInsets={false}>
          <View style={styles.section}>
            <Text style={styles.titleText}>Simple button</Text>
            <View style={styles.buttonContainer}>
              <RkButton>Default</RkButton>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    paddingLeft: 15,
    flex: 1
  },
  titleText: {
    fontSize: 20
  },
  section: {
    marginTop: 10
  },
  buttonContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  spaceAround: {
    marginHorizontal: 5
  },
  rowRadio: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
