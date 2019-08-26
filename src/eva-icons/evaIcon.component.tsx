import React from 'react';
import { SvgProps } from 'react-native-svg';
import { IconProvider } from 'react-native-ui-kitten';

type IconElement = React.ReactElement<SvgProps>;
type IconComponent = React.ComponentType<SvgProps>;

export class EvaIcon implements IconProvider<SvgProps> {

  constructor(private content: IconComponent) {
  }

  public toReactElement(props: SvgProps): IconElement {
    const Icon: IconComponent = this.content;

    // @ts-ignore - Eva maps icon color to `tintColor`
    const { tintColor, ...restProps } = props;

    return (
      <Icon
        fill={tintColor}
        {...restProps}
      />
    );
  }
}
