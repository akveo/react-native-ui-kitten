/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  FlexStyle,
  StyleProp,
  StyleSheet,
} from 'react-native';
import { I18nLayoutService } from '../support/services';

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

export class PlacementOptions {
  source: Frame = Frame.zero();
  other: Frame = Frame.zero();
  bounds: Frame = Frame.zero();
  offsets: OffsetRect = OffsetRect.zero();
}

export interface PopoverPlacement {
  rawValue: string;

  frame(options: PlacementOptions): Frame;

  flex(): FlexPlacement;

  parent(): PopoverPlacement;

  reverse(): PopoverPlacement;

  family(): PopoverPlacement[];

  fits(frame: Frame, other: Frame): boolean;
}

export interface FlexPlacement {
  direction: 'column' | 'row' | 'column-reverse' | 'row-reverse';
  alignment: 'flex-start' | 'flex-end' | 'center';
}

export class PopoverPlacements {

  static LEFT: PopoverPlacement = new class implements PopoverPlacement {
    rawValue: string = 'left';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = options.source.leftOf(options.other).centerVerticalOf(options.other);

      const x: number = I18nLayoutService.select(
        origin.x + options.offsets.left,
        options.bounds.size.width - size.width - (origin.x + options.offsets.right),
      );

      return new Frame(
        x,
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

    family(): PopoverPlacement[] {
      return [
        PopoverPlacements.LEFT,
        PopoverPlacements.LEFT_START,
        PopoverPlacements.LEFT_END,
      ];
    }

    fits(frame: Frame, other: Frame): boolean {
      return fitsStart(frame, other) && fitsTop(frame, other) && fitsBottom(frame, other);
    }
  };

  static LEFT_START: PopoverPlacement = new class implements PopoverPlacement {
    rawValue: string = 'left start';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = this.parent().frame(options);

      return new Frame(
        origin.x,
        origin.y - (options.other.size.height - size.height) / 2 + options.offsets.top,
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

    family(): PopoverPlacement[] {
      return this.parent().family();
    }

    fits(frame: Frame, other: Frame): boolean {
      return this.parent().fits(frame, other);
    }
  };

  static LEFT_END: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'left end';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = this.parent().frame(options);

      return new Frame(
        origin.x,
        origin.y + (options.other.size.height - size.height) / 2 - options.offsets.bottom,
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

    family(): PopoverPlacement[] {
      return this.parent().family();
    }

    fits(frame: Frame, other: Frame): boolean {
      return this.parent().fits(frame, other);
    }
  };

  static TOP: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'top';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = options.source.topOf(options.other).centerHorizontalOf(options.other);


      const x: number = I18nLayoutService.select(
        origin.x,
        options.bounds.size.width - (origin.x + size.width),
      );

      return new Frame(
        x,
        origin.y + options.offsets.top,
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

    family(): PopoverPlacement[] {
      return [
        PopoverPlacements.TOP,
        PopoverPlacements.TOP_START,
        PopoverPlacements.TOP_END,
      ];
    }

    fits(frame: Frame, other: Frame): boolean {
      return fitsTop(frame, other) && fitsLeft(frame, other) && fitsRight(frame, other);
    }
  };

  static TOP_START: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'top start';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = this.parent().frame(options);

      return new Frame(
        origin.x - (options.other.size.width - size.width) / 2 + options.offsets.left,
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

    family(): PopoverPlacement[] {
      return this.parent().family();
    }

    fits(frame: Frame, other: Frame): boolean {
      return this.parent().fits(frame, other);
    }
  };

  static TOP_END: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'top end';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = this.parent().frame(options);

      return new Frame(
        origin.x + (options.other.size.width - size.width) / 2 - options.offsets.right,
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

    family(): PopoverPlacement[] {
      return this.parent().family();
    }

    fits(frame: Frame, other: Frame): boolean {
      return this.parent().fits(frame, other);
    }
  };

  static RIGHT: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'right';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = options.source.rightOf(options.other).centerVerticalOf(options.other);

      const x: number = I18nLayoutService.select(
        origin.x - options.offsets.right,
        options.bounds.size.width - size.width - (origin.x - options.offsets.right),
      );

      return new Frame(
        x,
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

    family(): PopoverPlacement[] {
      return [
        PopoverPlacements.RIGHT,
        PopoverPlacements.RIGHT_START,
        PopoverPlacements.RIGHT_END,
      ];
    }

    fits(frame: Frame, other: Frame): boolean {
      return fitsEnd(frame, other) && fitsTop(frame, other) && fitsBottom(frame, other);
    }
  };

  static RIGHT_START: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'right start';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = this.parent().frame(options);

      return new Frame(
        origin.x,
        origin.y - (options.other.size.height - size.height) / 2 + options.offsets.top,
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

    family(): PopoverPlacement[] {
      return this.parent().family();
    }

    fits(frame: Frame, other: Frame): boolean {
      return this.parent().fits(frame, other);
    }
  };

  static RIGHT_END: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'right end';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = this.parent().frame(options);

      return new Frame(
        origin.x,
        origin.y + (options.other.size.height - size.height) / 2 - options.offsets.bottom,
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

    family(): PopoverPlacement[] {
      return this.parent().family();
    }

    fits(frame: Frame, other: Frame): boolean {
      return this.parent().fits(frame, other);
    }
  };

  static BOTTOM: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'bottom';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = options.source.bottomOf(options.other).centerHorizontalOf(options.other);

      const x: number = I18nLayoutService.select(
        origin.x,
        options.bounds.size.width - (origin.x + size.width),
      );

      return new Frame(
        x,
        origin.y - options.offsets.bottom,
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

    family(): PopoverPlacement[] {
      return [
        PopoverPlacements.BOTTOM,
        PopoverPlacements.BOTTOM_START,
        PopoverPlacements.BOTTOM_END,
      ];
    }

    fits(frame: Frame, other: Frame): boolean {
      return fitsBottom(frame, other) && fitsLeft(frame, other) && fitsRight(frame, other);
    }
  };

  static BOTTOM_START: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'bottom start';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = this.parent().frame(options);

      return new Frame(
        origin.x - (options.other.size.width - size.width) / 2 + options.offsets.left,
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

    family(): PopoverPlacement[] {
      return this.parent().family();
    }

    fits(frame: Frame, other: Frame): boolean {
      return this.parent().fits(frame, other);
    }
  };

  static BOTTOM_END: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'bottom end';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = this.parent().frame(options);

      return new Frame(
        origin.x + (options.other.size.width - size.width) / 2 - options.offsets.right,
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

    family(): PopoverPlacement[] {
      return this.parent().family();
    }

    fits(frame: Frame, other: Frame): boolean {
      return this.parent().fits(frame, other);
    }
  };

  static parse(value: string | PopoverPlacement, fallback?: PopoverPlacement): PopoverPlacement | undefined {
    return PopoverPlacements.typeOf(value) ? value : PopoverPlacements.parseString(value, fallback);
  }

  private static parseString(rawValue: string, fallback?: PopoverPlacement): PopoverPlacement | undefined {
    switch (rawValue) {
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

const fitsStart = (frame: Frame, other: Frame): boolean => {
  return I18nLayoutService.select(fitsLeft, fitsRight)(frame, other);
};

const fitsEnd = (frame: Frame, other: Frame): boolean => {
  return I18nLayoutService.select(fitsRight, fitsLeft)(frame, other);
};

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
