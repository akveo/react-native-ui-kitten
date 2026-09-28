import React, { useCallback, useContext, useEffect, useRef } from 'react';
import { FlatList, Linking, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Button, Layout, Text, Divider } from '@ui-kitten/components';
import { AppMapping, AppTheme, ThemeContext } from '../services/theme.service';

// Basic components
import { ButtonSimpleUsageShowcase } from '../components/button/buttonSimpleUsage.component';
import { InputSimpleUsageShowcase } from '../components/input/inputSimpleUsage.component';
import { InputAccessoriesShowcase } from '../components/input/inputAccessories.component';
import { CheckboxSimpleUsageShowcase } from '../components/checkbox/checkboxSimpleUsage.component';
import { ToggleSimpleUsageShowcase } from '../components/toggle/toggleSimpleUsage.component';
import { RadioSimpleUsageShowcase } from '../components/radio/radioSimpleUsage.component';
import { RadioGroupSimpleUsageShowcase } from '../components/radioGroup/radioGroupSimpleUsage.component';
import { CardSimpleUsageShowcase } from '../components/card/cardSimpleUsage.component';
import { CardLayoutShowcase } from '../components/card/cardLayout.component';
import { TopNavigationSubtitleShowcase } from '../components/topNavigation/topNavigationSubtitle.component';
import { TooltipEdgeShowcase } from '../components/tooltip/tooltipEdge.component';
import { CalendarHermesShowcase } from '../components/calendar/calendarHermes.component';
import { AvatarSimpleUsageShowcase } from '../components/avatar/avatarSimpleUsage.component';
import { SpinnerSimpleUsageShowcase } from '../components/spinner/spinnerSimpleUsage.component';
import { DividerSimpleUsageShowcase } from '../components/divider/dividerSimpleUsage.component';
import { IconSimpleUsageShowcase } from '../components/icon/iconSimpleUsage.component';
import { LayoutLevelShowcase } from '../components/layout/layoutLevel.component';
import { ButtonGroupSimpleUsageShowcase } from '../components/buttonGroup/buttonGroupSimpleUsage.component';
import { ProgressBarSimpleUsageShowcase } from '../components/progressBar/progressBarSimpleUsage.component';
import { CircularProgressBarSimpleUsageShowcase } from '../components/circularProgressBar/circularProgressBarSimpleUsage.component';

// List components
import { ListSimpleUsageShowcase } from '../components/list/listSimpleUsage.component';
import { ListItemSimpleUsageShowcase } from '../components/list/listItemSimpleUsage.component';
import { MenuSimpleUsageShowcase } from '../components/menu/menuSimpleUsage.component';
import { MenuItemSimpleUsageShowcase } from '../components/menu/menuItemSimpleUsage.component';
import { SelectSimpleUsageShowcase } from '../components/select/selectSimpleUsage.component';
import { SelectSizeShowcase } from '../components/select/selectSize.component';
import { SelectItemSimpleUsageShowcase } from '../components/select/selectItemSimpleUsage.component';

// Popover-based components
import { PopoverSimpleUsageShowcase } from '../components/popover/popoverSimpleUsage.component';
import { PopoverAnchorFlexShowcase } from '../components/popover/popoverAnchorFlex.component';
import { TooltipSimpleUsageShowcase } from '../components/tooltip/tooltipSimpleUsage.component';
import { OverflowMenuSimpleUsageShowcase } from '../components/overflowMenu/overflowMenuSimpleUsage.component';
import { ModalSimpleUsageShowcase } from '../components/modal/modalSimpleUsage.component';

// Navigation components
import { TopNavigationSimpleUsageShowcase } from '../components/topNavigation/topNavigationSimpleUsage.component';
import { TopNavigationActionSimpleUsageShowcase } from '../components/topNavigation/topNavigationActionSimpleUsage.component';
import { BottomNavigationSimpleUsageShowcase } from '../components/bottomNavigation/bottomNavigationSimpleUsage.component';
import { BottomNavigationTabSimpleUsageShowcase } from '../components/bottomNavigation/bottomNavigationTabSimpleUsage.component';
import { TabSimpleUsageShowcase } from '../components/tab/tabSimpleUsage.component';
import { TabBarSimpleUsageShowcase } from '../components/tab/tabBarSimpleUsage.component';
import { TabViewSimpleUsageShowcase } from '../components/tab/tabViewSimpleUsage.component';
import { DrawerSimpleUsageShowcase } from '../components/drawer/drawerSimpleUsage.component';
import { DrawerItemSimpleUsageShowcase } from '../components/drawer/drawerItemSimpleUsage.component';

// Calendar/Date components
import { CalendarSimpleUsageShowcase } from '../components/calendar/calendarSimpleUsage.component';
import { CalendarFiltersShowcase } from '../components/calendar/calendarFilters.component';
import { CalendarMomentShowcase } from '../components/calendar/calendarMoment.component';
import { RangeCalendarSimpleUsageShowcase } from '../components/calendar/rangeCalendarSimpleUsage.component';
import { RangeCalendarFiltersShowcase } from '../components/calendar/rangeCalendarFilters.component';
import { DatepickerSimpleUsageShowcase } from '../components/datepicker/datepickerSimpleUsage.component';
import { RangeDatepickerSimpleUsageShowcase } from '../components/datepicker/rangeDatepickerSimpleUsage.component';

// Other components
import { AutocompleteSimpleUsageShowcase } from '../components/autocomplete/autocompleteSimpleUsage.component';
import { AutocompleteBlurShowcase } from '../components/autocomplete/autocompleteBlur.component';
import { ViewPagerSimpleUsageShowcase } from '../components/viewPager/viewPagerSimpleUsage.component';
import { ModalDecimalSizeShowcase } from '../components/modal/modalDecimalSize.component';
import { SelectScrollToSelectedShowcase } from '../components/select/selectScrollToSelected.component';
import { SelectPlacementShowcase } from '../components/select/selectPlacement.component';
import { ButtonGroupToggleShowcase } from '../components/buttonGroup/buttonGroupToggle.component';
import { DatepickerFullWidthShowcase } from '../components/datepicker/datepickerFullWidth.component';
import { AvatarInitialsShowcase } from '../components/avatar/avatarInitials.component';
import { InputNativeRefShowcase } from '../components/input/inputNativeRef.component';
import { ViewPagerIndicatorShowcase } from '../components/viewPager/viewPagerIndicator.component';
import {
  IconGallery1Showcase,
  IconGallery2Showcase,
  IconGallery3Showcase,
  IconGallery4Showcase,
  IconGallery5Showcase,
} from '../components/icon/iconGallery.component';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View
    style={styles.section}
    testID={`section-${title}`}
  >
    <Text
      category="h6"
      style={styles.sectionTitle}
      testID={`section-${title}-title`}
    >
      {title}
    </Text>
    <View style={styles.sectionContent}>
      {children}
    </View>
    <Divider style={styles.divider} />
  </View>
);

const ThemeSwitchHeader: React.FC = () => {
  const { theme, mapping, setTheme, setMapping } = useContext(ThemeContext);

  const toggleTheme = () => {
    setTheme((prev) => prev === AppTheme.light ? AppTheme.dark : AppTheme.light);
  };

  const toggleMapping = () => {
    setMapping((prev) => prev === AppMapping.eva ? AppMapping.material : AppMapping.eva);
  };

  return (
    <Layout style={styles.header} level="1">
      <Text
        category="s1"
        style={styles.headerLabel}
        testID="theme-label"
      >
        {mapping} / {theme}
      </Text>
      <View style={styles.headerButtons}>
        <Button
          size="small"
          appearance="outline"
          style={styles.headerButton}
          testID="toggle-theme"
          onPress={toggleTheme}
        >
          {theme === AppTheme.light ? 'DARK' : 'LIGHT'}
        </Button>
        <Button
          size="small"
          appearance="outline"
          style={styles.headerButton}
          testID="toggle-mapping"
          onPress={toggleMapping}
        >
          {mapping === AppMapping.eva ? 'MATERIAL' : 'EVA'}
        </Button>
      </View>
    </Layout>
  );
};

interface ShowcaseSection {
  title: string;
  Component: React.ComponentType;
}

// One entry per component. The list renders each as a titled section, in order.
const SECTIONS: ShowcaseSection[] = [
  { title: 'Layout', Component: LayoutLevelShowcase },
  { title: 'Button', Component: ButtonSimpleUsageShowcase },
  { title: 'ButtonGroup', Component: ButtonGroupSimpleUsageShowcase },
  { title: 'Input', Component: InputSimpleUsageShowcase },
  { title: 'InputAccessories', Component: InputAccessoriesShowcase },
  { title: 'CheckBox', Component: CheckboxSimpleUsageShowcase },
  { title: 'Toggle', Component: ToggleSimpleUsageShowcase },
  { title: 'Radio', Component: RadioSimpleUsageShowcase },
  { title: 'RadioGroup', Component: RadioGroupSimpleUsageShowcase },
  { title: 'Card', Component: CardSimpleUsageShowcase },
  { title: 'Avatar', Component: AvatarSimpleUsageShowcase },
  { title: 'Spinner', Component: SpinnerSimpleUsageShowcase },
  { title: 'ProgressBar', Component: ProgressBarSimpleUsageShowcase },
  { title: 'CircularProgressBar', Component: CircularProgressBarSimpleUsageShowcase },
  { title: 'Divider', Component: DividerSimpleUsageShowcase },
  { title: 'Icon', Component: IconSimpleUsageShowcase },
  { title: 'List', Component: ListSimpleUsageShowcase },
  { title: 'ListItem', Component: ListItemSimpleUsageShowcase },
  { title: 'Menu', Component: MenuSimpleUsageShowcase },
  { title: 'MenuItem', Component: MenuItemSimpleUsageShowcase },
  { title: 'Select', Component: SelectSimpleUsageShowcase },
  { title: 'SelectSize', Component: SelectSizeShowcase },
  { title: 'SelectItem', Component: SelectItemSimpleUsageShowcase },
  { title: 'Popover', Component: PopoverSimpleUsageShowcase },
  { title: 'Tooltip', Component: TooltipSimpleUsageShowcase },
  { title: 'OverflowMenu', Component: OverflowMenuSimpleUsageShowcase },
  { title: 'Modal', Component: ModalSimpleUsageShowcase },
  { title: 'TopNavigation', Component: TopNavigationSimpleUsageShowcase },
  { title: 'TopNavigationAction', Component: TopNavigationActionSimpleUsageShowcase },
  { title: 'BottomNavigation', Component: BottomNavigationSimpleUsageShowcase },
  { title: 'BottomNavigationTab', Component: BottomNavigationTabSimpleUsageShowcase },
  { title: 'Tab', Component: TabSimpleUsageShowcase },
  { title: 'TabBar', Component: TabBarSimpleUsageShowcase },
  { title: 'TabView', Component: TabViewSimpleUsageShowcase },
  { title: 'Drawer', Component: DrawerSimpleUsageShowcase },
  { title: 'DrawerItem', Component: DrawerItemSimpleUsageShowcase },
  { title: 'Calendar', Component: CalendarSimpleUsageShowcase },
  { title: 'CalendarFilters', Component: CalendarFiltersShowcase },
  { title: 'CalendarMoment', Component: CalendarMomentShowcase },
  { title: 'RangeCalendar', Component: RangeCalendarSimpleUsageShowcase },
  { title: 'RangeCalendarFilters', Component: RangeCalendarFiltersShowcase },
  { title: 'Datepicker', Component: DatepickerSimpleUsageShowcase },
  { title: 'RangeDatepicker', Component: RangeDatepickerSimpleUsageShowcase },
  { title: 'Autocomplete', Component: AutocompleteSimpleUsageShowcase },
  { title: 'ViewPager', Component: ViewPagerSimpleUsageShowcase },
  { title: 'IconGallery1', Component: IconGallery1Showcase },
  { title: 'IconGallery2', Component: IconGallery2Showcase },
  { title: 'IconGallery3', Component: IconGallery3Showcase },
  { title: 'IconGallery4', Component: IconGallery4Showcase },
  { title: 'IconGallery5', Component: IconGallery5Showcase },
  { title: 'ModalDecimalSize', Component: ModalDecimalSizeShowcase },
  { title: 'CardLayout', Component: CardLayoutShowcase },
  { title: 'TopNavigationSubtitle', Component: TopNavigationSubtitleShowcase },
  { title: 'TooltipEdge', Component: TooltipEdgeShowcase },
  { title: 'CalendarHermes', Component: CalendarHermesShowcase },
  { title: 'PopoverAnchorFlex', Component: PopoverAnchorFlexShowcase },
  { title: 'AutocompleteBlur', Component: AutocompleteBlurShowcase },
  { title: 'SelectScrollToSelected', Component: SelectScrollToSelectedShowcase },
  { title: 'SelectPlacement', Component: SelectPlacementShowcase },
  { title: 'ButtonGroupToggle', Component: ButtonGroupToggleShowcase },
  { title: 'DatepickerFullWidth', Component: DatepickerFullWidthShowcase },
  { title: 'AvatarInitials', Component: AvatarInitialsShowcase },
  { title: 'InputNativeRef', Component: InputNativeRefShowcase },
  { title: 'ViewPagerIndicator', Component: ViewPagerIndicatorShowcase },
];

const keyExtractor = (item: ShowcaseSection): string => item.title;

const ListHeader = (): React.ReactElement => (
  <>
    <Text category="h1" style={styles.title}>UI Kitten Components</Text>
    <Text category="p1" style={styles.subtitle}>Component Showcase</Text>
  </>
);

const ListFooter = (): React.ReactElement => (
  <View style={styles.footer}>
    <Text category="c1" appearance="hint">
      End of Component Showcase
    </Text>
  </View>
);

/**
 * `uikitten-showcases://section/<Title>` (the `title` of a section below) scrolls the list so that
 * the section starts at the top. Replay scripts open it instead of counting scroll gestures, which
 * break whenever a section is added above the one they need.
 */
const SECTION_LINK = /^uikitten-showcases:\/\/section\/([^/?#]+)/;

const sectionIndexFromUrl = (url: string | null): number => {
  const match = url ? SECTION_LINK.exec(url) : null;
  if (!match) {
    return -1;
  }
  const title = decodeURIComponent(match[1]);
  return SECTIONS.findIndex(section => section.title === title);
};

export const AppNavigator = (): React.ReactElement => {
  const listRef = useRef<FlatList<ShowcaseSection>>(null);

  const scrollToSection = useCallback((index: number): void => {
    if (index < 0) {
      return;
    }
    listRef.current?.scrollToIndex({ index, animated: false, viewPosition: 0 });
  }, []);

  useEffect(() => {
    // The initial URL arrives before the list has laid out its rows; the retry in
    // `onScrollToIndexFailed` covers a row that has no frame yet.
    Linking.getInitialURL().then(url => scrollToSection(sectionIndexFromUrl(url)));
    const subscription = Linking.addEventListener('url', ({ url }) => {
      scrollToSection(sectionIndexFromUrl(url));
    });
    return () => subscription.remove();
  }, [scrollToSection]);

  const onScrollToIndexFailed = useCallback(({ index, averageItemLength }: {
    index: number;
    averageItemLength: number;
  }): void => {
    listRef.current?.scrollToOffset({ offset: index * averageItemLength, animated: false });
    setTimeout(() => scrollToSection(index), 250);
  }, [scrollToSection]);

  const renderSection = useCallback(({ item }: ListRenderItemInfo<ShowcaseSection>): React.ReactElement => (
    <Section title={item.title}>
      <item.Component />
    </Section>
  ), []);

  return (
    <Layout style={styles.container}>
      <ThemeSwitchHeader />
      {/*
        A FlatList rather than a ScrollView: several showcases (List, Menu, Drawer) are
        VirtualizedLists, and React Native warns when those sit inside a plain ScrollView.
        No `keyboardShouldPersistTaps` on purpose: the default `'never'` is what exercises the
        library's modal panel (the first tap on an Autocomplete option must select it).
      */}
      <FlatList
        ref={listRef}
        data={SECTIONS}
        renderItem={renderSection}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        ListFooterComponent={ListFooter}
        contentContainerStyle={styles.scrollContent}
        initialNumToRender={SECTIONS.length}
        testID="showcase-scroll"
        onScrollToIndexFailed={onScrollToIndexFailed}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 52,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E4E9F2',
  },
  headerLabel: {
    flexShrink: 1,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    minWidth: 80,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginVertical: 8,
  },
  sectionTitle: {
    marginBottom: 12,
    color: '#3366FF',
  },
  sectionContent: {
    marginBottom: 8,
  },
  divider: {
    marginTop: 16,
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
    paddingVertical: 16,
  },
});
