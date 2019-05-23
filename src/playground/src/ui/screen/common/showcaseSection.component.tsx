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
import {
  ShowcaseItem,
  ShowcaseItemProps,
} from './showcaseItem.component';
import {
  ComponentShowcaseItem,
  ComponentShowcaseSection as ComponentShowcaseSectionModel,
} from './type';

interface ComponentProps {
  section: ComponentShowcaseSectionModel;
  renderItem: (props: any) => React.ReactElement<any>;
}

export type ShowcaseSectionProps = ThemedComponentProps & ViewProps & ComponentProps;

class ShowcaseSectionComponent extends React.Component<ShowcaseSectionProps> {

  private renderItem = (item: ComponentShowcaseItem, index: number): React.ReactElement<ShowcaseItemProps> => {
    const { themedStyle, renderItem } = this.props;

    return (
      <ShowcaseItem
        key={index}
        style={themedStyle.item}
        item={item}
        renderItem={renderItem}
      />
    );
  };

  public render(): React.ReactNode {
    const { style, themedStyle, section } = this.props;

    return (
      <View style={[themedStyle.container, style]}>
        <Text style={themedStyle.titleLabel}>{section.title}</Text>
        {section.items.map(this.renderItem)}
      </View>
    );
  }
}

export const ShowcaseSection = withStyles(ShowcaseSectionComponent, (theme: ThemeType) => ({
  container: {},
  titleLabel: {
    marginVertical: 8,
    fontSize: 20,
    lineHeight: 28,
  },
  item: {
    marginVertical: 8,
  },
}));
