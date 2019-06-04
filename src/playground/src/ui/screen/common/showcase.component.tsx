import React from 'react';
import {
  ScrollView,
  ViewStyle,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import {
  ShowcaseSection,
  ShowcaseSectionProps,
} from './showcaseSection.component';
import {
  ComponentShowcase,
  ComponentShowcaseSection,
} from './type';

interface ComponentProps {
  showcase: ComponentShowcase;
  settings?: { [prop: string]: any };
  renderItem: (props: any) => React.ReactElement<any>;
}

export type ShowcaseProps = ThemedComponentProps & ComponentProps;

type ListItemElement = React.ReactElement<ShowcaseSectionProps>;

class ShowcaseComponent extends React.Component<ShowcaseProps> {

  private renderShowcaseElement = (props: any): React.ReactElement<any> => {
    return this.props.renderItem({
      ...props,
      ...this.props.settings,
    });
  };

  private renderSectionElement = (item: ComponentShowcaseSection): ListItemElement => {
    return (
      <ShowcaseSection
        section={item}
        renderItem={this.renderShowcaseElement}
      />
    );
  };

  private renderSectionItem = (item: ComponentShowcaseSection, index: number): ListItemElement => {
    const { themedStyle, showcase } = this.props;

    const listItemElement: ListItemElement = this.renderSectionElement(item);

    const borderStyle: ViewStyle | null = index === showcase.sections.length - 1 ? null : themedStyle.itemBorder;

    return React.cloneElement(listItemElement, {
      key: index,
      style: [themedStyle.item, borderStyle, listItemElement.props.style],
    });
  };

  public render(): React.ReactNode {
    const { themedStyle, showcase } = this.props;

    return (
      <ScrollView
        style={themedStyle.container}
        bounces={false}>
        {showcase.sections.map(this.renderSectionItem)}
      </ScrollView>
    );
  }
}

export const Showcase = withStyles(ShowcaseComponent, (theme: ThemeType) => {
  return {
    container: {
      flex: 1,
      backgroundColor: theme['background-color-default-2'],
    },
    item: {
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    itemBorder: {
      borderBottomWidth: 1,
      borderBottomColor: theme['border-color-default-3'],
    },
  };
});

