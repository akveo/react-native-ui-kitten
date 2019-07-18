import {
  Dimensions,
  FlexStyle,
  ScaledSize,
  StyleProp,
  StyleSheet,
} from 'react-native';

export class Point {

  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static zero(): Point {
    return new Point(0, 0);
  }
}

export class Size {

  readonly width: number;
  readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  static zero(): Size {
    return new Size(0, 0);
  }
}

export class Frame {

  readonly origin: Point;
  readonly size: Size;

  constructor(x: number, y: number, width: number, height: number) {
    this.origin = new Point(x, y);
    this.size = new Size(width, height);
  }

  /**
   * Creates new frame aligned to left of other
   */
  public leftOf(other: Frame): Frame {
    return new Frame(
      other.origin.x - this.size.width,
      this.origin.y,
      this.size.width,
      this.size.height,
    );
  }

  /**
   * Creates new frame aligned to top of other
   */
  public topOf(other: Frame): Frame {
    return new Frame(
      this.origin.x,
      other.origin.y - this.size.height,
      this.size.width,
      this.size.height,
    );
  }

  /**
   * Creates new frame aligned to right of other
   */
  public rightOf(other: Frame): Frame {
    return new Frame(
      other.origin.x + other.size.width,
      this.origin.y,
      this.size.width,
      this.size.height,
    );
  }

  /**
   * Creates new frame aligned to bottom of other
   */
  public bottomOf(other: Frame): Frame {
    return new Frame(
      this.origin.x,
      other.origin.y + other.size.height,
      this.size.width,
      this.size.height,
    );
  }

  /**
   * Creates new frame centered horizontally to other
   */
  public centerHorizontalOf(other: Frame): Frame {
    return new Frame(
      other.origin.x + (other.size.width - this.size.width) / 2,
      this.origin.y,
      this.size.width,
      this.size.height,
    );
  }

  /**
   * Creates new frame centered vertically to other
   */
  public centerVerticalOf(other: Frame): Frame {
    return new Frame(
      this.origin.x,
      other.origin.y + (other.size.height - this.size.height) / 2,
      this.size.width,
      this.size.height,
    );
  }

  static zero(): Frame {
    return Frame.from(Point.zero(), Size.zero());
  }

  static from(point: Point, size: Size): Frame {
    return new Frame(point.x, point.y, size.width, size.height);
  }
}

const WINDOW: ScaledSize = Dimensions.get('window');
const WINDOW_FRAME: Frame = new Frame(0, 0, WINDOW.width, WINDOW.height);

export interface OffsetValue {
  rawValue: string;

  applyToRect(rect: OffsetRect, value: number): OffsetRect;
}

export class OffsetRect {
  left: number;
  top: number;
  right: number;
  bottom: number;

  static zero(): OffsetRect {
    return { left: 0, top: 0, right: 0, bottom: 0 };
  }
}

export class Offsets {

  static MARGIN: OffsetValue = new class implements OffsetValue {
    rawValue: string = 'margin';

    applyToRect(rect: OffsetRect, value: number): OffsetRect {
      return {
        left: value,
        top: value,
        right: value,
        bottom: value,
      };
    }
  };

  static MARGIN_HORIZONTAL: OffsetValue = new class implements OffsetValue {
    rawValue: string = 'marginHorizontal';

    applyToRect(rect: OffsetRect, value: number): OffsetRect {
      return { ...rect, left: value, right: value };
    }
  };

  static MARGIN_VERTICAL: OffsetValue = new class implements OffsetValue {
    rawValue: string = 'marginVertical';

    applyToRect(rect: OffsetRect, value: number): OffsetRect {
      return { ...rect, top: value, bottom: value };
    }
  };

  static MARGIN_LEFT: OffsetValue = new class implements OffsetValue {
    rawValue: string = 'marginLeft';

    applyToRect(rect: OffsetRect, value: number): OffsetRect {
      return { ...rect, left: value };
    }
  };

  static MARGIN_TOP: OffsetValue = new class implements OffsetValue {
    rawValue: string = 'marginTop';

    applyToRect(rect: OffsetRect, value: number): OffsetRect {
      return { ...rect, top: value };
    }
  };

  static MARGIN_RIGHT: OffsetValue = new class implements OffsetValue {
    rawValue: string = 'marginRight';

    applyToRect(rect: OffsetRect, value: number): OffsetRect {
      return { ...rect, right: value };
    }
  };

  static MARGIN_BOTTOM: OffsetValue = new class implements OffsetValue {
    rawValue: string = 'marginBottom';

    applyToRect(rect: OffsetRect, value: number): OffsetRect {
      return { ...rect, bottom: value };
    }
  };

  static find(source: StyleProp<FlexStyle>): OffsetRect {
    const keys: string[] = [
      Offsets.MARGIN.rawValue,
      Offsets.MARGIN_HORIZONTAL.rawValue,
      Offsets.MARGIN_VERTICAL.rawValue,
      Offsets.MARGIN_LEFT.rawValue,
      Offsets.MARGIN_TOP.rawValue,
      Offsets.MARGIN_RIGHT.rawValue,
      Offsets.MARGIN_BOTTOM.rawValue,
    ];

    const flatStyle: FlexStyle = StyleSheet.flatten(source) || {};

    return Object.keys(flatStyle).filter((key: string) => {
      return keys.includes(key);
    }).reduce((acc: OffsetRect, key: string) => {
      const value: number = flatStyle[key];
      const offsetValue: OffsetValue | undefined = Offsets.parseString(key);
      return offsetValue ? offsetValue.applyToRect(acc, value) : acc;
    }, OffsetRect.zero());
  }

  private static parseString(rawValue: string, fallback?: OffsetValue): OffsetValue | undefined {
    switch (rawValue) {
      case Offsets.MARGIN.rawValue:
        return Offsets.MARGIN;
      case Offsets.MARGIN_HORIZONTAL.rawValue:
        return Offsets.MARGIN_HORIZONTAL;
      case Offsets.MARGIN_VERTICAL.rawValue:
        return Offsets.MARGIN_VERTICAL;
      case Offsets.MARGIN_LEFT.rawValue:
        return Offsets.MARGIN_LEFT;
      case Offsets.MARGIN_TOP.rawValue:
        return Offsets.MARGIN_TOP;
      case Offsets.MARGIN_RIGHT.rawValue:
        return Offsets.MARGIN_RIGHT;
      case Offsets.MARGIN_BOTTOM.rawValue:
        return Offsets.MARGIN_BOTTOM;
      default:
        return fallback;
    }
  }
}

export interface PopoverPlacement {
  rawValue: string;

  frame(source: Frame, other: Frame, offset?: OffsetRect): Frame;

  flex(): FlexPlacement;

  parent(): PopoverPlacement;

  reverse(): PopoverPlacement;

  next(): PopoverPlacement;

  fits(frame: Frame, other: Frame): boolean;
}

export interface FlexPlacement {
  direction: 'column' | 'row' | 'column-reverse' | 'row-reverse';
  alignment: 'flex-start' | 'flex-end' | 'center';
}

export class PopoverPlacements {

  static LEFT: PopoverPlacement = new class implements PopoverPlacement {
    rawValue: string = 'left';

    frame(source: Frame, other: Frame, offset: OffsetRect = OffsetRect.zero()): Frame {
      const { origin, size } = source.leftOf(other).centerVerticalOf(other);

      return new Frame(
        origin.x + offset.left,
        origin.y,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'row',
        alignment: 'center',
      };
    }

    parent(): PopoverPlacement {
      return this;
    }

    reverse(): PopoverPlacement {
      return PopoverPlacements.RIGHT;
    }

    next(): PopoverPlacement {
      return PopoverPlacements.LEFT_START;
    }

    fits(frame: Frame, other: Frame): boolean {
      return fitsLeft(frame, other) && fitsTop(frame, other) && fitsBottom(frame, other);
    }
  };

  static LEFT_START: PopoverPlacement = new class implements PopoverPlacement {
    rawValue: string = 'left start';

    frame(source: Frame, other: Frame, offset: OffsetRect = OffsetRect.zero()): Frame {
      const { origin, size } = this.parent().frame(source, other, offset);

      return new Frame(
        origin.x,
        origin.y - (other.size.height - size.height) / 2 + offset.top,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'row',
        alignment: 'flex-start',
      };
    }

    parent(): PopoverPlacement {
      return PopoverPlacements.LEFT;
    }

    reverse(): PopoverPlacement {
      return PopoverPlacements.RIGHT_START;
    }

    next(): PopoverPlacement {
      return PopoverPlacements.TOP_START;
    }

    fits(frame: Frame, other: Frame): boolean {
      return this.parent().fits(frame, other);
    }
  };

  static LEFT_END: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'left end';

    frame(source: Frame, other: Frame, offset: OffsetRect = OffsetRect.zero()): Frame {
      const { origin, size } = this.parent().frame(source, other, offset);

      return new Frame(
        origin.x,
        origin.y + (other.size.height - size.height) / 2 - offset.bottom,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'row',
        alignment: 'flex-end',
      };
    }

    parent(): PopoverPlacement {
      return PopoverPlacements.LEFT;
    }

    reverse(): PopoverPlacement {
      return PopoverPlacements.RIGHT_END;
    }

    next(): PopoverPlacement {
      return PopoverPlacements.BOTTOM;
    }

    fits(frame: Frame, other: Frame): boolean {
      return this.parent().fits(frame, other);
    }
  };

  static TOP: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'top';

    frame(source: Frame, other: Frame, offset: OffsetRect = OffsetRect.zero()): Frame {
      const { origin, size } = source.topOf(other).centerHorizontalOf(other);

      return new Frame(
        origin.x,
        origin.y + offset.top,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'column',
        alignment: 'center',
      };
    }

    parent(): PopoverPlacement {
      return this;
    }

    reverse(): PopoverPlacement {
      return PopoverPlacements.BOTTOM;
    }

    next(): PopoverPlacement {
      return PopoverPlacements.RIGHT;
    }

    fits(frame: Frame, other: Frame): boolean {
      return fitsTop(frame, other) && fitsLeft(frame, other) && fitsRight(frame, other);
    }
  };

  static TOP_START: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'top start';

    frame(source: Frame, other: Frame, offset: OffsetRect = OffsetRect.zero()): Frame {
      const { origin, size } = this.parent().frame(source, other, offset);

      return new Frame(
        origin.x - (other.size.width - size.width) / 2 + offset.left,
        origin.y,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'column',
        alignment: 'flex-start',
      };
    }

    parent(): PopoverPlacement {
      return PopoverPlacements.TOP;
    }

    reverse(): PopoverPlacement {
      return PopoverPlacements.BOTTOM_START;
    }

    next(): PopoverPlacement {
      return PopoverPlacements.TOP_END;
    }

    fits(frame: Frame, other: Frame): boolean {
      return this.parent().fits(frame, other);
    }
  };

  static TOP_END: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'top end';

    frame(source: Frame, other: Frame, offset: OffsetRect = OffsetRect.zero()): Frame {
      const { origin, size } = this.parent().frame(source, other, offset);

      return new Frame(
        origin.x + (other.size.width - size.width) / 2 - offset.right,
        origin.y,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'column',
        alignment: 'flex-end',
      };
    }

    parent(): PopoverPlacement {
      return PopoverPlacements.TOP;
    }

    reverse(): PopoverPlacement {
      return PopoverPlacements.BOTTOM_END;
    }

    next(): PopoverPlacement {
      return PopoverPlacements.RIGHT_START;
    }

    fits(frame: Frame, other: Frame): boolean {
      return this.parent().fits(frame, other);
    }
  };

  static RIGHT: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'right';

    frame(source: Frame, other: Frame, offset: OffsetRect = OffsetRect.zero()): Frame {
      const { origin, size } = source.rightOf(other).centerVerticalOf(other);

      return new Frame(
        origin.x - offset.right,
        origin.y,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'row-reverse',
        alignment: 'center',
      };
    }

    parent(): PopoverPlacement {
      return this;
    }

    reverse(): PopoverPlacement {
      return PopoverPlacements.LEFT;
    }

    next(): PopoverPlacement {
      return PopoverPlacements.LEFT;
    }

    fits(frame: Frame, other: Frame): boolean {
      return fitsRight(frame, other) && fitsTop(frame, other) && fitsBottom(frame, other);
    }
  };

  static RIGHT_START: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'right start';

    frame(source: Frame, other: Frame, offset: OffsetRect = OffsetRect.zero()): Frame {
      const { origin, size } = this.parent().frame(source, other, offset);

      return new Frame(
        origin.x,
        origin.y - (other.size.height - size.height) / 2 + offset.top,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'row-reverse',
        alignment: 'flex-start',
      };
    }

    parent(): PopoverPlacement {
      return PopoverPlacements.RIGHT;
    }

    reverse(): PopoverPlacement {
      return PopoverPlacements.LEFT_START;
    }

    next(): PopoverPlacement {
      return PopoverPlacements.RIGHT_END;
    }

    fits(frame: Frame, other: Frame): boolean {
      return this.parent().fits(frame, other);
    }
  };

  static RIGHT_END: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'right end';

    frame(source: Frame, other: Frame, offset: OffsetRect = OffsetRect.zero()): Frame {
      const { origin, size } = this.parent().frame(source, other, offset);

      return new Frame(
        origin.x,
        origin.y + (other.size.height - size.height) / 2 - offset.bottom,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'row-reverse',
        alignment: 'flex-end',
      };
    }

    parent(): PopoverPlacement {
      return PopoverPlacements.RIGHT;
    }

    reverse(): PopoverPlacement {
      return PopoverPlacements.LEFT_END;
    }

    next(): PopoverPlacement {
      return PopoverPlacements.BOTTOM_END;
    }

    fits(frame: Frame, other: Frame): boolean {
      return this.parent().fits(frame, other);
    }
  };

  static BOTTOM: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'bottom';

    frame(source: Frame, other: Frame, offset: OffsetRect = OffsetRect.zero()): Frame {
      const { origin, size } = source.bottomOf(other).centerHorizontalOf(other);

      return new Frame(
        origin.x,
        origin.y - offset.bottom,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'column-reverse',
        alignment: 'center',
      };
    }

    parent(): PopoverPlacement {
      return this;
    }

    reverse(): PopoverPlacement {
      return PopoverPlacements.TOP;
    }

    next(): PopoverPlacement {
      return PopoverPlacements.TOP;
    }

    fits(frame: Frame, other: Frame): boolean {
      return fitsBottom(frame, other) && fitsLeft(frame, other) && fitsRight(frame, other);
    }
  };

  static BOTTOM_START: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'bottom start';

    frame(source: Frame, other: Frame, offset: OffsetRect = OffsetRect.zero()): Frame {
      const { origin, size } = this.parent().frame(source, other, offset);

      return new Frame(
        origin.x - (other.size.width - size.width) / 2 + offset.left,
        origin.y,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'column-reverse',
        alignment: 'flex-start',
      };
    }

    parent(): PopoverPlacement {
      return PopoverPlacements.BOTTOM;
    }

    reverse(): PopoverPlacement {
      return PopoverPlacements.TOP_START;
    }

    next(): PopoverPlacement {
      return PopoverPlacements.LEFT_END;
    }

    fits(frame: Frame, other: Frame): boolean {
      return this.parent().fits(frame, other);
    }
  };

  static BOTTOM_END: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'bottom end';

    frame(source: Frame, other: Frame, offset: OffsetRect = OffsetRect.zero()): Frame {
      const { origin, size } = this.parent().frame(source, other, offset);

      return new Frame(
        origin.x + (other.size.width - size.width) / 2 - offset.right,
        origin.y,
        size.width,
        size.height,
      );
    }

    flex(): FlexPlacement {
      return {
        direction: 'column-reverse',
        alignment: 'flex-end',
      };
    }

    parent(): PopoverPlacement {
      return PopoverPlacements.BOTTOM;
    }

    reverse(): PopoverPlacement {
      return PopoverPlacements.TOP_END;
    }

    next(): PopoverPlacement {
      return PopoverPlacements.BOTTOM_START;
    }

    fits(frame: Frame, other: Frame): boolean {
      return this.parent().fits(frame, other);
    }
  };

  /**
   * Starts with PopoverPlacements.BOTTOM and clockwise
   * through all placements and returns the first placement that can fit popover.
   *
   * Placement check order:
   *
   * 1.  BOTTOM
   * 2.  TOP
   * 3.  RIGHT
   * 4.  LEFT
   * 5.  LEFT_START
   * 6.  TOP_START
   * 7.  TOP_END
   * 8.  RIGHT_START
   * 9.  RIGHT_END
   * 10. BOTTOM_END
   * 11. BOTTOM_START
   * 12. LEFT_END
   */
  static AUTO: PopoverPlacement = new class implements PopoverPlacement {

    rawValue = 'auto';
    initialValue: PopoverPlacement = PopoverPlacements.BOTTOM;
    private currentValue: PopoverPlacement = this.initialValue;

    flex(): FlexPlacement {
      return this.currentValue.flex();
    }

    frame(source: Frame, other: Frame, offset?: OffsetRect): Frame {
      const frame: Frame = this.currentValue.frame(source, other, offset);

      if (!this.fits(frame, WINDOW_FRAME) && this.next().rawValue !== this.initialValue.rawValue) {
        this.currentValue = this.currentValue.next();
        return this.frame(source, other, offset);
      }

      return frame;
    }

    parent(): PopoverPlacement {
      return this.currentValue.parent();
    }

    reverse(): PopoverPlacement {
      return this.currentValue.reverse();
    }

    next(): PopoverPlacement {
      return this.currentValue.next();
    }

    fits(frame: Frame, other: Frame): boolean {
      return this.currentValue.fits(frame, other);
    }
  };

  static parse(value: string | PopoverPlacement, fallback?: PopoverPlacement): PopoverPlacement | undefined {
    return PopoverPlacements.typeOf(value) ? value : PopoverPlacements.parseString(value, fallback);
  }

  private static parseString(rawValue: string, fallback?: PopoverPlacement): PopoverPlacement | undefined {
    switch (rawValue) {
      case PopoverPlacements.AUTO.rawValue:
        return PopoverPlacements.AUTO;
      case PopoverPlacements.LEFT.rawValue:
        return PopoverPlacements.LEFT;
      case PopoverPlacements.TOP.rawValue:
        return PopoverPlacements.TOP;
      case PopoverPlacements.RIGHT.rawValue:
        return PopoverPlacements.RIGHT;
      case PopoverPlacements.BOTTOM.rawValue:
        return PopoverPlacements.BOTTOM;
      case PopoverPlacements.LEFT_START.rawValue:
        return PopoverPlacements.LEFT_START;
      case PopoverPlacements.LEFT_END.rawValue:
        return PopoverPlacements.LEFT_END;
      case PopoverPlacements.TOP_START.rawValue:
        return PopoverPlacements.TOP_START;
      case PopoverPlacements.TOP_END.rawValue:
        return PopoverPlacements.TOP_END;
      case PopoverPlacements.RIGHT_START.rawValue:
        return PopoverPlacements.RIGHT_START;
      case PopoverPlacements.RIGHT_END.rawValue:
        return PopoverPlacements.RIGHT_END;
      case PopoverPlacements.BOTTOM_START.rawValue:
        return PopoverPlacements.BOTTOM_START;
      case PopoverPlacements.BOTTOM_END.rawValue:
        return PopoverPlacements.BOTTOM_END;
      default:
        return fallback;
    }
  }

  private static typeOf(value: any): value is PopoverPlacement {
    const { rawValue } = (<PopoverPlacement>value);

    return rawValue !== undefined;
  }
}

const fitsLeft = (frame: Frame, other: Frame): boolean => {
  return frame.origin.x >= other.origin.x;
};

const fitsRight = (frame: Frame, other: Frame): boolean => {
  return frame.origin.x + frame.size.width <= other.size.width;
};

const fitsTop = (frame: Frame, other: Frame): boolean => {
  return frame.origin.y >= other.origin.y;
};

const fitsBottom = (frame: Frame, other: Frame): boolean => {
  return frame.origin.y + frame.size.height <= other.size.height;
};
