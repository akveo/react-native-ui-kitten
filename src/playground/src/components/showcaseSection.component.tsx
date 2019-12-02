import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  Text,
  TextElement,
  TextProps,
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from 'react-native-ui-kitten';
import {
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '@pg/model/componentShowcase.model';
import {
  ShowcaseItem,
  ShowcaseItemProps,
} from './showcaseItem.component';

interface ComponentProps {
  section: ComponentShowcaseSection;
  renderItem: (props: any) => React.ReactElement;
}

export type ShowcaseSectionProps = ThemedComponentProps & ViewProps & ComponentProps;

const ShowcaseSectionComponent = (props: ShowcaseSectionProps): React.ReactElement => {

  const { style, themedStyle, section, renderItem } = props;

  const renderShowcaseItem = (item: ComponentShowcaseItem, index: number): React.ReactElement<ShowcaseItemProps> => (
    <ShowcaseItem
      key={index}
      style={themedStyle.item}
      item={item}
      renderItem={renderItem}
    />
  );

  const renderTitleElement = (): TextElement => (
    <Text style={themedStyle.titleLabel}>
      {section.title}
    </Text>
  );

  const titleElement: React.ReactElement<TextProps> = section.title && renderTitleElement();

  return (
    <View style={[themedStyle.container, style]}>
      {titleElement}
      {section.items.map(renderShowcaseItem)}
    </View>
  );
};

export const ShowcaseSection = withStyles(ShowcaseSectionComponent, (theme: ThemeType) => ({
  container: {},
  titleLabel: {
    marginVertical: 8,
    fontSize: 20,
    lineHeight: 28,
    textAlign: 'left',
  },
  item: {
    marginVertical: 8,
  },
}));
