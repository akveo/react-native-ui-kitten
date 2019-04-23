import React from 'react';
import {
  Image,
  TouchableOpacityProps,
  ImageProps,
  ImageStyle,
  StyleSheet,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

interface AvatarProps {
  shape?: string;
  size?: string;
}

export type Props = AvatarProps & StyledComponentProps & ImageProps;

export class Avatar extends React.Component<Props> {

  static styledComponentName: string = 'Avatar';

  private getComponentStyle = (source: StyleType): StyleType => {
    const { roundCoefficient, ...componentStyle } = source;

    const baseStyle: ImageStyle = {
      ...componentStyle,
      ...StyleSheet.flatten(this.props.style),
    };

    // @ts-ignore: rhs operator is restricted to be number
    const borderRadius: number = roundCoefficient * baseStyle.height;

    return { borderRadius, ...baseStyle };
  };

  public render(): React.ReactElement<TouchableOpacityProps> {
    const { themedStyle, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    return (
      <Image
        {...derivedProps}
        style={[componentStyle, styles.container]}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
