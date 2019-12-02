import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  Text,
  TextElement,
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from 'react-native-ui-kitten';
import { ComponentShowcaseItem } from '@pg/model/componentShowcase.model';

interface ComponentProps {
  item: ComponentShowcaseItem;
  renderItem: (props: any) => React.ReactElement;
}

export type ShowcaseItemProps = ThemedComponentProps & ViewProps & ComponentProps;

const ShowcaseItemComponent = (props: ShowcaseItemProps): React.ReactElement => {

  const { style, themedStyle, item, renderItem } = props;

  const renderElement = (): React.ReactElement => {
    const element: React.ReactElement = renderItem(item.props);

    return React.cloneElement(element, {
      style: [themedStyle.element, element.props.style],
    });
  };

  const renderTitleElement = (): TextElement => (
    <Text
      appearance='hint'
      style={themedStyle.titleLabel}>
      {item.title}
    </Text>
  );


  const titleElement: TextElement = item.title && renderTitleElement();
  const showcaseElement: React.ReactElement = renderElement();

  return (
    <View style={[themedStyle.container, style]}>
      {titleElement}
      {showcaseElement}
    </View>
  );
};

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
