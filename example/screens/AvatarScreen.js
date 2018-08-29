import React from 'react';
import {
  ScrollView,
  View,
} from 'react-native';
import { RkText } from 'react-native-ui-kitten';
import { Avatar } from '../components/avatar';
import { UtilStyles } from '../style/styles';

export class AvatarScreen extends React.Component {
  static navigationOptions = {
    title: 'Avatar',
  };

  render() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={true}
        style={UtilStyles.container}>
        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Base avatar</RkText>
          <View style={UtilStyles.columnContainer}>
            <Avatar source={require('../img/avatars/image3.png')} name='Carole Blundon' />
            <Avatar source={require('../img/avatars/image6.png')} name='Edward Storton' />
          </View>

        </View>

        <View style={[UtilStyles.section, UtilStyles.bordered]}>
          <RkText rkType='header'>Avatar with description</RkText>
          <View style={UtilStyles.columnContainer}>
            <Avatar
              source={require('../img/avatars/image1.png')}
              name='Nataly Rover'
              description='Secondary text'
            />
            <Avatar
              source={require('../img/avatars/image5.png')}
              name='Alex Gilbert'
              description='Secondary text'
            />
          </View>
        </View>

        <View style={[UtilStyles.section]}>
          <RkText rkType='header'>Round avatar with description</RkText>
          <View style={UtilStyles.columnContainer}>
            <Avatar
              rkType='round'
              source={require('../img/avatars/image4.png')}
              name='Helen Milpon'
              description='Secondary text'
            />
            <Avatar
              rkType='round'
              source={require('../img/avatars/image2.png')}
              name='Laura Meitner'
              description='Secondary text'
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
