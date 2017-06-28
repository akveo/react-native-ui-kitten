import React from 'react';

import {
  View,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';

import {
  RkButton,
  RkText,
  RkCard,
  RkTheme
} from 'react-native-ui-kitten';

import {UtilStyles} from '../style/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ImageIcon} from '../components/imageIcon'

export class CardScreen extends React.Component {
  static navigationOptions = {
    title: 'Cards'
  };

  constructor(props) {
    super(props);
  }

  render() {
    let likeStyle = [styles.buttonIcon, {color: RkTheme.colors.accent}];
    let iconButton = [styles.buttonIcon, {color: RkTheme.current.colors.text.hint}];
    return (
      <View style={{flex: 1}}>

        <ScrollView
          automaticallyAdjustContentInsets={true}
          style={[UtilStyles.container, styles.screen]}>
          <RkCard>
            <View rkCardHeader>
              <View>
                <RkText rkType='header'>Header</RkText>
                <RkText rkType='subtitle'>Subtitle</RkText>
              </View>
            </View>
            <Image rkCardImg source={require('../img/post1.png')}/>
            <View rkCardContent>
              <RkText rkType='cardText'>Far far away, behind the word mountains, far from the countries Vokalia and
                Consonantia, there live the blind texts.</RkText>
            </View>
            <View rkCardFooter>
              <RkButton rkType='clear link'>
                <Icon name="heart" style={likeStyle}/>
                <RkText rkType='accent'>18 Likes</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="comment-o" style={iconButton}/>
                <RkText rkType='hint'>2 Comments</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="send-o" style={iconButton}/>
                <RkText rkType='hint'>6 Shares</RkText>
              </RkButton>
            </View >
          </RkCard>

          <RkCard>
            <View rkCardHeader>
              <View>
                <RkText rkType='header'>Header</RkText>
                <RkText rkType='subtitle'>Subtitle</RkText>
              </View>
            </View>
            <Image rkCardImg source={require('../img/post2.png')}/>
            <View rkCardContent>
              <RkText rkType='cardText'>Far far away, behind the word mountains, far from the countries Vokalia and
                Consonantia, there live the blind texts.</RkText>
            </View>
            <View rkCardFooter style={styles.footer}>
              <RkButton rkType='clear link accent'>
                <Icon name="heart" style={likeStyle}/>
                <RkText rkType='accent'>18</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="comment-o" style={iconButton}/>
                <RkText rkType='hint'>2</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="send-o" style={iconButton}/>
                <RkText rkType='hint'>6</RkText>
              </RkButton>
            </View>
          </RkCard>

          <RkCard>
            <View rkCardHeader>
              <View style={{flexDirection: 'row'}}>
                <Image source={require('../img/avatar1.png')} style={styles.avatar}/>
                <View style={{}}>
                  <RkText rkType='header'>Elena Zhukova</RkText>
                  <RkText rkType='subtitle'>6 minutes ago</RkText>
                </View>
              </View>

              <RkButton rkType='clear'>
                <Icon style={styles.dot} name={'circle'}/>
                <Icon style={styles.dot} name={'circle'}/>
                <Icon style={styles.dot} name={'circle'}/>
              </RkButton>
            </View>
            <View rkCardContent>
              <RkText rkType='cardText'>Far far away, behind the word mountains, far from the countries Vokalia and
                Consonantia, there live the blind texts.</RkText>
            </View>
            <View rkCardFooter style={styles.footer}>
              <RkButton rkType='clear link accent'>
                <Icon name="heart" style={likeStyle}/>
                <RkText rkType='accent'>18</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="comment-o" style={iconButton}/>
                <RkText rkType='hint'>2</RkText>
              </RkButton>
              <RkButton rkType='clear link'>
                <Icon name="send-o" style={iconButton}/>
                <RkText rkType='hint'>6</RkText>
              </RkButton>
            </View>
          </RkCard>

          <RkCard rkType='shadowed'>
            <View>
              <Image rkCardImg source={require('../img/post3.png')}/>
              <View rkCardImgOverlay/>
            </View>
            <RkButton rkType='circle accent-bg' style={styles.floating}>
              <ImageIcon name='plus'/>
            </RkButton>

            <View rkCardHeader style={{paddingBottom: 2.5}}>
              <View>
                <RkText rkType='header xxlarge'>Header</RkText>
                <RkText rkType='subtitle'>Subtitle</RkText>
              </View>
            </View>
            <View rkCardContent>
              <RkText rkType='compactCardText'>Far far away, behind the word mountains, far from the countries Vokalia
                and
                Consonantia, there live the blind texts.</RkText>
            </View>
            <View rkCardFooter>
              <View style={styles.footerButtons}>
                <RkButton rkType='clear action' style={{marginRight: 16}}>SHARE</RkButton>
                <RkButton rkType='clear action'>EXPLORE</RkButton>
              </View>
            </View>
          </RkCard>

          <RkCard rkType='shadowed'>
            <View>
              <Image rkCardImg source={require('../img/post4.png')}/>
              <View rkCardImgOverlay style={styles.overlay}>
                <RkText rkType='header xxlarge' style={{color: 'white'}}>Header</RkText>
              </View>
            </View>
            <RkButton rkType='circle accent-bg' style={styles.floating}>
              <ImageIcon name='plus'/>
            </RkButton>

            <View rkCardHeader style={{paddingBottom: 2.5}}>
              <View>

                <RkText rkType='subtitle'>Subtitle</RkText>
              </View>
            </View>
            <View rkCardContent>
              <RkText rkType='compactCardText'>Far far away, behind the word mountains, far from the countries Vokalia
                and
                Consonantia, there live the blind texts.</RkText>
            </View>
            <View rkCardFooter>
              <View style={styles.footerButtons}>
                <RkButton rkType='clear action' style={{marginRight: 16}}>SHARE</RkButton>
                <RkButton rkType='clear action'>EXPLORE</RkButton>
              </View>
            </View>
          </RkCard>

          <RkCard rkType='heroImage shadowed'>
            <View>
              <Image rkCardImg source={require('../img/post5.png')}/>
              <View rkCardImgOverlay style={styles.overlay}>
                <View style={{marginBottom: 20}}>
                  <RkText rkType='header xxlarge' style={{color: 'white'}}>Header</RkText>
                  <RkText rkType='subtitle' style={{color: 'white'}}>Subtitle</RkText>
                </View>
                <View style={styles.footerButtons}>
                  <RkButton rkType='clear' style={{marginRight: 16}}>SHARE</RkButton>
                  <RkButton rkType='clear '>EXPLORE</RkButton>
                </View>
              </View>
            </View>
          </RkCard>
          <RkCard>
            <View rkCardHeader>
              <View>
                <RkText rkType='header'>Header</RkText>
                <RkText rkType='subtitle'>Subtitle</RkText>
              </View>
            </View>
            <View rkCardContent style={{paddingTop: 0}}>
              <RkText rkType='compactCardText'>The Big Oxmox advised her not to do so, because there were thousands of
                bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen.</RkText>
            </View>
            <View rkCardFooter>
              <View style={styles.footerButtons}>
                <RkButton rkType='clear action' style={{marginRight: 16}}>SHARE</RkButton>
                <RkButton rkType='clear action'>EXPLORE</RkButton>
              </View>
            </View>
          </RkCard>
        </ScrollView>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  screen: {
    backgroundColor: '#f0f1f5',
    padding: 12
  },
  buttonIcon: {
    marginRight: 7,
    fontSize: 19.7,
  },
  footer: {
    marginHorizontal: 16
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 17
  },
  dot: {
    fontSize: 6.5,
    color: '#0000008e',
    marginLeft: 2.5,
    marginVertical: 10,
  },
  floating: {
    width: 56,
    height: 56,
    position: 'absolute',
    zIndex: 200,
    right: 16,
    top: 173,
  },
  footerButtons: {
    flexDirection: 'row'
  },
  overlay: {
    justifyContent: 'flex-end',
    paddingVertical: 23,
    paddingHorizontal: 16
  }
});