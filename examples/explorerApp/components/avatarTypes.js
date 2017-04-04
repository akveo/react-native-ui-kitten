export const AvatarTypes = (theme) => {
  return ({
    _base: {
      label: {
        paddingLeft: 10,
      },
      container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical:4
      },
      image: {
        width: 40,
        height: 40
      },
      caption:{
        paddingLeft:10,
        color:theme.colors.text.hint
      }
    },
    round: {
      imageBorderRadius: 20,
      color: theme.colors.text.base,
    }
  })
};