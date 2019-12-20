import React from 'react';
import {
  View,
  ViewProps,
  StyleSheet,
} from 'react-native';
import {
  Text,
  TextElement,
} from '@ui-kitten/components';
import { ComponentShowcaseItem } from '@pg/model/componentShowcase.model';

export interface ShowcaseItemProps extends ViewProps {
  item: ComponentShowcaseItem;
  renderItem: (props: any) => React.ReactElement;
}

export const ShowcaseItem = (props: ShowcaseItemProps): React.ReactElement => {

  const { style, item, renderItem } = props;

  const renderElement = (): React.ReactElement => {
    const element: React.ReactElement = renderItem(item.props);

    return React.cloneElement(element, {
      style: [element.props.style],
    });
  };

  const renderTitleElement = (): TextElement => (
    <Text
      appearance='hint'
      style={styles.titleLabel}>
      {item.title}
    </Text>
  );


  const titleElement: TextElement = item.title && renderTitleElement();
  const showcaseElement: React.ReactElement = renderElement();

  return (
    <View style={[styles.container, style]}>
      {titleElement}
      {showcaseElement}
    </View>
  );
};

const styles = StyleSheet.create({
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
});
