import {Colors} from '../color.js';

export const TabStyles = {
    _container: {
        flex: 1,
        padding: 10,
        borderWidth: 0.5,
        backgroundColor: Colors.white,
        borderColor: Colors.primary
    },
    _inner: {
        textAlign: 'center',
        fontSize: 18,
        color: Colors.primary
    },
    _containerSelected: {
        backgroundColor: Colors.primary
    },
    _innerSelected: {
        color: Colors.white
    },
    material: {
        container: {
            backgroundColor: Colors.lightGray,
            padding: 10,
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderBottomWidth: 0.5,
            borderBottomColor: Colors.gray
        },
        inner: {
            textAlign: 'center',
            fontSize: 18,
            color: Colors.darkGray
        },
        containerSelected: {
            backgroundColor: Colors.lightGray,
            borderBottomWidth: 3,
            paddingBottom: 7.5,
            borderBottomColor: Colors.primary
        },
        innerSelected: {
            color: Colors.primary
        }
    }
};