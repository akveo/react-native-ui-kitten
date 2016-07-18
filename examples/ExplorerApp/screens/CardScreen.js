import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ListView,
  Dimensions,
  Image
} from 'react-native';

import {RkButton, RkConfig, RkStyle, RkModalImg, RkTextInput, RkBarBg, RkCard} from 'react-native-ui-kit';

import {UtilStyles} from '../utils/styles';
import Icon from 'react-native-vector-icons/Ionicons';

export class CardScreen extends Component {

  constructor(props) {
    super(props);


  }

  render() {
    return (
      <View style={{flex: 1}}>

        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={[UtilStyles.container, {}]}>
          <RkCard>
            <View rkCardHeader>
              <Text rkCardTitle >Header</Text>
              <Text rkCardSubTitle >Sub header</Text>
            </View>

            <View rkCardContent type='noPadding'>
              <Text>content</Text>
              <Image resizeMode={'cover'} source={require('../img/clock.jpg')} rkCardFullImg/>
            </View>

            <View rkCardFooter>
              <Text>footer</Text>
            </View>
          </RkCard>

          <RkCard type='material bordered'>
            <View rkCardHeader>
              <Text>header</Text>
            </View>

            <View rkCardContent>
              <Text>content</Text>
            </View>

            <View rkCardFooter>
              <Text>footer</Text>
            </View>
          </RkCard>

        </ScrollView>
      </View>
    )
  }

}