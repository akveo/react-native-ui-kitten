export const AvatarTypes = (theme) => ({
  _base: {
    container: {
      flex: 1,
      alignItems: 'center',
      flexDirection: 'row',
      marginVertical: 4,
    },
    image: {
      width: 40,
      height: 40,
    },
    username: {
      paddingLeft: 10,
      color: theme.colors.text.base,
    },
    description: {
      paddingLeft: 10,
      color: theme.colors.text.hint,
      fontSize: theme.fonts.sizes.small,
    },
  },
  round: {
    image: {
      borderRadius: 20,
      width: 36,
      height: 36,
      margin: 2,
    },
  },
  info: {
    backgroundColor: theme.colors.screen.info,
    color: theme.colors.text.inverse,
    descriptionColor: theme.colors.text.inverse,
  },
});
