import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  RkText,
  RkTextInput,
} from 'react-native-ui-kitten';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UtilStyles } from '../style/styles';

export class InputScreen extends React.Component {
  static navigationOptions = {
    title: 'Inputs',
  };

  render = () => (
    <ScrollView
      style={UtilStyles.container}
      automaticallyAdjustContentInsets
    >
      <View style={UtilStyles.section}>
        <RkText rkType='header'>Default input</RkText>
        <View style={UtilStyles.rowContainer}>
          <View style={{ flex: 1 }}>
            <RkTextInput
              autoCorrect={false}
              autoCapitalize="none"
              placeholder='Login'
              clearButtonMode='always'
            />
            <RkTextInput secureTextEntry placeholder='Password' clearButtonMode='always' />
          </View>
        </View>
      </View>

      <View style={UtilStyles.section}>
        <RkText rkType='header'>Rounded input</RkText>
        <View style={UtilStyles.rowContainer}>
          <View style={{ flex: 1 }}>
            <RkTextInput rkType='rounded' placeholder='Login' />
            <RkTextInput
              secureTextEntry
              rkType='rounded'
              placeholder='Password'
            />
          </View>
        </View>
      </View>

      <View style={UtilStyles.section}>
        <RkText rkType='header'>Bordered input</RkText>
        <View style={UtilStyles.rowContainer}>
          <View style={{ flex: 1 }}>
            <RkTextInput rkType='bordered' placeholder='Login' />
            <RkTextInput
              secureTextEntry
              rkType='bordered'
              placeholder='Password'
            />
          </View>
        </View>
      </View>

      <View style={UtilStyles.section}>
        <RkText rkType='header'>With icon</RkText>
        <View style={[UtilStyles.rowContainer]}>
          <View style={{ flex: 1 }}>
            <RkTextInput label={<Icon style={styles.inputIcon} name='user' />} placeholder='Login' />
            <RkTextInput
              secureTextEntry
              label={<Icon style={styles.inputIcon} name='lock' />}
              placeholder='Password'
            />
            <RkTextInput
              rkType='rounded'
              label={<Icon style={[styles.inputIcon, styles.searchIcon]} name='search' />}
              placeholder='Search'
              style={{ marginLeft: 11 }}
            />
          </View>
        </View>
      </View>

      <View style={UtilStyles.section}>
        <RkText rkType='header'>Labels</RkText>
        <View style={[UtilStyles.columnContainer]}>
          <RkTextInput label='Login' rkType='form' />
          <RkTextInput rkType="form" secureTextEntry label='Password' />
        </View>
      </View>

      <View style={UtilStyles.section}>
        <RkText rkType='header'>Top Labels</RkText>
        <View style={[UtilStyles.rowContainer]}>
          <View style={{ flex: 1 }}>
            <RkTextInput rkType="topLabel" label='Login' />
            <RkTextInput
              secureTextEntry
              rkType="topLabel"
              containerStyle={{ marginTop: 15 }}
              label='Password'
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputIcon: {
    fontSize: 15,
    color: '#0000003a',
    marginLeft: 4,
  },
  searchIcon: {
    marginLeft: 16,
  },
});
