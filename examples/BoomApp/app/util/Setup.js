import {RkConfig} from 'react-native-ui-kit';

RkConfig.setColor('blurText', 'rgba(255,255,255,0.7)');
RkConfig.setColor('blurTextStrong', 'rgba(255,255,255,0.9)');
RkConfig.setColor('blurBg', 'rgba(0,0,0,0.1)');
RkConfig.setColor('blurBgWhite', 'rgba(255,255,255,0.1)');
RkConfig.setColor('blurBg', 'rgba(0,0,0,0.1)');
RkConfig.setColor('blurBgStrong', 'rgba(0,0,0,0.3)');
RkConfig.setColor('blurPrimary', '#00e5bf');
RkConfig.setColor('blurDark', '#15213b');
RkConfig.setColor('blurExtraDark', '#0b162a');
RkConfig.setType('text', 'white', {
  color: RkConfig.colors.blurTextStrong
});
RkConfig.setType('text', 'montserrat', {
  fontFamily: 'Montserrat-Regular'
});
RkConfig.setType('text', 'transparentBg', {
  backgroundColor: 'transparent'
});
RkConfig.setType('button', 'postControl', {
  container: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  inner: {
    fontSize: 26,
    color: RkConfig.colors.blurTextStrong
  },
});

RkConfig.setType('card', 'blur', {
  container: {
    margin: 0,
    marginBottom: 15,
    borderWidth: 0,
    borderRadius: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0
    }
  },
  content:{
    padding: 0,
    backgroundColor: RkConfig.colors.blurDark
  },
  title: {
    marginVertical: 3,
    fontSize: 16,
    color: RkConfig.colors.blurTextStrong
  },
  subTitle: {
    fontSize: 12,
    color: RkConfig.colors.blurText
  },
  avatarSmall:{
    width: 48,
    height: 48,
    borderRadius: 24
  },
  header: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: RkConfig.colors.blurDark,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  footer: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: RkConfig.colors.blurDark,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});

RkConfig.setTheme('blur', {
  text: {
    defaultType: 'white montserrat transparentBg'
  },
  card: {
    defaultType: 'blur'
  }
});



RkConfig.setStyle('backgroundImage', {
  flex: 1,
  width: null,
  height: null,
  resizeMode: 'cover',
  justifyContent: 'center',
  alignItems: 'stretch'
});

export default {}
