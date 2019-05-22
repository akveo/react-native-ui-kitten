import React from 'react';
import {
  View,
  ScrollView,
  ViewStyle,
  ViewProps,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from '@kitten/theme';
import { Button } from '@kitten/ui';
import {
  ShowcaseSection,
  ShowcaseSectionProps,
} from './showcaseSection.component';
import {
  ComponentShowcase,
  ComponentShowcaseSection,
} from './type';
import { ThemeContext } from '../../themeContext';

interface ComponentProps {
  showcase: ComponentShowcase;
  renderItem: (props: any) => React.ReactElement<any>;
}

export type ShowcaseProps = ThemedComponentProps & ComponentProps;

type ListItemElement = React.ReactElement<ShowcaseSectionProps>;

class ShowcaseComponent extends React.Component<ShowcaseProps> {

  private renderSectionElement = (item: ComponentShowcaseSection): ListItemElement => {
    return (
      <ShowcaseSection
        section={item}
        renderItem={this.props.renderItem}
      />
    );
  };

  private renderItem = (item: ComponentShowcaseSection, index: number): ListItemElement => {
    const { themedStyle, showcase } = this.props;

    const listItemElement: ListItemElement = this.renderSectionElement(item);

    const borderStyle: ViewStyle | null = index === showcase.sections.length - 1 ? null : themedStyle.itemBorder;

    return React.cloneElement(listItemElement, {
      key: index,
      style: [themedStyle.item, borderStyle, listItemElement.props.style],
    });
  };

  private isThemeButtonDisabled = (currentTheme: string, buttonResponsibility: string): boolean => {
    if (currentTheme === 'light' && buttonResponsibility === 'light') {
      return true;
    } else if (currentTheme === 'dark' && buttonResponsibility === 'light') {
      return false;
    } else if (currentTheme === 'light' && buttonResponsibility === 'dark') {
      return false;
    } else if (currentTheme === 'dark' && buttonResponsibility === 'dark') {
      return true;
    }
  };

  public render(): React.ReactNode {
    const { themedStyle, showcase } = this.props;

    return (
      <ThemeContext.Consumer>{({ currentTheme, toggleTheme}): React.ReactElement<ViewProps> => (
        <View style={themedStyle.container}>
          <View style={themedStyle.themeButtonsContainer}>
            <Button
              disabled={this.isThemeButtonDisabled(currentTheme, 'light')}
              onPress={() => toggleTheme('light')}>
              Light
            </Button>
            <Button
              disabled={this.isThemeButtonDisabled(currentTheme, 'dark')}
              onPress={() => toggleTheme('dark')}>
              Dark
            </Button>
          </View>
          <ScrollView style={themedStyle.container}>
            {showcase.sections.map(this.renderItem)}
          </ScrollView>
        </View>
      )}</ThemeContext.Consumer>
    );
  }
}

export const Showcase = withStyles(ShowcaseComponent, (theme: ThemeType) => ({
  container: {
    flex: 1,
  },
  themeButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 16,
  },
  item: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme['color-basic-200'],
  },
}));
