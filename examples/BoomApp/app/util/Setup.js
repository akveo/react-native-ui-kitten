import {RkConfig} from 'react-native-ui-kit';

RkConfig.setColor('blurText', 'rgba(255,255,255,0.5)');
RkConfig.setColor('blurTextStrong', 'rgba(255,255,255,0.7)');
RkConfig.setColor('blurBg', 'rgba(0,0,0,0.1)');
RkConfig.setColor('blurBgWhite', 'rgba(255,255,255,0.1)');
RkConfig.setColor('blurBgStrong', 'rgba(0,0,0,0.3)');
RkConfig.setColor('blurBgStrong', 'rgba(0,0,0,0.3)');
RkConfig.setColor('blurPrimary', '#00e5bf');
RkConfig.setType('text', 'white', {
  color: 'white'
});
RkConfig.setType('text', 'montserrat', {
  fontFamily: 'Montserrat-Regular'
});
RkConfig.setType('text', 'transparentBg', {
  backgroundColor: 'transparent'
});
RkConfig.setTheme('blur', {
  text: {
    defaultType: 'white montserrat transparentBg'
  }
});

RkConfig.theme = RkConfig.themes.blur;


RkConfig.setStyle('backgroundImage', {
  flex: 1,
  width: null,
  height: null,
  resizeMode: 'cover',
  justifyContent: 'center',
  alignItems: 'stretch'
});

export default {}
