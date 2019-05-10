import React from 'react';
import {
  Image,
  TouchableOpacityProps,
  ImageProps,
  ImageStyle,
  StyleSheet,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface ComponentProps {
  shape?: string;
  size?: string;
}

export type AvatarProps = StyledComponentProps & ImageProps & ComponentProps;

class AvatarComponent extends React.Component<AvatarProps> {

  static styledComponentName: string = 'Avatar';

  private getComponentStyle = (source: StyleType): StyleType => {
    const { roundCoefficient, ...containerParameters } = source;

    const baseStyle: ImageStyle = {
      ...containerParameters,
      ...styles.container,
      ...StyleSheet.flatten(this.props.style),
    };

    // @ts-ignore: rhs operator is restricted to be number
    const borderRadius: number = roundCoefficient * baseStyle.height;

    return {
      ...baseStyle,
      borderRadius,
    };
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    return (
      <Image
        {...derivedProps}
        style={componentStyle}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export const Avatar = styled<AvatarProps>(AvatarComponent);
