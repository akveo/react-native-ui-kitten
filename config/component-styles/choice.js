import {Colors} from '../color.js';

export const ChoiceStyles = {

    _container: {
        paddingHorizontal: 2,
        paddingTop: 1,
        paddingBottom: 3,
        borderWidth: 1,
        borderColor: Colors.gray
    },
    _containerSelected: {},
    _innerSelected: {},
    _inner: {
        textAlign: 'center',
        fontSize: 22,
        width: 18,
        height: 18
    },
    _containerDisabled: {
        borderColor: Colors.lightGray
    },
    _innerDisabled: {
        color: Colors.lightGray
    },
    _icon: 'md-checkmark',
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
            color: Colors.white
        },
        containerDisabled: {
            borderColor: Colors.lightGray,
            backgroundColor: Colors.lightGray
        },
        innerDisabled: {
            color: Colors.white
        },
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
            borderRadius: 7,
        },
        icon: false,
        containerDisabled: {
            borderColor: Colors.lightGray,
        },
        innerDisabled: {
            backgroundColor: Colors.lightGray,
        },
    },
    posNeg: {
        container: {
            borderWidth: 0,
        },
        inner: {
            width: 20,
            height: 20,
            fontSize: 24,
            color: Colors.danger
        },
        innerSelected: {
            color: Colors.success
        },
        innerDisabled: {
            color: Colors.lightGray,
        },
        iconUnchecked: 'md-close',
        icon: 'md-checkmark'
    },
    clear: {
        container: {
            borderWidth: 0,
        },
        inner: {
            width: 20,
            height: 20,
            color: Colors.primary
        },
        innerDisabled: {
            color: Colors.lightGray,
        },
    }
};