export const AvatarTypes = (theme) => {
  return ({
    _base: {
      label: {
        paddingLeft: 10,
      },
      container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row'
      },
      image: {
        width: 40,
        height: 40
      }
    },
    round: {
      imageBorderRadius: 20,
      imageBorderWidth: 1,
      color: theme.colors.text.base,
      label: {
        paddingLeft: 2
      }
    }
  })
};