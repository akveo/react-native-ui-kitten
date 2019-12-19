import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  Text,
  ThemedComponentProps,
  ThemeProvider,
  ThemeType,
  useStyleSheet,
  useTheme,
  withStyles,
} from '@ui-kitten/components';

const WithStylesShowcaseComponent = (props: ThemedComponentProps): React.ReactElement<ViewProps> => (
  <View style={props.themedStyle.container}>
    <Text category='h4' status='control'>I'm withStyles</Text>
  </View>
);

const WithStylesShowcase = withStyles(WithStylesShowcaseComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme['color-primary-default'],
  },
}));

const UseStylesSheetShowcase = (): React.ReactElement<ViewProps> => {
  const styles = StyleSheet.create();

  return (
    <View style={styles.container}>
      <Text category='h4' status='control'>I'm useStyleSheet</Text>
    </View>
  );
};

const StyleSheet = useStyleSheet({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'color-primary-default',
  },
});

export const ThemeProviderScreen = (): React.ReactElement => {
  const currentTheme: ThemeType = useTheme();

  return (
    <React.Fragment>

      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: currentTheme['color-primary-default'] }}>
        <Text category='h4' status='control'>
          I use default primary color as background.
          But the guys below will not!
        </Text>
      </View>

      <ThemeProvider theme={{ ...currentTheme, 'color-primary-default': 'black' }}>
        <WithStylesShowcase />
        <UseStylesSheetShowcase />
      </ThemeProvider>

    </React.Fragment>
  );
};

