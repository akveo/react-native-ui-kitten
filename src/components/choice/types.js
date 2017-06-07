import React from 'react';
import {
  Image,
  View
} from 'react-native';

export const RkChoiceTypes = (theme) => {
  return ({
    _base: {
      container: {
        borderWidth: 1,
        borderColor: theme.colors.border.base,
        borderRadius: 4,
        alignSelf: 'flex-start',
      },
      inner: {
        width: 26,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center',
        content: (<View/>),
      },
    },
    selected: {
      backgroundColor: theme.colors.screen.primary,
      borderColor: theme.colors.border.base,
      content: (<View><Image source={require('../../assets/img/choice/whiteCheckMark.png')}/></View>)
    },
    disabled: {},
    selectedDisabled: {
      borderColor: theme.colors.border.disabled,
      backgroundColor: theme.colors.screen.disabled,
      content: (<View><Image source={require('../../assets/img/choice/grayCheckMark.png')}/></View>)
    },
    radio: {
      borderRadius: 20,
      content: (<View/>)
    },
    radioSelected: {
      borderColor: theme.colors.border.base,
      inner: {
        width: 16,
        height: 16,
        margin: 5,
        borderRadius: 10,
        backgroundColor: theme.colors.screen.primary,
      }
    },
    radioDisabled: {
      borderColor: theme.colors.border.disabled
    },
    radioSelectedDisabled: {
      borderColor: theme.colors.border.disabled,
      inner: {
        width: 16,
        height: 16,
        margin: 5,
        borderRadius: 10,
        backgroundColor: theme.colors.screen.disabled,
      }
    },

    posNeg: {
      borderWidth: 0,
      content: (<View><Image source={require('../../assets/img/choice/crossMark.png')}/></View>),
    },
    posNegSelected: {
      content: (<View><Image source={require('../../assets/img/choice/greenCheckMark.png')}/></View>),
    },
    posNegDisabled: {
      content: (<View><Image source={require('../../assets/img/choice/grayCrossMark.png')}/></View>),
    },
    posNegSelectedDisabled: {
      content: (<View><Image source={require('../../assets/img/choice/grayCheckMark.png')}/></View>),
    },
    clear: {
      borderWidth: 0,
    },
    clearSelected: {
      content: (<View><Image source={require('../../assets/img/choice/greenCheckMark.png')}/></View>),
    },
    clearSelectedDisabled: {
      content: (<View><Image source={require('../../assets/img/choice/grayCheckMark.png')}/></View>),
    }
  });
};