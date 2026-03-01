/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Copyright (c) 2024-2026 Vlad Bataev and UI Kitten Contributors.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  FlexStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';
import {
  Frame,
  RTLService,
} from '../../devsupport';

// ============================================================================
// Offset Types and Utilities
// ============================================================================

export interface Offset {
  rawValue: string;
  apply(frame: Frame, value: number): Frame;
}

const createOffset = (rawValue: string, apply: (frame: Frame, value: number) => Frame): Offset => ({
  rawValue,
  apply,
});

export class Offsets {
  static MARGIN = createOffset('margin', (_, value) =>
    new Frame(value, value, value, value)
  );

  static MARGIN_HORIZONTAL = createOffset('marginHorizontal', (frame, value) =>
    new Frame(value, frame.origin.y, value, frame.size.height)
  );

  static MARGIN_VERTICAL = createOffset('marginVertical', (frame, value) =>
    new Frame(frame.origin.x, value, frame.size.width, value)
  );

  static MARGIN_LEFT = createOffset('marginLeft', (frame, value) =>
    new Frame(value, frame.origin.y, frame.size.width, frame.size.height)
  );

  static MARGIN_TOP = createOffset('marginTop', (frame, value) =>
    new Frame(frame.origin.x, value, frame.size.width, frame.size.height)
  );

  static MARGIN_RIGHT = createOffset('marginRight', (frame, value) =>
    new Frame(frame.origin.x, frame.origin.y, value, frame.size.height)
  );

  static MARGIN_BOTTOM = createOffset('marginBottom', (frame, value) =>
    new Frame(frame.origin.x, frame.origin.y, frame.size.width, value)
  );

  private static ALL_OFFSETS: Offset[] = [
    Offsets.MARGIN,
    Offsets.MARGIN_HORIZONTAL,
    Offsets.MARGIN_VERTICAL,
    Offsets.MARGIN_LEFT,
    Offsets.MARGIN_TOP,
    Offsets.MARGIN_RIGHT,
    Offsets.MARGIN_BOTTOM,
  ];

  static find(source: StyleProp<FlexStyle>): Frame {
    const flatStyle: FlexStyle = StyleSheet.flatten(source) || {};
    const offsetKeys = Offsets.ALL_OFFSETS.map((o) => o.rawValue);

    return Object.keys(flatStyle)
      .filter((key) => offsetKeys.includes(key))
      .reduce((acc: Frame, key: string): Frame => {
        const value = flatStyle[key as keyof FlexStyle] as number;
        const offsetValue = Offsets.parse(key);
        return offsetValue ? offsetValue.apply(acc, value) : acc;
      }, Frame.zero());
  }

  static parse(value: string | Offset, fallback?: Offset): Offset | undefined {
    if (typeof value !== 'string') {
      return value;
    }
    return Offsets.ALL_OFFSETS.find((o) => o.rawValue === value) || fallback;
  }
}

// ============================================================================
// Placement Options
// ============================================================================

export class PlacementOptions {
  constructor(
    readonly source: Frame = Frame.zero(),
    readonly other: Frame = Frame.zero(),
    readonly bounds: Frame = Frame.zero(),
    readonly offsets: Frame = Frame.zero(),
  ) {}
}

// ============================================================================
// Flex Placement Type
// ============================================================================

export interface FlexPlacement {
  direction: 'column' | 'row' | 'column-reverse' | 'row-reverse';
  alignment: 'flex-start' | 'flex-end' | 'center';
}

// ============================================================================
// Popover Placement Interface
// ============================================================================

export interface PopoverPlacement {
  rawValue: string;
  frame(options: PlacementOptions): Frame;
  flex(): FlexPlacement;
  reverse(): PopoverPlacement;
  parent(): PopoverPlacement;
  family(): PopoverPlacement[];
  fits(frame: Frame, other: Frame): boolean;
}

// ============================================================================
// Fit Utilities
// ============================================================================

const fitsLeft = (frame: Frame, other: Frame): boolean =>
  frame.origin.x >= other.origin.x;

const fitsRight = (frame: Frame, other: Frame): boolean =>
  frame.origin.x + frame.size.width <= other.size.width;

const fitsTop = (frame: Frame, other: Frame): boolean =>
  frame.origin.y >= other.origin.y;

const fitsBottom = (frame: Frame, other: Frame): boolean =>
  frame.origin.y + frame.size.height <= other.size.height;

const fitsStart = (frame: Frame, other: Frame): boolean =>
  RTLService.select(fitsLeft, fitsRight)(frame, other);

const fitsEnd = (frame: Frame, other: Frame): boolean =>
  RTLService.select(fitsRight, fitsLeft)(frame, other);

// ============================================================================
// Placement Configuration Types
// ============================================================================

type FrameCalculator = (options: PlacementOptions) => Frame;
type FitsChecker = (frame: Frame, bounds: Frame) => boolean;
type PlacementGetter = () => PopoverPlacement;

interface PlacementConfig {
  rawValue: string;
  flexDirection: FlexPlacement['direction'];
  flexAlignment: FlexPlacement['alignment'];
  calculateFrame: FrameCalculator;
  fits: FitsChecker;
  getReverse: PlacementGetter;
  getParent: PlacementGetter;
  getFamily: () => PopoverPlacement[];
}

// ============================================================================
// Placement Factory
// ============================================================================

class Placement implements PopoverPlacement {
  constructor(private config: PlacementConfig) {}

  get rawValue(): string {
    return this.config.rawValue;
  }

  frame(options: PlacementOptions): Frame {
    return this.config.calculateFrame(options);
  }

  flex(): FlexPlacement {
    return {
      direction: this.config.flexDirection,
      alignment: this.config.flexAlignment,
    };
  }

  reverse(): PopoverPlacement {
    return this.config.getReverse();
  }

  parent(): PopoverPlacement {
    return this.config.getParent();
  }

  family(): PopoverPlacement[] {
    return this.config.getFamily();
  }

  fits(frame: Frame, bounds: Frame): boolean {
    return this.config.fits(frame, bounds);
  }
}

// ============================================================================
// Frame Calculation Helpers
// ============================================================================

const applyRTLX = (x: number, width: number, bounds: Frame): number =>
  RTLService.select(x, bounds.size.width - (x + width));

// ============================================================================
// Popover Placements - Data-Driven Definition
// ============================================================================

export class PopoverPlacements {
  // Primary placements (parents)
  static RIGHT: PopoverPlacement = new Placement({
    rawValue: 'right',
    flexDirection: 'row',
    flexAlignment: 'center',
    calculateFrame: (options) => {
      const { origin, size } = options.source.rightOf(options.other).centerVerticalOf(options.other);
      const x = applyRTLX(origin.x - options.offsets.size.width, size.width, options.bounds);
      return new Frame(x, origin.y, size.width, size.height);
    },
    fits: (frame, bounds) => fitsEnd(frame, bounds) && fitsTop(frame, bounds) && fitsBottom(frame, bounds),
    getReverse: () => PopoverPlacements.LEFT,
    getParent: () => PopoverPlacements.RIGHT,
    getFamily: () => [PopoverPlacements.RIGHT, PopoverPlacements.RIGHT_START, PopoverPlacements.RIGHT_END],
  });

  static LEFT: PopoverPlacement = new Placement({
    rawValue: 'left',
    flexDirection: 'row-reverse',
    flexAlignment: 'center',
    calculateFrame: (options) => {
      const { origin, size } = options.source.leftOf(options.other).centerVerticalOf(options.other);
      const x = applyRTLX(origin.x + options.offsets.origin.x, size.width, options.bounds);
      return new Frame(x, origin.y, size.width, size.height);
    },
    fits: (frame, bounds) => fitsStart(frame, bounds) && fitsTop(frame, bounds) && fitsBottom(frame, bounds),
    getReverse: () => PopoverPlacements.RIGHT,
    getParent: () => PopoverPlacements.LEFT,
    getFamily: () => [PopoverPlacements.LEFT, PopoverPlacements.LEFT_START, PopoverPlacements.LEFT_END],
  });

  static TOP: PopoverPlacement = new Placement({
    rawValue: 'top',
    flexDirection: 'column-reverse',
    flexAlignment: 'center',
    calculateFrame: (options) => {
      const { origin, size } = options.source.topOf(options.other).centerHorizontalOf(options.other);
      const x = applyRTLX(origin.x, size.width, options.bounds);
      return new Frame(x, origin.y + options.offsets.origin.y, size.width, size.height);
    },
    fits: (frame, bounds) => fitsTop(frame, bounds) && fitsLeft(frame, bounds) && fitsRight(frame, bounds),
    getReverse: () => PopoverPlacements.BOTTOM,
    getParent: () => PopoverPlacements.TOP,
    getFamily: () => [PopoverPlacements.TOP, PopoverPlacements.TOP_START, PopoverPlacements.TOP_END],
  });

  static BOTTOM: PopoverPlacement = new Placement({
    rawValue: 'bottom',
    flexDirection: 'column',
    flexAlignment: 'center',
    calculateFrame: (options) => {
      const { origin, size } = options.source.bottomOf(options.other).centerHorizontalOf(options.other);
      const x = applyRTLX(origin.x, size.width, options.bounds);
      return new Frame(x, origin.y - options.offsets.size.height, size.width, size.height);
    },
    fits: (frame, bounds) => fitsBottom(frame, bounds) && fitsLeft(frame, bounds) && fitsRight(frame, bounds),
    getReverse: () => PopoverPlacements.TOP,
    getParent: () => PopoverPlacements.BOTTOM,
    getFamily: () => [PopoverPlacements.BOTTOM, PopoverPlacements.BOTTOM_START, PopoverPlacements.BOTTOM_END],
  });

  static INNER: PopoverPlacement = new Placement({
    rawValue: 'inner',
    flexDirection: 'column',
    flexAlignment: 'center',
    calculateFrame: (options) => {
      const { origin, size } = options.source.centerVerticalOf(options.other).centerHorizontalOf(options.other);
      const x = applyRTLX(origin.x, size.width, options.bounds);
      return new Frame(x, origin.y - options.offsets.size.height, size.width, size.height);
    },
    fits: (frame, bounds) => fitsBottom(frame, bounds) && fitsLeft(frame, bounds) && fitsRight(frame, bounds),
    getReverse: () => PopoverPlacements.INNER,
    getParent: () => PopoverPlacements.INNER,
    getFamily: () => [PopoverPlacements.INNER_TOP, PopoverPlacements.INNER_BOTTOM, PopoverPlacements.INNER],
  });

  // Child placements - RIGHT family
  static RIGHT_START: PopoverPlacement = new Placement({
    rawValue: 'right start',
    flexDirection: 'row',
    flexAlignment: 'flex-start',
    calculateFrame: (options) => {
      const { origin, size } = PopoverPlacements.RIGHT.frame(options);
      const y = Math.round(origin.y - (options.other.size.height - size.height) / 2 + options.offsets.origin.y);
      return new Frame(origin.x, y, size.width, size.height);
    },
    fits: (frame, bounds) => PopoverPlacements.RIGHT.fits(frame, bounds),
    getReverse: () => PopoverPlacements.LEFT_START,
    getParent: () => PopoverPlacements.RIGHT,
    getFamily: () => PopoverPlacements.RIGHT.family(),
  });

  static RIGHT_END: PopoverPlacement = new Placement({
    rawValue: 'right end',
    flexDirection: 'row',
    flexAlignment: 'flex-end',
    calculateFrame: (options) => {
      const { origin, size } = PopoverPlacements.RIGHT.frame(options);
      const y = Math.round(origin.y + (options.other.size.height - size.height) / 2 - options.offsets.size.height);
      return new Frame(origin.x, y, size.width, size.height);
    },
    fits: (frame, bounds) => PopoverPlacements.RIGHT.fits(frame, bounds),
    getReverse: () => PopoverPlacements.LEFT_END,
    getParent: () => PopoverPlacements.RIGHT,
    getFamily: () => PopoverPlacements.RIGHT.family(),
  });

  // Child placements - LEFT family
  static LEFT_START: PopoverPlacement = new Placement({
    rawValue: 'left start',
    flexDirection: 'row-reverse',
    flexAlignment: 'flex-start',
    calculateFrame: (options) => {
      const { origin, size } = PopoverPlacements.LEFT.frame(options);
      const y = Math.round(origin.y - (options.other.size.height - size.height) / 2 + options.offsets.origin.y);
      return new Frame(origin.x, y, size.width, size.height);
    },
    fits: (frame, bounds) => PopoverPlacements.LEFT.fits(frame, bounds),
    getReverse: () => PopoverPlacements.RIGHT_START,
    getParent: () => PopoverPlacements.LEFT,
    getFamily: () => PopoverPlacements.LEFT.family(),
  });

  static LEFT_END: PopoverPlacement = new Placement({
    rawValue: 'left end',
    flexDirection: 'row-reverse',
    flexAlignment: 'flex-end',
    calculateFrame: (options) => {
      const { origin, size } = PopoverPlacements.LEFT.frame(options);
      const y = Math.round(origin.y + (options.other.size.height - size.height) / 2 - options.offsets.size.height);
      return new Frame(origin.x, y, size.width, size.height);
    },
    fits: (frame, bounds) => PopoverPlacements.LEFT.fits(frame, bounds),
    getReverse: () => PopoverPlacements.RIGHT_END,
    getParent: () => PopoverPlacements.LEFT,
    getFamily: () => PopoverPlacements.LEFT.family(),
  });

  // Child placements - TOP family
  static TOP_START: PopoverPlacement = new Placement({
    rawValue: 'top start',
    flexDirection: 'column-reverse',
    flexAlignment: 'flex-start',
    calculateFrame: (options) => {
      const { origin, size } = PopoverPlacements.TOP.frame(options);
      const x = Math.round(origin.x - (options.other.size.width - size.width) / 2 + options.offsets.origin.x);
      return new Frame(x, origin.y, size.width, size.height);
    },
    fits: (frame, bounds) => PopoverPlacements.TOP.fits(frame, bounds),
    getReverse: () => PopoverPlacements.BOTTOM_START,
    getParent: () => PopoverPlacements.TOP,
    getFamily: () => PopoverPlacements.TOP.family(),
  });

  static TOP_END: PopoverPlacement = new Placement({
    rawValue: 'top end',
    flexDirection: 'column-reverse',
    flexAlignment: 'flex-end',
    calculateFrame: (options) => {
      const { origin, size } = PopoverPlacements.TOP.frame(options);
      const x = Math.round(origin.x + (options.other.size.width - size.width) / 2 - options.offsets.size.width);
      return new Frame(x, origin.y, size.width, size.height);
    },
    fits: (frame, bounds) => PopoverPlacements.TOP.fits(frame, bounds),
    getReverse: () => PopoverPlacements.BOTTOM_END,
    getParent: () => PopoverPlacements.TOP,
    getFamily: () => PopoverPlacements.TOP.family(),
  });

  // Child placements - BOTTOM family
  static BOTTOM_START: PopoverPlacement = new Placement({
    rawValue: 'bottom start',
    flexDirection: 'column',
    flexAlignment: 'flex-start',
    calculateFrame: (options) => {
      const { origin, size } = PopoverPlacements.BOTTOM.frame(options);
      const x = Math.round(origin.x - (options.other.size.width - size.width) / 2 + options.offsets.origin.x);
      return new Frame(x, origin.y, size.width, size.height);
    },
    fits: (frame, bounds) => PopoverPlacements.BOTTOM.fits(frame, bounds),
    getReverse: () => PopoverPlacements.TOP_START,
    getParent: () => PopoverPlacements.BOTTOM,
    getFamily: () => PopoverPlacements.BOTTOM.family(),
  });

  static BOTTOM_END: PopoverPlacement = new Placement({
    rawValue: 'bottom end',
    flexDirection: 'column',
    flexAlignment: 'flex-end',
    calculateFrame: (options) => {
      const { origin, size } = PopoverPlacements.BOTTOM.frame(options);
      const x = Math.round(origin.x + (options.other.size.width - size.width) / 2 - options.offsets.size.width);
      return new Frame(x, origin.y, size.width, size.height);
    },
    fits: (frame, bounds) => PopoverPlacements.BOTTOM.fits(frame, bounds),
    getReverse: () => PopoverPlacements.TOP_END,
    getParent: () => PopoverPlacements.BOTTOM,
    getFamily: () => PopoverPlacements.BOTTOM.family(),
  });

  // Child placements - INNER family
  static INNER_TOP: PopoverPlacement = new Placement({
    rawValue: 'inner top',
    flexDirection: 'column',
    flexAlignment: 'center',
    calculateFrame: (options) => {
      const { origin, size } = options.source.topIn(options.other).centerHorizontalOf(options.other);
      const x = applyRTLX(origin.x, size.width, options.bounds);
      return new Frame(x, origin.y - options.offsets.size.height, size.width, size.height);
    },
    fits: (frame, bounds) => PopoverPlacements.INNER.fits(frame, bounds),
    getReverse: () => PopoverPlacements.INNER_BOTTOM,
    getParent: () => PopoverPlacements.INNER,
    getFamily: () => PopoverPlacements.INNER.family(),
  });

  static INNER_BOTTOM: PopoverPlacement = new Placement({
    rawValue: 'inner bottom',
    flexDirection: 'column-reverse',
    flexAlignment: 'center',
    calculateFrame: (options) => {
      const { origin, size } = options.source.bottomIn(options.other).centerHorizontalOf(options.other);
      const x = applyRTLX(origin.x, size.width, options.bounds);
      return new Frame(x, origin.y - options.offsets.size.height, size.width, size.height);
    },
    fits: (frame, bounds) => PopoverPlacements.INNER.fits(frame, bounds),
    getReverse: () => PopoverPlacements.INNER_TOP,
    getParent: () => PopoverPlacements.INNER,
    getFamily: () => PopoverPlacements.INNER.family(),
  });

  // ============================================================================
  // Parser
  // ============================================================================

  private static ALL_PLACEMENTS: Record<string, PopoverPlacement> = {
    'left': PopoverPlacements.LEFT,
    'left start': PopoverPlacements.LEFT_START,
    'left end': PopoverPlacements.LEFT_END,
    'right': PopoverPlacements.RIGHT,
    'right start': PopoverPlacements.RIGHT_START,
    'right end': PopoverPlacements.RIGHT_END,
    'top': PopoverPlacements.TOP,
    'top start': PopoverPlacements.TOP_START,
    'top end': PopoverPlacements.TOP_END,
    'bottom': PopoverPlacements.BOTTOM,
    'bottom start': PopoverPlacements.BOTTOM_START,
    'bottom end': PopoverPlacements.BOTTOM_END,
    'inner': PopoverPlacements.INNER,
    'inner top': PopoverPlacements.INNER_TOP,
    'inner bottom': PopoverPlacements.INNER_BOTTOM,
  };

  static parse(value: string | PopoverPlacement, fallback?: PopoverPlacement): PopoverPlacement {
    if (typeof value !== 'string') {
      return value;
    }
    return PopoverPlacements.ALL_PLACEMENTS[value] || fallback;
  }
}
