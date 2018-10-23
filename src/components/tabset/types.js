export const RkTabSetTypes = (theme) => ({
  _base: {
    tabBar: {
      container: {
        base: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
        },
        scrollable: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
        },
      },
      tab: {
        container: {
          base: {
            padding: 16,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          },
          selected: {},
        },
        title: {
          base: {
            color: theme.colors.overlay,
          },
          selected: {
            color: theme.colors.foreground,
          },
        },
        icon: {
          base: {
            marginHorizontal: 8,
            tintColor: theme.colors.overlay,
          },
          selected: {
            tintColor: theme.colors.foreground,
          },
        },
      },
    },
    indicator: {
      container: {
        height: 4,
      },
      content: {
        flex: 1,
        backgroundColor: theme.colors.success,
      },
    },
    pager: {
      container: {
      },
    },
  },
});
