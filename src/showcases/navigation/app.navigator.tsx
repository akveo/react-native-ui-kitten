import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Layout, Text, Divider } from '@ui-kitten/components';
import { AppMapping, AppTheme, ThemeContext } from '../services/theme.service';

// Basic components
import { ButtonSimpleUsageShowcase } from '../components/button/buttonSimpleUsage.component';
import { InputSimpleUsageShowcase } from '../components/input/inputSimpleUsage.component';
import { CheckboxSimpleUsageShowcase } from '../components/checkbox/checkboxSimpleUsage.component';
import { ToggleSimpleUsageShowcase } from '../components/toggle/toggleSimpleUsage.component';
import { RadioSimpleUsageShowcase } from '../components/radio/radioSimpleUsage.component';
import { RadioGroupSimpleUsageShowcase } from '../components/radioGroup/radioGroupSimpleUsage.component';
import { CardSimpleUsageShowcase } from '../components/card/cardSimpleUsage.component';
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
import { SelectItemSimpleUsageShowcase } from '../components/select/selectItemSimpleUsage.component';

// Popover-based components
import { PopoverSimpleUsageShowcase } from '../components/popover/popoverSimpleUsage.component';
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
import { RangeCalendarSimpleUsageShowcase } from '../components/calendar/rangeCalendarSimpleUsage.component';
import { DatepickerSimpleUsageShowcase } from '../components/datepicker/datepickerSimpleUsage.component';
import { RangeDatepickerSimpleUsageShowcase } from '../components/datepicker/rangeDatepickerSimpleUsage.component';

// Other components
import { AutocompleteSimpleUsageShowcase } from '../components/autocomplete/autocompleteSimpleUsage.component';
import { ViewPagerSimpleUsageShowcase } from '../components/viewPager/viewPagerSimpleUsage.component';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <View style={styles.section}>
    <Text category="h6" style={styles.sectionTitle}>{title}</Text>
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
      <Text category="s1" style={styles.headerLabel}>
        {mapping} / {theme}
      </Text>
      <View style={styles.headerButtons}>
        <Button
          size="small"
          appearance="outline"
          style={styles.headerButton}
          onPress={toggleTheme}
        >
          {theme === AppTheme.light ? 'DARK' : 'LIGHT'}
        </Button>
        <Button
          size="small"
          appearance="outline"
          style={styles.headerButton}
          onPress={toggleMapping}
        >
          {mapping === AppMapping.eva ? 'MATERIAL' : 'EVA'}
        </Button>
      </View>
    </Layout>
  );
};

export const AppNavigator = (): React.ReactElement => {
  return (
    <Layout style={styles.container}>
      <ThemeSwitchHeader />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text category="h1" style={styles.title}>UI Kitten Components</Text>
        <Text category="p1" style={styles.subtitle}>Component Showcase</Text>

        {/* Basic Components */}
        <Section title="Layout">
          <LayoutLevelShowcase />
        </Section>

        <Section title="Button">
          <ButtonSimpleUsageShowcase />
        </Section>

        <Section title="ButtonGroup">
          <ButtonGroupSimpleUsageShowcase />
        </Section>

        <Section title="Input">
          <InputSimpleUsageShowcase />
        </Section>

        <Section title="CheckBox">
          <CheckboxSimpleUsageShowcase />
        </Section>

        <Section title="Toggle">
          <ToggleSimpleUsageShowcase />
        </Section>

        <Section title="Radio">
          <RadioSimpleUsageShowcase />
        </Section>

        <Section title="RadioGroup">
          <RadioGroupSimpleUsageShowcase />
        </Section>

        <Section title="Card">
          <CardSimpleUsageShowcase />
        </Section>

        <Section title="Avatar">
          <AvatarSimpleUsageShowcase />
        </Section>

        <Section title="Spinner">
          <SpinnerSimpleUsageShowcase />
        </Section>

        <Section title="ProgressBar">
          <ProgressBarSimpleUsageShowcase />
        </Section>

        <Section title="CircularProgressBar">
          <CircularProgressBarSimpleUsageShowcase />
        </Section>

        <Section title="Divider">
          <DividerSimpleUsageShowcase />
        </Section>

        <Section title="Icon">
          <IconSimpleUsageShowcase />
        </Section>

        {/* List Components */}
        <Section title="List">
          <ListSimpleUsageShowcase />
        </Section>

        <Section title="ListItem">
          <ListItemSimpleUsageShowcase />
        </Section>

        <Section title="Menu">
          <MenuSimpleUsageShowcase />
        </Section>

        <Section title="MenuItem">
          <MenuItemSimpleUsageShowcase />
        </Section>

        <Section title="Select">
          <SelectSimpleUsageShowcase />
        </Section>

        <Section title="SelectItem">
          <SelectItemSimpleUsageShowcase />
        </Section>

        {/* Popover-based Components */}
        <Section title="Popover">
          <PopoverSimpleUsageShowcase />
        </Section>

        <Section title="Tooltip">
          <TooltipSimpleUsageShowcase />
        </Section>

        <Section title="OverflowMenu">
          <OverflowMenuSimpleUsageShowcase />
        </Section>

        <Section title="Modal">
          <ModalSimpleUsageShowcase />
        </Section>

        {/* Navigation Components */}
        <Section title="TopNavigation">
          <TopNavigationSimpleUsageShowcase />
        </Section>

        <Section title="TopNavigationAction">
          <TopNavigationActionSimpleUsageShowcase />
        </Section>

        <Section title="BottomNavigation">
          <BottomNavigationSimpleUsageShowcase />
        </Section>

        <Section title="BottomNavigationTab">
          <BottomNavigationTabSimpleUsageShowcase />
        </Section>

        <Section title="Tab">
          <TabSimpleUsageShowcase />
        </Section>

        <Section title="TabBar">
          <TabBarSimpleUsageShowcase />
        </Section>

        <Section title="TabView">
          <TabViewSimpleUsageShowcase />
        </Section>

        <Section title="Drawer">
          <DrawerSimpleUsageShowcase />
        </Section>

        <Section title="DrawerItem">
          <DrawerItemSimpleUsageShowcase />
        </Section>

        {/* Calendar/Date Components */}
        <Section title="Calendar">
          <CalendarSimpleUsageShowcase />
        </Section>

        <Section title="RangeCalendar">
          <RangeCalendarSimpleUsageShowcase />
        </Section>

        <Section title="Datepicker">
          <DatepickerSimpleUsageShowcase />
        </Section>

        <Section title="RangeDatepicker">
          <RangeDatepickerSimpleUsageShowcase />
        </Section>

        {/* Other Components */}
        <Section title="Autocomplete">
          <AutocompleteSimpleUsageShowcase />
        </Section>

        <Section title="ViewPager">
          <ViewPagerSimpleUsageShowcase />
        </Section>

        <View style={styles.footer}>
          <Text category="c1" appearance="hint">
            End of Component Showcase
          </Text>
        </View>
      </ScrollView>
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
