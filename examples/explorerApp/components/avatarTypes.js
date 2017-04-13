export const AvatarTypes = (theme) => {
  return ({
    _base: {
      container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 4
      },
      image: {
        width: 40,
        height: 40
      },
      username: {
        paddingLeft: 10,
        color: theme.colors.text.base
      },
      description: {
        paddingLeft: 10,
        color: theme.colors.text.hint,
        fontSize: theme.fonts.sizes.small
      },
    },
    round: {
      image: {
        borderRadius: 20
      }
    },
    info: {
      container: {
        backgroundColor: theme.colors.back.info,
      },
      username: {
        color: theme.colors.text.additional
      },
      description: {
        color: theme.colors.text.additional
      }
    }
  })
};