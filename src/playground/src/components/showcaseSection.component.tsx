import React from 'react';
import {
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {
  Text,
  TextElement,
  TextProps,
} from '@ui-kitten/components';
import {
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '@pg/model/componentShowcase.model';
import {
  ShowcaseItem,
  ShowcaseItemProps,
} from './showcaseItem.component';

export interface ShowcaseSectionProps extends ViewProps {
  section: ComponentShowcaseSection;
  renderItem: (props: any) => React.ReactElement;
}

export const ShowcaseSection = (props: ShowcaseSectionProps): React.ReactElement => {

  const { style, section, renderItem } = props;

  const renderShowcaseItem = (item: ComponentShowcaseItem, index: number): React.ReactElement<ShowcaseItemProps> => (
    <ShowcaseItem
      key={index}
      style={styles.item}
      item={item}
      renderItem={renderItem}
    />
  );

  const renderTitleElement = (): TextElement => (
    <Text style={styles.titleLabel}>
      {section.title}
    </Text>
  );

  const titleElement: React.ReactElement<TextProps> = section.title && renderTitleElement();

  return (
    <View style={[styles.container, style]}>
      {titleElement}
      {section.items.map(renderShowcaseItem)}
    </View>
  );
};

const styles = StyleSheet.create({
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
});
