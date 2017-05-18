import {RkTheme} from 'react-native-ui-kitten';
import {BlueTheme, RedTheme} from "../style/my-theme"
import {AvatarTypes} from '../components/avatarTypes';

let robotoLight = 'Roboto-Light';
let robotoMed = 'Roboto-Medium';

export let bootstrap = () => {

  RkTheme.registerComponent('Avatar', AvatarTypes);
  RkTheme.setColor('accent', '#ed1c4d');

  RkTheme.setType('RkText', 'basic', {
    text: {
      fontFamily: robotoLight,
    }
  });

  RkTheme.setType('RkText', 'bold', {
    text: {
      fontFamily: robotoMed,
    }
  });

  RkTheme.setType('RkText', 'header', {
    text: {
      fontFamily: robotoMed
    }
  });
  RkTheme.setType('RkButton', 'basic', {
    content: {
      fontFamily: robotoMed
    }
  });


  // remove base border radius from all RkButtons in application
  /**
   RkTheme.setType('RkButton', 'basic', {
    borderRadius: 0
  });
   */

  RkTheme.setType('RkButton', 'outline-success', {
    backgroundColor: 'transparent',
    borderColor: RkTheme.current.colors.success,
    borderWidth: 1,
    color: RkTheme.current.colors.success,
  });

  RkTheme.setType('RkText', 'caption', {
    color: RkTheme.current.colors.text.additional
  });

  RkTheme.setType('RkText', 'cardText', {
    fontSize: 16,
    text: {
      lineHeight: 20,
    }
  });

  RkTheme.setType('RkText', 'compactCardText', {
    fontSize: 14,
    text: {
      lineHeight: 20,
      letterSpacing: -0.1
    }
  });

  RkTheme.setType('RkButton', 'link', {
    color: '#00000099',
    fontSize: RkTheme.current.fonts.sizes.small,
    content: {
      letterSpacing: -0.1
    }
  });

  RkTheme.setType('RkButton', 'action', {
    color: RkTheme.current.colors.warning,
    content: {
    fontFamily: robotoMed,
    }
  });

  RkTheme.setType('RkButton', 'accent', {
    color: RkTheme.colors.accent
  });

  RkTheme.setType('RkButton', 'accent-bg', {
    backgroundColor: RkTheme.colors.accent
  });

  RkTheme.setType('RkTab', 'basic', {
    inner: {
      fontFamily: robotoMed
    }
  });

  RkTheme.setType('RkTab', 'noBorders', {
    container: {
      borderLeftWidth: 0,
      borderRightWidth: 0,
    }
  });

  RkTheme.setType('RkCard', 'basic', {
    container: {
     marginVertical:10
    }
  });
};