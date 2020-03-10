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
import {
  Frame,
  RTLService,
} from '../../devsupport';

export interface Offset {
  rawValue: string;

  apply(frame: Frame, value: number): Frame;
}

export class Offsets {

  static MARGIN: Offset = new class implements Offset {
    rawValue: string = 'margin';

    apply(frame: Frame, value: number): Frame {
      return new Frame(value, value, value, value);
    }
  };

  static MARGIN_HORIZONTAL: Offset = new class implements Offset {
    rawValue: string = 'marginHorizontal';

    apply(frame: Frame, value: number): Frame {
      return new Frame(value, frame.origin.y, value, frame.size.height);
    }
  };

  static MARGIN_VERTICAL: Offset = new class implements Offset {
    rawValue: string = 'marginVertical';

    apply(frame: Frame, value: number): Frame {
      return new Frame(frame.origin.x, value, frame.size.width, value);
    }
  };

  static MARGIN_LEFT: Offset = new class implements Offset {
    rawValue: string = 'marginLeft';

    apply(frame: Frame, value: number): Frame {
      return new Frame(value, frame.origin.y, frame.size.width, frame.size.height);
    }
  };

  static MARGIN_TOP: Offset = new class implements Offset {
    rawValue: string = 'marginTop';

    apply(frame: Frame, value: number): Frame {
      return new Frame(frame.origin.x, value, frame.size.width, frame.size.height);
    }
  };

  static MARGIN_RIGHT: Offset = new class implements Offset {
    rawValue: string = 'marginRight';

    apply(frame: Frame, value: number): Frame {
      return new Frame(frame.origin.x, frame.origin.y, value, frame.size.height);
    }
  };

  static MARGIN_BOTTOM: Offset = new class implements Offset {
    rawValue: string = 'marginBottom';

    apply(frame: Frame, value: number): Frame {
      return new Frame(frame.origin.x, frame.origin.y, frame.size.width, value);
    }
  };

  static find(source: StyleProp<FlexStyle>): Frame {
    const offsetKeys: string[] = [
      Offsets.MARGIN.rawValue,
      Offsets.MARGIN_HORIZONTAL.rawValue,
      Offsets.MARGIN_VERTICAL.rawValue,
      Offsets.MARGIN_LEFT.rawValue,
      Offsets.MARGIN_TOP.rawValue,
      Offsets.MARGIN_RIGHT.rawValue,
      Offsets.MARGIN_BOTTOM.rawValue,
    ];

    const flatStyle: FlexStyle = StyleSheet.flatten(source) || {};

    return Object.keys(flatStyle)
                 .filter((key: string): boolean => offsetKeys.includes(key))
                 .reduce((acc: Frame, key: string): Frame => {

                   const value: number = flatStyle[key];
                   const offsetValue: Offset | undefined = Offsets.parse(key);

                   return offsetValue ? offsetValue.apply(acc, value) : acc;
                 }, Frame.zero());
  }

  static parse(value: string | Offset, fallback?: Offset): Offset | undefined {
    return Offsets.typeOf(value) ? value : Offsets.parseString(value, fallback);
  }

  private static parseString(rawValue: string, fallback?: Offset): Offset | undefined {
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

  private static typeOf(value: any): value is Offset {
    const { rawValue } = (<Offset>value);

    return rawValue !== undefined;
  }
}

export class PlacementOptions {
  constructor(readonly source: Frame = Frame.zero(),
              readonly other: Frame = Frame.zero(),
              readonly bounds: Frame = Frame.zero(),
              readonly offsets: Frame = Frame.zero()) {
  }
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

export class PopoverPlacements {

  static RIGHT_START: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'right start';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = this.parent().frame(options);

      return new Frame(
        origin.x,
        origin.y - (options.other.size.height - size.height) / 2 + options.offsets.origin.y,
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
  static LEFT_START: PopoverPlacement = new class implements PopoverPlacement {
    rawValue: string = 'left start';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = this.parent().frame(options);

      return new Frame(
        origin.x,
        origin.y - (options.other.size.height - size.height) / 2 + options.offsets.origin.y,
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
  static RIGHT_END: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'right end';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = this.parent().frame(options);

      return new Frame(
        origin.x,
        origin.y + (options.other.size.height - size.height) / 2 - options.offsets.size.height,
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
  static LEFT_END: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'left end';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = this.parent().frame(options);

      return new Frame(
        origin.x,
        origin.y + (options.other.size.height - size.height) / 2 - options.offsets.size.height,
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
  static RIGHT: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'right';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = options.source.rightOf(options.other).centerVerticalOf(options.other);

      const x: number = RTLService.select(
        origin.x - options.offsets.size.width,
        options.bounds.size.width - size.width - (origin.x - options.offsets.size.width),
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
  static LEFT: PopoverPlacement = new class implements PopoverPlacement {
    rawValue: string = 'left';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = options.source.leftOf(options.other).centerVerticalOf(options.other);

      const x: number = RTLService.select(
        origin.x + options.offsets.origin.x,
        options.bounds.size.width - size.width - (origin.x + options.offsets.size.width),
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
  static BOTTOM_START: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'bottom start';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = this.parent().frame(options);

      return new Frame(
        origin.x - (options.other.size.width - size.width) / 2 + options.offsets.origin.x,
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
  static TOP_START: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'top start';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = this.parent().frame(options);

      return new Frame(
        origin.x - (options.other.size.width - size.width) / 2 + options.offsets.origin.x,
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
  static BOTTOM_END: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'bottom end';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = this.parent().frame(options);

      return new Frame(
        origin.x + (options.other.size.width - size.width) / 2 - options.offsets.size.width,
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
  static TOP_END: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'top end';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = this.parent().frame(options);

      return new Frame(
        origin.x + (options.other.size.width - size.width) / 2 - options.offsets.size.width,
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
  static BOTTOM: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'bottom';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = options.source.bottomOf(options.other).centerHorizontalOf(options.other);

      const x: number = RTLService.select(
        origin.x,
        options.bounds.size.width - (origin.x + size.width),
      );

      return new Frame(
        x,
        origin.y - options.offsets.size.height,
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
  static TOP: PopoverPlacement = new class implements PopoverPlacement {
    rawValue = 'top';

    frame(options: PlacementOptions): Frame {
      const { origin, size } = options.source.topOf(options.other).centerHorizontalOf(options.other);


      const x: number = RTLService.select(
        origin.x,
        options.bounds.size.width - (origin.x + size.width),
      );

      return new Frame(
        x,
        origin.y + options.offsets.origin.y,
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

export interface FlexPlacement {
  direction: 'column' | 'row' | 'column-reverse' | 'row-reverse';
  alignment: 'flex-start' | 'flex-end' | 'center';
}

const fitsStart = (frame: Frame, other: Frame): boolean => {
  return RTLService.select(fitsLeft, fitsRight)(frame, other);
};

const fitsEnd = (frame: Frame, other: Frame): boolean => {
  return RTLService.select(fitsRight, fitsLeft)(frame, other);
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
