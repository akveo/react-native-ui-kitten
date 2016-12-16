import {Colors} from '../color.js';

export const TextInputStyles = {
    _input: {
        flex: 1,
        fontSize: 16,
        height: 16 * 1.42,
        alignSelf: 'center'
    },
    _container: {
        flexDirection: 'row',
        flex: 1,
    },
    _label: {
        fontSize: 16,
        alignSelf: 'center',
        marginRight: 5,
    },
    _icon: {
        marginRight: 5,
        alignSelf: 'center',
        backgroundColor: 'transparent'
    },
    basic: {},
    bordered: {
        container: {
            padding: 5,
            borderWidth: 0.5,
            borderColor: Colors.grey300,
            borderRadius: 3,
        },
    },
    rounded: {
        container: {
            backgroundColor: Colors.grey300,
            borderRadius: 100,
            paddingHorizontal: 10,
            paddingVertical: 5,
        }
    },
    underline: {
        container: {
            borderBottomWidth: 0.5,
            borderBottomColor: Colors.blue500,
        }
    },
    'underline-text': {
        input:{
            borderBottomWidth: 0.5,
            borderBottomColor: Colors.blue500,
        }
    },
    topLabel: {
        input: {
            alignSelf: 'stretch',
        },
        container: {
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        label: {
            fontSize: 12,
            color: Colors.grey500,
            alignSelf: 'flex-start'
        }
    }
};