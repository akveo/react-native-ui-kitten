import {
  FlexStyle,
  I18nManager,
  ViewStyle,
} from 'react-native';
import {
  RTLLayoutManaging,
  RTLManaging,
} from './type';

type StyleSheetFlexStyle = ViewStyle;

class ReactNativeRTLService implements RTLManaging, RTLLayoutManaging {

  public isRTL(): boolean {
    return I18nManager.isRTL;
  }

  public setRTL(rtl: boolean) {
    I18nManager.forceRTL(rtl);
  }

  public ignoreRTLFlexStyle(style: StyleSheetFlexStyle): FlexStyle {
    const rtlStyle: FlexStyle = Object.keys(RTLFlexStyleValueMap).reduce((acc: FlexStyle, key: string): FlexStyle => {
      const currentValue = style[key];
      const rtlValue = currentValue && RTLFlexStyleValueMap[key].toRTLValue(currentValue, this.isRTL());

      return { ...acc, [key]: rtlValue || currentValue };
    }, {});

    return { ...style, ...rtlStyle };
  }


  public toRTLNumber(value: number): number {
    return this.isRTL() ? -value : value;
  }
}


const RTLFlexStartEnd: RTLFlexStyleValueMapper<string> = {
  toRTLValue(value: string, rtl: boolean): string {
    if (!rtl || !value.startsWith('flex')) {
      return value;
    }

    const isReverse: boolean = value.endsWith('end');

    const replacement: string = isReverse ? 'start' : 'end';
    const replacer: string = isReverse ? 'end' : 'start';

    return value.replace(replacement, replacer);
  },
};

const RTLFlexRowColumn: RTLFlexStyleValueMapper<string> = {
  toRTLValue(value: string, rtl: boolean): string {
    if (!rtl || !value.startsWith('row')) {
      return value;
    }

    const isReverse: boolean = value.endsWith('-reverse');

    if (isReverse) {
      return value.replace('-reverse', '');
    }

    return value.concat('-reverse');

  },
};

const RTLFlexWrap: RTLFlexStyleValueMapper<string> = {
  toRTLValue(value: string, rtl: boolean): string {
    if (!rtl || !value.startsWith('wrap')) {
      return value;
    }

    const isReverse: boolean = value.endsWith('-reverse');

    if (isReverse) {
      return value.replace('-reverse', '');
    }

    return value.concat('-reverse');
  },
};

const RTLFlexStyleValueMap: { [key: string]: RTLFlexStyleValueMapper<any> } = {
  alignContent: RTLFlexStartEnd,
  alignItems: RTLFlexStartEnd,
  alignSelf: RTLFlexStartEnd,
  justifyContent: RTLFlexStartEnd,
  flexDirection: RTLFlexRowColumn,
  flexWrap: RTLFlexWrap,
};

interface RTLFlexStyleValueMapper<T> {
  toRTLValue(value: T, rtl: boolean): T;
}

export const RTLService = new ReactNativeRTLService();
