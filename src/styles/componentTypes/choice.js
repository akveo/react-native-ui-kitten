import {RkColors} from '../color.js';
import React, {Component} from 'react';
import {
  Image,
  View
} from 'react-native';

export const RkChoiceTypes = (theme) => {
  return ({
    _base: {
      container: {
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: theme.colors.border.solid,
        borderRadius:4,
        alignSelf: 'flex-start',
        content: (<View/>),
      },
      inner: {
        width: 25,
        height: 25,
      },
    },
    selected: {
      content: (<Image source={require('../../assets/img/choice/check_black.png')}/>)
    },
    disabled: {
      borderColor: RkColors.grey300
    },
    selectedDisabled: {
      borderColor: RkColors.grey300,
      content: (<Image source={require('../../assets/img/choice/check_grey.png')}/>)
    },
    material: {
      borderRadius: 2,
      borderWidth: 2,
      paddingHorizontal: 1,
      paddingVertical: 1,
      content: (<View/>)
    },
    materialSelected: {
      paddingHorizontal: 1,
      paddingVertical: 1,
      borderWidth: 2,
      borderColor: RkColors.cyan500,
      backgroundColor: RkColors.cyan500,
      content: (<Image source={require('../../assets/img/choice/check_white.png')}/>)
    },
    materialDisabled: {
      borderColor: RkColors.grey300
    },
    materialSelectedDisabled: {
      content: (<Image source={require('../../assets/img/choice/check_white.png')}/>)
    },
    radio:{
      borderRadius: 20,
      paddingHorizontal: 3,
      paddingVertical:3,
      content:(<View/>)
    },
    radioSelected:{
      borderColor: RkColors.blue500,
      inner:{
        borderRadius: 10,
        backgroundColor: RkColors.blue500,
      }
    },
    radioDisabled:{
      borderColor: RkColors.grey300,
    },
    radioSelectedDisabled:{
      backgroundColor: RkColors.grey300,
    },

    posNeg: {
      borderWidth: 0,
      content: (<Image source={require('../../assets/img/choice/close_red.png')}/>),
    },
    posNegSelected: {
      content: (<Image source={require('../../assets/img/choice/check_green.png')}/>),
    },
    posNegDisabled: {
      content: (<Image source={require('../../assets/img/choice/check_grey.png')}/>),
    },
    posNegSelectedDisabled: {
      content: (<Image source={require('../../assets/img/choice/check_grey.png')}/>),
    },
    clear: {
      borderWidth: 0,
    },
    clearSelected:{
      content: (<Image source={require('../../assets/img/choice/check_blue.png')}/>),
    },
    clearSelectedDisabled:{
      content: (<Image source={require('../../assets/img/choice/check_grey.png')}/>),
    }
  });
};