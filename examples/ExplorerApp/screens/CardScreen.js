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
              <Text rkCardTitle>Header</Text>
              <Text rkCardSubTitle>Sub header</Text>
            </View>

            <View rkCardContent>
              <Image resizeMode={'cover'} source={require('../img/sea.jpg')} rkCardImg/>
            </View>

            <View rkCardContent>
              <Text rkCardTitle>Card content</Text>
              <Text rkCardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Mauris feugiat vel quam ac scelerisque...
              </Text>
            </View>

            <View rkCardFooter type='bordered'>
              <Text>Footer</Text>
            </View>
          </RkCard>

          <RkCard type='material'>

            <View rkCardHeader style={{backgroundColor: RkConfig.colors.primary, paddingTop: 0, paddingRight: 0}}>
              <RkButton type='clear' style={{alignSelf: 'flex-end', marginBottom: 50, paddingHorizontal: 8}} innerStyle={{color: 'white'}}><Icon name='md-close'/></RkButton>
              <Text style={{color: 'white'}} rkCardTitle>Material Card</Text>
              <Text style={{color: 'white'}} rkCardSubTitle>Sub header</Text>
            </View>

            <View rkCardContent>
              <Text rkCardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Mauris feugiat vel quam ac scelerisque...
              </Text>
            </View>

            <View rkCardFooter type='bordered'>
              <Text rkCardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Mauris feugiat vel quam ac scelerisque...
              </Text>
            </View>

          </RkCard>

          <RkCard type='material'>
            <View rkCardHeader type='noPadding bordered'>
              <Image resizeMode={'cover'} source={require('../img/rainyday.gif')} rkCardImg/>
            </View>

            <View
              style={{flex: 1, justifyContent: 'flex-end',alignItems: 'flex-end', marginRight: 20, marginVertical: -22.5, zIndex: 111}}>
              <RkButton type='circle shadow'
                        style={[UtilStyles.spaceH,  RkStyle.darkWarningBg, {paddingVertical: 5, paddingHorizontal: 12.5}]}
                        innerStyle={[RkStyle.whiteText, {fontSize: 32}]}>
                <Icon name={'md-add'}/>
              </RkButton>
            </View>

            <View rkCardContent>
              <Text rkCardTitle>Material Card</Text>
              <Text rkCardSubTitle>Sub header</Text>
            </View>

            <View rkCardContent>
              <Text rkCardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Mauris feugiat vel quam ac scelerisque...
              </Text>
            </View>

            <View rkCardFooter style={{flexDirection: 'row'}}>
              <RkButton
                style={{paddingHorizontal: 5, paddingVertical: 5}}
                type={'clear'}>
                SHARE
              </RkButton>
              <RkButton
                style={{paddingHorizontal: 5, paddingVertical: 5}}
                type={'clear'}>
                EXPLORE
              </RkButton>
            </View>

          </RkCard>


        </ScrollView>
      </View>
    )
  }

}