import {RkTheme} from 'react-native-ui-kitten';
import {BlueTheme, RedTheme} from "../style/my-theme"
import {AvatarTypes} from '../components/avatarTypes';

export let bootstrap = () => {

  RkTheme.registerTypes('Avatar', AvatarTypes);
  RkTheme.setType('RkTab', 'selected-gray', {
    backgroundColor: '#e0e0e0',
    color: '#2196f3'
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
  })
};