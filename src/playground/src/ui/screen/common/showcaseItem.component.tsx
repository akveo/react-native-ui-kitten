import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import { Text } from '@kitten/ui';
import { ComponentShowcaseItem } from './type';

interface ComponentProps {
  item: ComponentShowcaseItem;
  renderItem: (props: any) => React.ReactElement<any>;
}

export type ShowcaseItemProps = ThemedComponentProps & ViewProps & ComponentProps;

class ShowcaseItemComponent extends React.Component<ShowcaseItemProps> {

  private renderElement = (): React.ReactElement<any> => {
    const { themedStyle, item, renderItem } = this.props;

    const element: React.ReactElement<any> = renderItem(item.props);

    return React.cloneElement(element, {
      style: [themedStyle.element, element.props.style],
    });
  };

  public render(): React.ReactNode {
    const { style, themedStyle, item } = this.props;

    return (
      <View style={[themedStyle.container, style]}>
        <Text appearance='hint' style={themedStyle.titleLabel}>{item.title}</Text>
        {this.renderElement()}
      </View>
    );
  }
}

export const ShowcaseItem = withStyles(ShowcaseItemComponent, (theme: ThemeType) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleLabel: {
    minWidth: 128,
    fontSize: 13,
  },
  element: {},
}));
