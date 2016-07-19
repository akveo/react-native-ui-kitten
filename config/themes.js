import {Colors} from './color.js';

export const Themes = {

  'iosLike': {
    buttons: {
      defaultType: 'outline small',
    }
  },

  'material': {
    buttons: {
      defaultType: 'basic',
      defaultSize: 'medium'
    }
  },

  styles: {

    button: {
      _container: {
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 15
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
          shadowRadius: 2,
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
    },

    input: {
      _input: {
        fontSize: 16,
        height: 16 * 1.42,
        flex: 1,
        alignSelf: 'center'
      },
      _container: {
        flexDirection: 'row',
        flex: 1,
      },
      _label: {
        height: 16 * 1.42,
        fontSize: 16,
        alignSelf: 'center',
        marginRight: 5,
      },
      _icon: {
        marginRight: 5,
        alignSelf: 'center',
        backgroundColor: 'transparent'
      },
      basic: {
        input: {},
        container: {},
        label: {}
      },
      bordered: {
        input: {},
        container: {
          padding: 5,
          borderWidth: 0.5,
          borderColor: Colors.lightGray,
          borderRadius: 3,
        },
        label: {}
      },
      rounded: {
        input: {},
        container: {
          backgroundColor: Colors.lightGray,
          borderRadius: 100,
          paddingHorizontal: 10,
          paddingVertical: 5,
        },
        label: {}
      },
      underlay: {
        input: {},
        container: {
          borderBottomWidth: 0.5,
          borderBottomColor: Colors.primary,
        },
        label: {}
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
          height: 12 * 1.4,
          color: Colors.gray,
          alignSelf: 'flex-start'
        }
      }
    },
    choice: {
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
    },
    boardUp: {},
    card: {
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
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
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
    },
    tab: {
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
    }

  }

};