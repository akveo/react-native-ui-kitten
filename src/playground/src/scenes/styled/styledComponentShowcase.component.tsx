import React from 'react';
import {
  GestureResponderEvent,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {
  Interaction,
  styled,
  StyledComponentProps as UIKittenStyledComponentProps,
} from '@ui-kitten/components';

export interface StyledComponentProps extends TouchableOpacityProps, UIKittenStyledComponentProps {
  status?: string;
}

export type StyledComponentElement = React.ReactElement<StyledComponentProps>;

class StyledComponent extends React.Component<StyledComponentProps> {

  static styledComponentName: string = 'StyledComponent';

  private onPressIn = (e: GestureResponderEvent): void => {
    this.props.dispatch([Interaction.ACTIVE]);
    if (this.props.onPressIn) {
      this.props.onPressIn(e);
    }
  };

  private onPressOut = (e: GestureResponderEvent): void => {
    this.props.dispatch([]);
    if (this.props.onPressOut) {
      this.props.onPressOut(e);
    }
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, style, ...props } = this.props;

    return (
      <TouchableOpacity
        activeOpacity={1.0}
        {...props}
        style={[themedStyle, style]}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      />
    );
  }
}

export const StyledComponentShowcase = styled<StyledComponentProps>(StyledComponent);
