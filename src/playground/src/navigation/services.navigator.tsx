import { createStackNavigator } from 'react-navigation-stack';
import { ServicesScreen } from '@pg/scenes/services/services.component';
import { UseStyleSheetScreen } from '@pg/scenes/useStyleSheet/useStyleSheet.component';
import { WithStylesScreen } from '@pg/scenes/withStyles/withStyles.component';
import { ThemeProviderScreen } from '@pg/scenes/themeProvider/themeProvider.component';
import { UseThemeScreen } from '@pg/scenes/useTheme/useTheme.component';
import { StyledComponentScreen } from '@pg/scenes/styled/styled.component';

export const ServicesNavigator = createStackNavigator({
  ['Services']: ServicesScreen,
  ['Use Theme']: UseThemeScreen,
  ['Use StyleSheet']: UseStyleSheetScreen,
  ['With Styles']: WithStylesScreen,
  ['Theme Provider']: ThemeProviderScreen,
  ['Styled']: StyledComponentScreen,
}, {
  headerMode: 'none',
});
