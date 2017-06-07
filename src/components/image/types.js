export const RkModalImgTypes = (theme) => {
  return ({
    _base: {
      header: {
        position: 'absolute',
        left: 0,
        right: 0,
        paddingTop: {
          ios:36,
          android:16
        },
        paddingBottom: 10,
        paddingHorizontal: 16,
        backgroundColor: theme.colors.screen.inverse,
      },
      footerContent: {
        height: 50,
      },
        headerContent: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      },
      footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.colors.screen.inverse,
      },
      headerText: {
        textAlign: 'center',
        fontSize: theme.fonts.sizes.large
      },
      img: {
        width: 120,
        height: 120,
        resizeMode: 'cover',
        margin: 2,
      },
      modal:{
        flex:1,
        backgroundColor: theme.colors.screen.inverse
      }
    }
  });
};