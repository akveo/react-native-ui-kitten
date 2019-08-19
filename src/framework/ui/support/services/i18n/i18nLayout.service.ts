import {
  I18nManager,
  ViewStyle,
} from 'react-native';
import { I18nLayoutFlexMap } from './i18nLayoutFlexMap';
import { I18nLayoutServiceType } from './type';

class NativeI18nLayoutService implements I18nLayoutServiceType {

  public isRTL(): boolean {
    return I18nManager.isRTL;
  }

  public select<T>(ltr: T, rtl): T {
    return this.isRTL() ? rtl : ltr;
  }

  /**
   * Iterates through I18nLayoutFlexMap and reverses style values if needed.
   *
   * @param {ViewStyle} source - style to convert
   * @param {boolean} rtl - is layout currently in RTL mode (Needed for tests, because unable to mock this)
   *
   * @returns {ViewStyle} - style reversed to fit i18n
   */
  public toI18nStyle(source: ViewStyle, rtl: boolean = this.isRTL()): ViewStyle {
    const i18nStyle: ViewStyle = Object.keys(I18nLayoutFlexMap).reduce((style: ViewStyle, prop: string): ViewStyle => {
      const currentStyleValue = source[prop];
      if (currentStyleValue) {
        const i18nStyleValue = I18nLayoutFlexMap[prop].toI18n(currentStyleValue, rtl);
        return { ...style, [prop]: i18nStyleValue };
      }

      return style;
    }, {});

    return { ...source, ...i18nStyle };
  }
}

export const I18nLayoutService = new NativeI18nLayoutService();
