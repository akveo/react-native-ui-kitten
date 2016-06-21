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
        paddingHorizontal: 5,
        flex: 1,
        alignSelf: 'flex-end'
      },
      _container: {
        alignItems: 'flex-end',
        flexDirection: 'row',
        padding: 1,
      },
      basic:{
        input:{},
        container:{}
      },
      bordered:{
        input:{},
        container:{
          padding: 5,
          borderWidth: 0.5,
          borderColor: Colors.gray,
          borderRadius: 3,
        }
      },
      rounded:{
        input:{},
        container:{
          backgroundColor: Colors.gray,
          borderRadius: 100,
          paddingHorizontal: 10,
          paddingVertical: 5,
        }
      }
    }

  }

};