export const RkCardTypes = (theme) => {
  return ({
    _base: {
      container: {
        margin: 5,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#00000014',
        backgroundColor: theme.colors.back.base,
        // overflow: 'hidden'
      },
      header: {
        paddingVertical: 17,
        paddingHorizontal: 16,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      content: {
        paddingVertical: 12.5,
        paddingHorizontal: 16,
      },
      footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12.5,
        paddingBottom: 25,
        paddingHorizontal: 16,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 1,
      },
      title: {
        fontSize: 24,
        flexDirection: 'column',
      },
      row: {
        flexDirection: 'row'
      },
      rowCenter: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      subTitle: {
        fontSize: 14,
        color: theme.colors.text.subtitle
      },
      img: {
        flex: 1,
        height: 200,
        width: null,
      },
      imgOverlay: {
        flex: 1,
        height: 200,
        width: null,
        position: 'absolute',
        zIndex: 100,
        left: 0,
        right: 0,
        backgroundColor: theme.colors.overlay
      },
      avatar: {
        height: 64,
        width: 64,
        borderRadius: 32,
        marginRight: 10
      },
      avatarSmall: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10
      },
    },
    shadowed: {
      container: {
        shadowColor: '#00000021',
        shadowOffset: {
          width: 2
        },
        shadowOpacity: 1,
        shadowRadius: 4
      }
    },
    heroImage: {
      img:{
        height:350
      },
      imgOverlay: {
        flex: 1,
        width: null,
        height:null,
        position: 'absolute',
        zIndex: 100,
        left: 0,
        right: 0,
        bottom:0,
        backgroundColor: theme.colors.overlay
      },
    }
  });
};