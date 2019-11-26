import React from 'react';
import {
  ScrollView,
  ViewStyle,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from 'react-native-ui-kitten';
import {
  ComponentShowcase,
  ComponentShowcaseSection,
} from '@pg/model/componentShowcase.model';
import {
  ShowcaseSection,
  ShowcaseSectionProps,
} from './showcaseSection.component';

interface ComponentProps {
  showcase: ComponentShowcase;
  settings?: { [prop: string]: any };
  renderItem: (props: any) => React.ReactElement<any>;
}

export type ShowcaseProps = ThemedComponentProps & ComponentProps;

type ListItemElement = React.ReactElement<ShowcaseSectionProps>;

const ShowcaseComponent = (props: ShowcaseProps): React.ReactElement => {

  const { themedStyle, showcase } = props;

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

    const borderStyle: ViewStyle | null = index === showcase.sections.length - 1 ? null : themedStyle.itemBorder;

    return React.cloneElement(listItemElement, {
      key: index,
      style: [themedStyle.item, borderStyle, listItemElement.props.style],
    });
  };

  return (
    <ScrollView
      style={themedStyle.container}
      bounces={false}>
      {showcase.sections.map(renderSectionItem)}
    </ScrollView>
  );
};

export const Showcase = withStyles(ShowcaseComponent, (theme: ThemeType) => {
  return {
    container: {
      flex: 1,
      backgroundColor: theme['background-basic-color-1'],
    },
    item: {
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    itemBorder: {
      borderBottomWidth: 1,
      borderBottomColor: theme['border-basic-color-3'],
    },
  };
});

