import {Colors} from '../color.js';

export const CardStyles = {
    _container: {
        margin: 5,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: Colors.lightGray
    },
    _header: {
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        padding: 8,
    },
    _content: {
        padding: 8,
        backgroundColor: Colors.white,
    },
    _footer: {
        padding: 8,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
    },
    _title: {
        fontSize: 24
    },
    _subTitle: {
        fontSize: 14,
        color: Colors.darkGray
    },
    _img: {
        height: 150,
        width: null,
    },
    _bigImg: {
        height: 300,
        width: null,
    },
    rkCardText: {},
    material: {
        container: {
            borderRadius: 2,
            shadowColor: Colors.gray,
            shadowOpacity: 0.5,
            shadowRadius: 3,
            shadowOffset: {
                height: 1,
                width: 0
            }
        },
        header: {
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            backgroundColor: Colors.white,
        },
        footer: {
            borderBottomLeftRadius: 2,
            borderBottomRightRadius: 2,
            backgroundColor: Colors.white,
        },
        rkCardText: {
            lineHeight: 22,
            fontSize: 16
        }
    },
    bordered: {
        container: {
            borderWidth: 1,
            borderColor: Colors.lightGray
        },
        header: {
            borderBottomWidth: 0.5,
            borderBottomColor: Colors.lightGray
        },
        footer: {
            borderTopWidth: 0.5,
            borderTopColor: Colors.lightGray
        }
    },
    noPadding: {
        container: {
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
        },
        header: {
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
        },
        content: {
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
        },
        footer: {
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
        },
    }
};