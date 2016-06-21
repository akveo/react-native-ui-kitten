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
      _container:{
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15
      },
      _inner:{
        fontSize: 18,
        alignSelf: 'center',
        textAlign: 'center',
      },
      basic:{
        container:{
          backgroundColor: Colors.lightGray,
        },
        inner:{

        }
      },
      outline:{
        container:{
          borderWidth: 1,
          backgroundColor: 'transparent',
          borderColor: Colors.primary
        },
        inner:{
          color: Colors.primary
        }
      },
      clear:{
        container:{
          backgroundColor: 'transparent'
        },
        inner:{
          color: Colors.primary
        }
      },
      circle:{
        container:{
          borderRadius: 100
        },
        inner:{

        }
      },
      small: {
        container: {
          paddingVertical: 4,
          paddingHorizontal: 7,
        },
        inner:{
          fontSize: 14,
        }
      },
      medium: {
        container: {
          paddingVertical: 8,
          paddingHorizontal: 12,
        },
        inner:{
          fontSize: 16,
        }
      },
      large:{
        container:{
          paddingVertical: 10,
          paddingHorizontal: 15,
        },
        inner:{
          fontSize: 20,
        }
      },
    },

    input:{
      _input: {
        fontSize: 16,
        height: 16 * 1.42,
        flex: 1,
        alignSelf: 'flex-end'
      },
      _container: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        flex: 1,
      },
      _label: {
        height: 16 * 1.42,
        fontSize: 16,
        alignSelf: 'center',
        marginRight: 5,
      },
      _icon:{
        marginRight: 5,
      },
      basic:{
        input:{},
        container:{},
        label:{}
      },
      bordered:{
        input:{},
        container:{
          padding: 5,
          borderWidth: 0.5,
          borderColor: Colors.lightGray,
          borderRadius: 3,
        },
        label:{}
      },
      rounded:{
        input:{},
        container:{
          backgroundColor: Colors.lightGray,
          borderRadius: 100,
          paddingHorizontal: 10,
          paddingVertical: 5,
        },
        label:{}
      },
      underlay: {
        input:{},
        container:{
          borderBottomWidth: 0.5,
          borderBottomColor: Colors.primary,
        },
        label:{}
      },
      topLabel:{
        input:{
          alignSelf: 'stretch',
        },
        container:{
          flexDirection: 'column',
          alignItems: 'flex-start',
        },
        label:{
          fontSize: 12,
          height: 12 * 1.4,
          color: Colors.gray,
          alignSelf: 'flex-start'
        }
      }
    }

  }

};