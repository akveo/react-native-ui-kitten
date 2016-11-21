import {Colors} from './color.js';

import * as ComponentStyles from './component-styles';
export const Themes = {

  'iosLike': {
    button: {
      defaultType: 'outline small',
    }
  },

  'material': {
    button: {
      defaultType: 'basic'
    }
  },

  styles: {
    text: {},
    button: ComponentStyles.ButtonStyles,
    input: ComponentStyles.TextInputStyles,
    choice: ComponentStyles.ChoiceStyles,
    boardUp: {},
    card: ComponentStyles.CardStyles,
    tab: ComponentStyles.TabStyles
  },

};