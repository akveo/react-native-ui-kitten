import {Colors} from './color.js';

import * as ComponentStyles from './component-styles';
export const Themes = {

  'iosLike': {
    buttons: {
      defaultType: 'outline small',
    }
  },

  'material': {
    buttons: {
      defaultType: 'basic',
      defaultSize: 'medium'
    }
  },

  styles: {

    button: ComponentStyles.ButtonStyles,
    input: ComponentStyles.TextInputStyles,
    choice: ComponentStyles.ChoiceStyles,
    boardUp: {},
    card: ComponentStyles.CardStyles,
    tab: ComponentStyles.TabStyles

  }

};