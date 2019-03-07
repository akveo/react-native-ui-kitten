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

interface RadioProps {
  checked?: boolean;
  status?: string;
  size?: string;
  onChange?: (selected: boolean) => void;
}

export type Props = RadioProps & StyledComponentProps & TouchableOpacityProps;

export class Radio extends React.Component<Props> {

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
    const { container, select, highlight } = this.getComponentStyle(themedStyle);

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
            <View style={select}/>
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
