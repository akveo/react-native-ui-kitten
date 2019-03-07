import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableOpacityProps,
  GestureResponderEvent,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
  Interaction,
} from '@kitten/theme';
import { CheckMark } from '../drawable/checkmark/checkmark.component';

interface CheckBoxProps {
  checked?: boolean;
  status?: string;
  size?: string;
  onChange?: (checked: boolean) => void;
}

export type Props = CheckBoxProps & StyledComponentProps & TouchableOpacityProps;

export class CheckBox extends React.Component<Props> {

  private onPress = () => {
    if (this.props.onChange) {
      this.props.onChange(!this.props.checked);
    }
  };

  private onPressIn = (event: GestureResponderEvent) => {
    this.props.dispatch([Interaction.ACTIVE]);

    if (this.props.onPressIn) {
      this.props.onPressIn(event);
    }
  };

  private onPressOut = (event: GestureResponderEvent) => {
    this.props.dispatch([]);

    if (this.props.onPressOut) {
      this.props.onPressOut(event);
    }
  };

  private getComponentStyle = (style: StyleType): StyleType => {
    const { select, highlight, ...container } = style;

    return {
      container: {
        ...container,
        ...styles.container,
      },
      select: {
        width: container.width / 2,
        height: container.height / 8,
        ...select,
        ...styles.select,
      },
      highlight: {
        ...highlight,
        ...styles.highlight,
      },
    };
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, ...derivedProps } = this.props;
    const { container, select, highlight, checkMark } = this.getComponentStyle(themedStyle);

    return (
      <TouchableOpacity
        {...derivedProps}
        activeOpacity={1.0}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}>
        <View style={styles.container}>
          <View style={highlight}/>
          <View style={container}>
            <CheckMark style={select}/>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {},
  highlight: {
    position: 'absolute',
    alignSelf: 'center',
  },
});
