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
              <View>
                <Text rkCardTitle>Header</Text>
                <Text rkCardSubTitle>Sub header</Text>
              </View>
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

            <View rkCardFooter rkType='bordered'>
              <Text>Footer</Text>
            </View>
          </RkCard>

          <RkCard>
            <View rkCardHeader style={{paddingTop: 0, paddingRight: 0}}>
              <View style={{flexDirection: 'row', paddingTop: 8}}>
                <Image resizeMode={'cover'} source={require('../img/dog.gif')} rkCardAvatar/>
                <View style={{justifyContent: 'space-around'}}>
                  <Text rkCardTitle>Alex Grey</Text>
                  <Text rkCardSubTitle>25 minutes ago</Text>
                </View>
              </View>
              <RkButton rkType='clear'><Icon style={{fontSize: 35}} name='ios-more'/></RkButton>
            </View>
            <View rkCardContent rkType='bordered'>
              <Text rkCardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam risus sem, vulputate ac sagittis ac,
                ultricies at velit. Sed in sem auctor, egestas odio eu, blandit quam. Cras et ante pulvinar, blandit
                velit at, lobortis sem. Integer in elit odio. Aliquam fringilla purus sit amet dapibus elementum. Cras
                posuere vehicula nisi, sit amet molestie turpis dictum sit amet. Nam cursus congue leo at accumsan.
                Fusce eget tincidunt massa.
              </Text>
            </View>

          </RkCard>

          <RkCard rkType='material'>

            <View rkCardHeader style={{backgroundColor: RkConfig.colors.blue500, paddingTop: 0, paddingRight: 0}}>
              <View style={{alignSelf: 'flex-end'}}>
                <Text style={{color: 'white'}} rkCardTitle>Material Card</Text>
                <Text style={{color: 'white'}} rkCardSubTitle>Sub header</Text>
              </View>
              <RkButton rkType='clear' style={{alignSelf: 'flex-end', marginBottom: 50, paddingHorizontal: 8}}
                        innerStyle={{color: 'white'}}><Icon name='md-close'/></RkButton>
            </View>

            <View rkCardContent>
              <Text rkCardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Mauris feugiat vel quam ac scelerisque...
              </Text>
            </View>

            <View rkCardFooter rkType='bordered'>
              <Text rkCardText>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Mauris feugiat vel quam ac scelerisque...
              </Text>
            </View>

          </RkCard>

          <RkCard rkType='material'>
            <View rkCardHeader rkType='noPadding bordered'>
              <Image resizeMode={'cover'} source={require('../img/rainyday.gif')} rkCardImg/>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                marginRight: 20,
                marginVertical: -22.5,
                zIndex: 111
              }}>
              <RkButton rkType='circle shadow'
                        style={[UtilStyles.spaceH, RkStyle.orange500Bg, {
                          paddingVertical: 5,
                          paddingHorizontal: 12.5
                        }]}
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
                rkType={'clear'}>
                SHARE
              </RkButton>
              <RkButton
                style={{paddingHorizontal: 5, paddingVertical: 5}}
                rkType={'clear'}>
                EXPLORE
              </RkButton>
            </View>

          </RkCard>


        </ScrollView>
      </View>
    )
  }

}