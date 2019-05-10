import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';

type ChildElement = React.ReactElement<any>;
type ChildrenProp = ChildElement | ChildElement[];

interface ComponentProps {
  children?: ChildrenProp;
}

export type LayoutProps = StyledComponentProps & ViewProps & ComponentProps;

class LayoutComponent extends React.Component<LayoutProps> {

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

export const Layout = styled<LayoutProps>(LayoutComponent);
