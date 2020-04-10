import React from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { Button, ButtonGroup, Icon, Layout, LayoutElement } from '@ui-kitten/components';
import { AppMapping, AppTheme, ThemeContext, ThemeContextType } from '../services/theme.service';

export const ShowcaseSettings = (props: ViewProps): LayoutElement => {

  const themeIconRef = React.useRef<Icon<SvgProps>>();
  const themeContext: ThemeContextType = React.useContext(ThemeContext);

  const nextMapping: AppMapping = themeContext.mapping === AppMapping.eva ? AppMapping.material : AppMapping.eva;
  const nextTheme: AppTheme = themeContext.isDarkMode() ? AppTheme.light : AppTheme.dark;

  const onSwitchMappingButtonPress = (): void => {
    themeContext.setMapping(nextMapping);
  };

  const onSwitchThemeButtonPress = (): void => {
    themeIconRef.current.startAnimation();
    themeContext.setTheme(nextTheme);
  };

  const ThemeIcon = (evaProps) => (
    <Icon
      ref={themeIconRef}
      {...evaProps}
      animation='zoom'
      name={themeContext.isDarkMode() ? 'moon-outline' : 'sun-outline'}
    />
  );

  return (
    <Layout style={[props.style, styles.container]} level='1'>
      <ButtonGroup
        status='basic'
        size='small'>
        <Button onPress={onSwitchMappingButtonPress}>
          {`SWITCH TO ${nextMapping.toUpperCase()}`}
        </Button>
        <Button
          accessoryLeft={ThemeIcon}
          onPress={onSwitchThemeButtonPress}
        />
      </ButtonGroup>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
