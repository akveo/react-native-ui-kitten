import {
  createStackNavigator,
  NavigationRouteConfigMap,
} from 'react-navigation';
import {
  ButtonSimpleUsageShowcase,
  ButtonStatusShowcase,
  ButtonSizeShowcase,
  CheckboxSimpleUsageShowcase,
  CheckboxStatusShowcase,
} from './examples';
import { HomeComponent } from './home.component';
import { createBrowserApp } from '@react-navigation/web';

const routes: NavigationRouteConfigMap = {
  ['Home']: HomeComponent,
  ['ButtonSimpleUsage']: ButtonSimpleUsageShowcase,
  ['ButtonStatus']: ButtonStatusShowcase,
  ['ButtonSize']: ButtonSizeShowcase,
  ['CheckboxSimpleUsage']: CheckboxSimpleUsageShowcase,
  ['CheckboxStatus']: CheckboxStatusShowcase,
};

const Navigator = createStackNavigator(routes, {
  initialRouteName: 'Home',
  headerMode: 'none',
});

export const Router: any = createBrowserApp(Navigator, { history: 'hash' });
