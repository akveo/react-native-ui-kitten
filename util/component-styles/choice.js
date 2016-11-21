import {Colors} from '../color.js';
import React, {Component} from 'react';
import {
  Image,
  View
} from 'react-native';


export const ChoiceStyles = {

    _container: {
        paddingHorizontal: 2,
        paddingTop: 1,
        paddingBottom: 3,
        borderWidth: 1,
        borderColor: Colors.gray
    },
    _inner: {
        width: 18,
        height: 18
    },
    _containerSelected: {},
    _innerSelected: {},
    _containerDisabled: {
        borderColor: Colors.lightGray
    },
    _innerDisabled: {
    },
    _containerSelectedDisabled: {
        borderColor: Colors.lightGray
    },
    _innerSelectedDisabled: {
    },
    _content: (<Image source={require('../../assets/img/choice/check_black.png')}/>),
    _contentDisabled: (<Image source={require('../../assets/img/choice/check_grey.png')}/>),
    _contentUnchecked: (<View/>),
    _contentUncheckedDisabled: (<View/>),
    material: {
        container: {
            borderRadius: 2,
            borderWidth: 2,
        },
        containerSelected: {
            borderWidth: 0,
            backgroundColor: Colors.cyan
        },
        innerSelected: {
            width: 20,
            height: 20
        },
        inner: {
            width: 16,
            height: 16,
        },
        containerDisabled: {
            borderColor: Colors.lightGray
        },
        containerSelectedDisabled: {
            backgroundColor: Colors.lightGray
        },
        content: (<Image source={require('../../assets/img/choice/check_white.png')}/>),
        contentDisabled: (<Image source={require('../../assets/img/choice/check_white.png')}/>),
    },
    radio: {
        container: {
            borderRadius: 20,
            paddingHorizontal: 3,
            paddingTop: 3,
        },
        containerSelected: {
            borderColor: Colors.primary
        },
        innerSelected: {
            backgroundColor: Colors.primary
        },
        inner: {
            width: 15,
            height: 15,
            borderRadius: 8,
        },
        containerDisabled: {
            borderColor: Colors.lightGray,
        },
        innerSelectedDisabled: {
            backgroundColor: Colors.lightGray,
        },
        content: (<View/>),
        contentDisabled: (<View/>),
    },
    posNeg: {
        container: {
            borderWidth: 0,
        },
        content: (<Image source={require('../../assets/img/choice/check_green.png')}/>),
        contentDisabled: (<Image source={require('../../assets/img/choice/check_grey.png')}/>),
        contentUnchecked: (<Image source={require('../../assets/img/choice/close_red.png')}/>),
        contentUncheckedDisabled: (<Image source={require('../../assets/img/choice/close_grey.png')}/>),
    },
    clear: {
        container: {
            borderWidth: 0,
        },
        inner: {
            width: 20,
            height: 20,
        },
        content: (<Image source={require('../../assets/img/choice/check_blue.png')}/>),
        contentDisabled: (<Image source={require('../../assets/img/choice/check_grey.png')}/>),
    }
};