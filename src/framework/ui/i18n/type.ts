import { FlexStyle } from 'react-native';

export interface RTLManaging {
  /**
   * Should return true if it is Right-to-Left layout
   */
  isRTL(): boolean;


  /**
   * Should update layout to Right-to-Left according to `rtl` value
   */
  setRTL(rtl: boolean);
}

export interface RTLLayoutManaging {
  /**
   * Should convert flex-box value to an RTL one, ignoring RTL, e.g flex-start to flex-end
   */
  ignoreRTLFlexStyle(value: FlexStyle): FlexStyle;

  /**
   * Should convert numeric value to an RTL one, e.g 1 to -1
   */
  toRTLNumber(value: number): number;
}
