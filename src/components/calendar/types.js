export const RkCalendarTypes = (theme) => ({
  _base: {
    container: {
      backgroundColor: theme.colors.background,
    },
    header: {
      container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 4,
        backgroundColor: theme.colors.highlight,
      },
      monthName: {
        fontSize: theme.fonts.sizes.xlarge,
      },
      weekDays: {
        container: {
          paddingVertical: 4,
        },
        text: {
          textAlign: 'center',
          fontSize: theme.fonts.sizes.base,
          color: theme.colors.text.subtitle,
        },
      },
    },
    month: {
      container: {},
      day: {
        container: {
          base: {
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 4,
          },
          today: {
            backgroundColor: theme.colors.highlight,
          },
          selected: {
            backgroundColor: theme.colors.button.success,
            borderRadius: 4,
          },
          highlighted: {
            backgroundColor: theme.colors.button.success,
            opacity: 0.25,
            borderRadius: 0,
          },
          disabled: {
            opacity: 0.25,
          },
        },
        text: {
          base: {
            fontSize: theme.fonts.sizes.large,
            color: theme.colors.text.base,
            fontWeight: '300',
          },
          today: {
            fontWeight: 'bold',
          },
          selected: {
            color: theme.colors.text.inverse,
            fontWeight: 'bold',
          },
          highlighted: {
            fontWeight: '300',
          },
          disabled: {

          },
        },
      },
    },
  },
});
