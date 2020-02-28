const FLEX_PREFIX: string = 'flex';
const FLEX_ROW_PREFIX: string = 'row';
const FLEX_WRAP_PREFIX: string = 'wrap';
const FLEX_START_PREFIX: string = 'start';
const FLEX_END_PREFIX: string = 'end';
const FLEX_REVERSE_PREFIX: string = 'reverse';

/**
 * Works with FlexBox style properties that starts with `flex` and ends with `-start` or `-end`
 *
 * E.g justifyContent: flex-start
 */
const FlexStartEndMapper: RTLFlexMapper<string> = {
  toRTL(value: string, rtl: boolean): string {
    if (!rtl || !value.startsWith(FLEX_PREFIX)) {
      return value;
    }

    const isReverse: boolean = value.endsWith(FLEX_END_PREFIX);

    if (isReverse) {
      return `${FLEX_PREFIX}-${FLEX_START_PREFIX}`;
    }

    return `${FLEX_PREFIX}-${FLEX_END_PREFIX}`;
  },
};

/**
 * Works with FlexBox style properties that starts with `row` and optionally ends with `-reverse`
 *
 * E.g flexDirection: row-reverse
 */
const FlexRowMapper: RTLFlexMapper<string> = {
  toRTL(value: string, rtl: boolean): string {
    if (!rtl || !value.startsWith(FLEX_ROW_PREFIX)) {
      return value;
    }

    const isReverse: boolean = value.endsWith(FLEX_REVERSE_PREFIX);

    if (isReverse) {
      return FLEX_ROW_PREFIX;
    }

    return `${FLEX_ROW_PREFIX}-${FLEX_REVERSE_PREFIX}`;
  },
};

/**
 * Works with FlexBox style properties that starts with `wrap` and optionally ends with `-reverse`
 *
 * E.g flexWrap: wrap-reverse
 */
const FlexWrapMapper: RTLFlexMapper<string> = {
  toRTL(value: string, rtl: boolean): string {
    if (!rtl || !value.startsWith(FLEX_WRAP_PREFIX)) {
      return value;
    }

    const isReverse: boolean = value.endsWith(`-${FLEX_REVERSE_PREFIX}`);

    if (isReverse) {
      return FLEX_WRAP_PREFIX;
    }

    return `${FLEX_WRAP_PREFIX}-${FLEX_REVERSE_PREFIX}`;
  },
};

/**
 * Matches FlexBox style properties that can affect on Layout depending on LTR/RTL mode corresponding Mappers
 */
export const RtlFlexMap: Record<string, RTLFlexMapper<any>> = {
  alignContent: FlexStartEndMapper,
  alignItems: FlexStartEndMapper,
  alignSelf: FlexStartEndMapper,
  justifyContent: FlexStartEndMapper,
  flexDirection: FlexRowMapper,
  flexWrap: FlexWrapMapper,
};

interface RTLFlexMapper<T> {
  toRTL(value: T, rtl: boolean): T;
}
