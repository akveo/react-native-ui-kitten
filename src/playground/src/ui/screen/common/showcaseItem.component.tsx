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
import {
  Text,
  TextProps,
} from '@kitten/ui';
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

  private renderTitleElement = (): React.ReactElement<TextProps> => {
    const { themedStyle, item } = this.props;

    return (
      <Text
        appearance='hint'
        style={themedStyle.titleLabel}>
        {item.title}
      </Text>
    );
  };

  public render(): React.ReactNode {
    const { style, themedStyle, item } = this.props;

    const titleElement: React.ReactElement<TextProps> = item.title && this.renderTitleElement();
    const showcaseElement: React.ReactElement<any> = this.renderElement();

    return (
      <View style={[themedStyle.container, style]}>
        {titleElement}
        {showcaseElement}
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
    textAlign: 'left',
  },
  element: {},
}));
