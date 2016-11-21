import {Colors} from '../color.js';

export const ButtonStyles = {
    _container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 15,
    },
    _inner: {
        fontSize: 18,
        alignSelf: 'center',
        textAlign: 'center',
    },
    basic: {
        container: {
            backgroundColor: Colors.lightGray,
        },
        inner: {}
    },
    outline: {
        container: {
            borderWidth: 1,
            backgroundColor: 'transparent',
            borderColor: Colors.primary
        },
        inner: {
            color: Colors.primary
        }
    },
    material: {
        container: {
            shadowColor: Colors.gray,
            shadowOpacity: 0.5,
            shadowRadius: 3,
            shadowOffset: {
                height: 1,
                width: 0
            },
            borderRadius: 2,
        },
        inner: {}
    },
    clear: {
        container: {
            backgroundColor: 'transparent'
        },
        inner: {
            color: Colors.primary
        }
    },
    circle: {
        container: {
            borderRadius: 100
        },
        inner: {}
    },
    shadow: {
        container: {
            shadowColor: Colors.gray,
            shadowOpacity: 0.5,
            shadowRadius: 3,
            shadowOffset: {
                height: 1,
                width: 0
            }
        }
    },
    small: {
        container: {
            paddingVertical: 4,
            paddingHorizontal: 7,
        },
        inner: {
            fontSize: 14,
        }
    },
    medium: {
        container: {
            paddingVertical: 8,
            paddingHorizontal: 12,
        },
        inner: {
            fontSize: 16,
        }
    },
    large: {
        container: {
            paddingVertical: 10,
            paddingHorizontal: 15,
        },
        inner: {
            fontSize: 20,
        }
    },

};