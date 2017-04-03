import React, {Component} from 'react';
import {
  Image,
  View
} from 'react-native';

import {RkTheme} from '../theme';

export const RkChoiceTypes = (theme) => {
  return ({
    _base: {
      container: {
        borderWidth: 1,
        borderColor: theme.colors.border.solid,
        borderRadius: 4,
        alignSelf: 'flex-start',
        content: (<View/>),
      },
      inner: {
        width: 26,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    selected: {
      backgroundColor: RkTheme.current.colors.back.button,
      borderColor: RkTheme.current.colors.border.base,
      content: (<View><Image source={require('../../assets/img/choice/whiteCheckMark.png')}/></View>)
    },
    disabled: {},
    selectedDisabled: {
      borderColor: RkTheme.current.colors.border.disabled,
      backgroundColor: RkTheme.current.colors.back.disabled,
      content: (<View><Image source={require('../../assets/img/choice/grayCheckMark.png')}/></View>)
    },
    radio: {
      borderRadius: 20,
      content: (<View/>)
    },
    radioSelected: {
      borderColor: RkTheme.current.colors.border.base,
      inner: {
        width: 16,
        height: 16,
        margin: 5,
        borderRadius: 10,
        backgroundColor: RkTheme.current.colors.back.button,
      }
    },
    radioDisabled: {
      borderColor: RkTheme.current.colors.border.disabled
    },
    radioSelectedDisabled: {
      borderColor: RkTheme.current.colors.border.disabled,
      inner: {
        width: 16,
        height: 16,
        margin: 5,
        borderRadius: 10,
        backgroundColor: RkTheme.current.colors.back.disabled,
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