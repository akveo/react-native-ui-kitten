export const RkModalImgTypes = (theme) => {
  return ({
    _base: {
      header: {
        position: 'absolute',
        left: 0,
        right: 0,
        paddingTop: 36,
        paddingBottom: 10,
        paddingHorizontal: 16,
        backgroundColor: 'black',
      },
      footerContent: {
        height: 50,
      },
      innerHeaderContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
      },
      footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'black',
      },
      headerText: {
        textAlign: 'center',
        fontSize: theme.fonts.sizes.large
      },
      bar: {
        backgroundColor: 'black',
      },
      img: {
        width: 120,
        height: 120,
        resizeMode: "cover",
        margin: 2,
      },
    }
  });
};