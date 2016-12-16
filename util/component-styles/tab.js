import {Colors} from '../color.js';

export const TabStyles = {
    _container: {
        flex: 1,
        padding: 10,
        borderWidth: 0.5,
        backgroundColor: Colors.white,
        borderColor: Colors.blue500
    },
    _inner: {
        textAlign: 'center',
        fontSize: 18,
        color: Colors.blue500
    },
    _containerSelected: {
        backgroundColor: Colors.blue500
    },
    _innerSelected: {
        color: Colors.white
    },
    material: {
        container: {
            backgroundColor: Colors.grey300,
            padding: 10,
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 0.5,
            borderBottomColor: Colors.grey500
        },
        inner: {
            textAlign: 'center',
            fontSize: 18,
            color: Colors.darkGray
        },
        containerSelected: {
            backgroundColor: Colors.grey300,
            borderBottomWidth: 3,
            paddingBottom: 7.5,
            borderBottomColor: Colors.blue500
        },
        innerSelected: {
            color: Colors.blue500
        }
    }
};