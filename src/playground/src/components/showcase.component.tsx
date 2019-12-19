import React from 'react';
import {
  ScrollView,
  ViewStyle,
} from 'react-native';
import { useStyleSheet } from '@ui-kitten/components';
import {
  ComponentShowcase,
  ComponentShowcaseSection,
} from '@pg/model/componentShowcase.model';
import {
  ShowcaseSection,
  ShowcaseSectionProps,
} from './showcaseSection.component';

export interface ShowcaseProps {
  showcase: ComponentShowcase;
  settings?: { [prop: string]: any };
  renderItem: (props: any) => React.ReactElement;
}

type ListItemElement = React.ReactElement<ShowcaseSectionProps>;

export const Showcase = (props: ShowcaseProps): React.ReactElement => {

  const styles = StyleSheet.create();
  const { showcase } = props;

  const renderShowcaseElement = (showcaseProps: any): React.ReactElement => {
    return props.renderItem({
      ...showcaseProps,
      ...props.settings,
    });
  };

  const renderSectionElement = (item: ComponentShowcaseSection): ListItemElement => (
    <ShowcaseSection
      section={item}
      renderItem={renderShowcaseElement}
    />
  );

  const renderSectionItem = (item: ComponentShowcaseSection, index: number): ListItemElement => {

    const listItemElement: ListItemElement = renderSectionElement(item);

    const borderStyle: ViewStyle | null = index === showcase.sections.length - 1 ? null : styles.itemBorder;

    return React.cloneElement(listItemElement, {
      key: index,
      style: [styles.item, borderStyle, listItemElement.props.style],
    });
  };

  return (
    <ScrollView
      style={styles.container}
      bounces={false}>
      {showcase.sections.map(renderSectionItem)}
    </ScrollView>
  );
};

const StyleSheet = useStyleSheet({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
  },
  item: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'border-basic-color-3',
  },
});

