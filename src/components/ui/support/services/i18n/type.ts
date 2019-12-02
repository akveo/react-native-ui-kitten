import { ViewStyle } from 'react-native';

export interface I18nLayoutServiceType {
  /**
   * Should return true if it is Right-to-Left layout
   */
  isRTL(): boolean;

  /**
   * Should select a value depending on current layout mode (LTR/RTL)
   */
  select<T>(ltrValue: T, rtlValue: T): T;

  /**
   * Should convert flex-box value to an RTL one, ignoring RTL, e.g flex-start to flex-end
   *
   * @param {ViewStyle} source - style to convert
   */
  toI18nStyle(source: ViewStyle): ViewStyle;
}
