import { RkTheme } from 'react-native-ui-kitten';
import { AvatarTypes } from '../components/avatarTypes';

const robotoLight = 'Roboto-Light';
const robotoMed = 'Roboto-Medium';

export const bootstrap = () => {
  RkTheme.registerComponent('Avatar', AvatarTypes);
  RkTheme.setColor('accent', '#ed1c4d');

  // region RkChoice Types

  RkTheme.setType('RkChoice', 'magentaCyan', {
    inner: {
      tintColor: 'magenta',
    },
  });

  RkTheme.setType('RkChoice', 'magentaCyanSelected', {
    inner: {
      tintColor: 'cyan',
    },
  });

  RkTheme.setType('RkChoice', 'starSelected', {
    backgroundColor: 'transparent',
    inner: {
      imageSource: () => require('../img/star.png'),
      tintColor: '#00ad1c',
    },
  });

  RkTheme.setType('RkChoice', 'kitten', {
    borderWidth: 0,
    inner: {
      margin: 0,
      width: 28,
      height: 28,
    },
  });

  RkTheme.setType('RkChoice', 'kittenSelected', {
    borderWidth: 0,
    inner: {
      imageSource: () => require('../img/kitten.png'),
      tintColor: null,
      margin: 0,
      width: 28,
      height: 28,
    },
  });

  RkTheme.setType('RkChoice', 'squadRadio', {
    borderRadius: 4,
  });

  RkTheme.setType('RkChoice', 'squadRadioSelected', {
    borderRadius: 4,
    inner: {
      backgroundColor: '#fc3630',
      tintColor: '#fc3630',
    },
  });

  RkTheme.setType('RkChoice', 'smileColor', {
    borderWidth: 0,
    inner: {
      imageSource: () => require('../img/smile_sad_color.png'),
      tintColor: null,
      margin: 0,
      width: 28,
      height: 28,
    },
  });

  RkTheme.setType('RkChoice', 'smileColorSelected', {
    borderWidth: 0,
    inner: {
      imageSource: () => require('../img/smile_color.png'),
      tintColor: null,
      margin: 0,
      width: 34,
      height: 34,
    },
  });

  RkTheme.setType('RkChoice', 'posNegClearCheck', {}, 'posNeg');

  RkTheme.setType('RkChoice', 'posNegClearCheckSelected', {
    inner: {
      tintColor: 'transparent',
    },
  }, 'posNegSelected');

  RkTheme.setType('RkChoice', 'rainbowCatSelected', {
    inner: {
      imageSource: () => require('../img/rainbowCat.gif'),
      tintColor: null,
      margin: 0,
      width: 50,
      height: 50,
    },
  });

  RkTheme.setType('RkChoice', 'rainbowCat', {
    inner: {
      margin: 0,
      width: 50,
      height: 50,
    },
  });

  RkTheme.setType('RkChoice', 'whiteGreenCheck', {
    backgroundColor: 'green',
  });

  RkTheme.setType('RkChoice', 'whiteGreenCheckSelected', {
    backgroundColor: 'green',
  });

  RkTheme.setType('RkChoice', 'helloClickMeSelected', {
    backgroundColor: '#bbf6ff',
    inner: {
      tintColor: '#005b69',
    },
  });

  RkTheme.setType('RkText', 'header', {
    text: {
      fontFamily: robotoMed,
    },
  });

  // endregion

  // region RkText

  RkTheme.setType('RkText', 'basic', {
    text: {
      fontFamily: robotoLight,
    },
  });

  RkTheme.setType('RkText', 'bold', {
    text: {
      fontFamily: robotoMed,
    },
  });

  RkTheme.setType('RkText', 'caption', {
    color: theme => theme.colors.text.inverse,
  });

  RkTheme.setType('RkText', 'cardText', {
    fontSize: 16,
    text: {
      lineHeight: 20,
    },
  });

  RkTheme.setType('RkText', 'accent', {
    color: RkTheme.colors.accent,
  });

  RkTheme.setType('RkText', 'hint', {
    color: RkTheme.current.colors.text.hint,
  });

  RkTheme.setType('RkText', 'inverse', {
    color: RkTheme.current.colors.text.inverse,
  });


  RkTheme.setType('RkText', 'compactCardText', {
    fontSize: 14,
    text: {
      lineHeight: 20,
      letterSpacing: -0.1,
    },
  });

  // endregion Types

  // region RkButton Types

  RkTheme.setType('RkButton', 'basic', {
    content: {
      fontFamily: robotoMed,
    },
  });

  RkTheme.setType('RkButton', 'hitSlop', {
    hitSlop: {
      top: 5, left: 5, bottom: 5, right: 5,
    },
  });

  RkTheme.setType('RkButton', 'outline-success', {
    backgroundColor: 'transparent',
    borderColor: theme => theme.colors.success,
    borderWidth: 1,
    color: theme => theme.colors.success,
  });

  RkTheme.setType('RkButton', 'link', {
    fontSize: theme => theme.fonts.sizes.small,
    content: {
      letterSpacing: -0.1,
    },
  });

  RkTheme.setType('RkButton', 'action', {
    color: theme => theme.colors.warning,
    content: {
      fontFamily: robotoMed,
    },
  });


  RkTheme.setType('RkButton', 'accent', {
    color: RkTheme.colors.accent,
  });

  RkTheme.setType('RkButton', 'accent-bg', {
    backgroundColor: RkTheme.colors.accent,
  });

  // region RkSwitches Types

  RkTheme.setType('RkSwitch', 'redTint', {
    tintColor: theme => theme.colors.button.danger,
    onTintColor: theme => theme.colors.button.danger,
  });

  RkTheme.setType('RkSwitch', 'lightGreenThumb', {
    thumbTintColor: '#90ff6b',
    margin: 10,
  });

  // endregion

  RkTheme.setType('RkTab', 'basic', {
    inner: {
      fontFamily: robotoMed,
    },
  });

  RkTheme.setType('RkTab', 'noBorders', {
    container: {
      borderLeftWidth: 0,
      borderRightWidth: 0,
    },
  });

  RkTheme.setType('RkCard', 'basic', {
    container: {
      marginVertical: 10,
    },
  });
};
