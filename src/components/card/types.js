export const RkCardTypes = (theme) => {
  return ({
    _base: {
      container: {
        margin: 0,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: theme.colors.border.card,
        backgroundColor: theme.colors.screen.base,
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
      }
    },
    shadowed: {
      container: {
        shadowColor: '#00000021',
        shadowOffset: {
          width: 2
        },
        shadowOpacity: 0.5,
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