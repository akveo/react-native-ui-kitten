import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  createStyle,
  ThemeType,
  ThemedStyleType,
  ThemeMappingType,
} from '@rk-kit/theme';

interface Props {
  mapping: ThemeMappingType;
  theme: ThemeType;
  themedStyle: ThemedStyleType | undefined;
  variant?: string;
  text?: string;
}

export class Sample extends React.Component<Props, {}> {
  static defaultProps = {
    text: `This is React Native UI Kitten playground.\n\n
      Create your awesome components inside
      ./src/framework dir
      which will be automatically synchronized with playground.
      Enjoy!`,
    variant: 'default',
  };

  getThemedStyle = () => {
    const { mapping, theme, variant } = this.props;
    const style = createStyle(theme, mapping, variant);
    return {
      container: {
        backgroundColor: style.backgroundColor,
      },
      text: {
        color: style.textColor,
      },
    };
  };

  render() {
    const style = this.getThemedStyle();
    return (
      <View style={[styles.container, style.container]}>
        <Text style={[styles.text, style.text]}>{this.props.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
});
