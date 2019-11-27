import { createStackNavigator } from 'react-navigation-stack';
import { ComponentsScreen } from '@pg/scenes/components/components.component';
import { AvatarScreen } from '@pg/scenes/avatar/avatar.component';
import { BottomNavigationScreen } from '@pg/scenes/bottomNavigation/bottomNavigation.component';
import { ButtonScreen } from '@pg/scenes/button/button.component';
import { ButtonGroupScreen } from '@pg/scenes/buttonGroup/buttonGroup.component';
import { CalendarScreen } from '@pg/scenes/calendar/calendar.component';
import { CardScreen } from '@pg/scenes/card/card.component';
import { RangeCalendarScreen } from '@pg/scenes/rangeCalendar/rangeCalendar.component';
import { IconScreen } from '@pg/scenes/icon/icon.component';
import { DrawerScreen } from '@pg/scenes/drawer/drawer.component';
import { CheckBoxScreen } from '@pg/scenes/checkbox/checkbox.component';
import { DatepickerScreen } from '@pg/scenes/datepicker/datepicker.component';
import { InputScreen } from '@pg/scenes/input/input.component';
import { ModalScreen } from '@pg/scenes/modal/modal.component';
import { MenuScreen } from '@pg/scenes/menu/menu.component';
import { ListScreen } from '@pg/scenes/list/list.component';
import { LayoutScreen } from '@pg/scenes/layout/layout.component';
import { PopoverScreen } from '@pg/scenes/popover/popover.component';
import { RadioScreen } from '@pg/scenes/radio/radio.component';
import { RadioGroupScreen } from '@pg/scenes/radioGroup/radioGroup.component';
import { SpinnerScreen } from '@pg/scenes/spinner/spinner.component';
import { TabViewScreen } from '@pg/scenes/tabView/tabView.component';
import { TooltipScreen } from '@pg/scenes/tooltip/tooltip.component';
import { TextScreen } from '@pg/scenes/text/text.component';
import { TopNavigationScreen } from '@pg/scenes/topNavigation/topNavigation.component';
import { ToggleScreen } from '@pg/scenes/toggle/toggle.component';
import { SelectScreen } from '@pg/scenes/select/select.component';
import { OverflowMenuScreen } from '@pg/scenes/overflowMenu/overflowMenu.component';

export const ComponentsNavigator = createStackNavigator({
  ['Components']: ComponentsScreen,
  ['Avatar']: AvatarScreen,
  ['BottomNavigation']: BottomNavigationScreen,
  ['Button']: ButtonScreen,
  ['ButtonGroup']: ButtonGroupScreen,
  ['Calendar']: CalendarScreen,
  ['Card']: CardScreen,
  ['RangeCalendar']: RangeCalendarScreen,
  ['CheckBox']: CheckBoxScreen,
  ['Drawer']: DrawerScreen,
  ['Datepicker']: DatepickerScreen,
  ['Icon']: IconScreen,
  ['Input']: InputScreen,
  ['Layout']: LayoutScreen,
  ['List']: ListScreen,
  ['Menu']: MenuScreen,
  ['Modal']: ModalScreen,
  ['Popover']: PopoverScreen,
  ['Radio']: RadioScreen,
  ['RadioGroup']: RadioGroupScreen,
  ['Spinner']: SpinnerScreen,
  ['TabView']: TabViewScreen,
  ['Tooltip']: TooltipScreen,
  ['Text']: TextScreen,
  ['Toggle']: ToggleScreen,
  ['TopNavigation']: TopNavigationScreen,
  ['OverflowMenu']: OverflowMenuScreen,
  ['Select']: SelectScreen,
}, {
  headerMode: 'none',
});
