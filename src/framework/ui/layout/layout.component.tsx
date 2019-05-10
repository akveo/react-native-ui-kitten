import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

type ChildElement = React.ReactElement<any>;
type ChildrenProp = ChildElement | ChildElement[];

interface ComponentProps {
  children?: ChildrenProp;
}

export type LayoutProps = StyledComponentProps & ViewProps & ComponentProps;

export class Layout extends React.Component<LayoutProps> {

  static styledComponentName: string = 'Layout';

  private getComponentStyle = (source: StyleType): StyleType => {
    return {
      ...source,
      ...StyleSheet.flatten(this.props.style),
    };
  };

  public render(): React.ReactElement<ViewProps> {
    const { style, themedStyle, ...derivedProps } = this.props;
    const componentStyle: StyleType = this.getComponentStyle(themedStyle);

    return (
      <View
        {...derivedProps}
        style={componentStyle}
      />
    );
  }
}
