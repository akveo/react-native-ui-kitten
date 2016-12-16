import {Colors} from '../color.js';

export const CardStyles = {
  _container: {
    margin: 5,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: Colors.grey300
  },
  _header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    padding: 8,
  },
  _content: {
    padding: 8,
    backgroundColor: Colors.white,
  },
  _footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  _title: {
    fontSize: 24,
    flexDirection: 'column',
  },
  _row: {
    flexDirection: 'row'
  },
  _rowCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  _subTitle: {
    fontSize: 14,
    color: Colors.grey700
  },
  _img: {
    flex: 1,
    height: 150,
    width: null,
  },
  _avatar: {
    height: 64,
    width: 64,
    borderRadius: 32,
    marginRight: 10
  },
  _avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  _bigImg: {
    flex: 1,
    height: 300,
    width: null,
  },
  rkCardText: {},
  material: {
    container: {
      borderRadius: 2,
      shadowColor: Colors.grey500,
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
      borderColor: Colors.grey300
    },
    content: {
      borderTopWidth: 0.5,
      borderTopColor: Colors.grey300
    },
    header: {
      borderBottomWidth: 0.5,
      borderBottomColor: Colors.grey300
    },
    footer: {
      borderTopWidth: 0.5,
      borderTopColor: Colors.grey300
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