import React from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import { Text } from '../../text/text.component';

interface ComponentProps extends ViewProps {
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  title: string;
  subtitle: string;
  onTitlePress?: () => void;
  onSubtitlePress?: () => void;
}

type CalendarHeaderProps = ComponentProps;

export class CalendarHeader extends React.Component<CalendarHeaderProps> {

  public render(): React.ReactElement<ViewProps> {
    const {
      style,
      titleStyle,
      subtitleStyle,
      onTitlePress,
      onSubtitlePress,
      title,
      subtitle,
      ...restProps
    } = this.props;

    return (
      <View style={[styles.container, style]} {...restProps}>
        <TouchableOpacity onPress={onTitlePress}>
          <Text style={titleStyle}>{title}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onSubtitlePress}>
          <Text style={subtitleStyle}>{subtitle}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
