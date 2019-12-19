import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  Text,
  ThemeType,
  useTheme,
} from '@ui-kitten/components';

export const UseThemeScreen = (): React.ReactElement<ViewProps> => {
  const theme: ThemeType = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme['color-primary-default'] }]}>
      <Text category='h4' status='control'>
        I useTheme to set background color.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
