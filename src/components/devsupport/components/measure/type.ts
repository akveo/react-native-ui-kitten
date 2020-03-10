import {
  Dimensions,
  ScaledSize,
} from 'react-native';

export class Point {

  constructor(readonly x: number,
              readonly y: number) {
  }

  static zero(): Point {
    return new Point(0, 0);
  }

  static outscreen(): Point {
    return new Point(-999, -999);
  }

  public equals(other: Point): boolean {
    if (!other) {
      return false;
    }
    return this.x === other.x && this.y === other.y;
  }
}

export class Size {

  constructor(readonly width: number,
              readonly height: number) {

  }

  static zero(): Size {
    return new Size(0, 0);
  }

  public equals(other: Size): boolean {
    if (!other) {
      return false;
    }
    return this.width === other.width && this.height === other.height;
  }
}

export class Frame {

  readonly origin: Point;
  readonly size: Size;

  constructor(x: number, y: number, width: number, height: number) {
    this.origin = new Point(x, y);
    this.size = new Size(width, height);
  }

  static zero(): Frame {
    return new Frame(0, 0, 0, 0);
  }

  static window(): Frame {
    const window: ScaledSize = Dimensions.get('window');
    return new Frame(0, 0, window.width, window.height);
  }

  static outscreen(): Frame {
    const point: Point = Point.outscreen();
    return new Frame(point.x, point.y, 0, 0);
  }

  public equals(other: Frame): boolean {
    if (!other) {
      return false;
    }
    return this.origin.equals(other.origin) && this.size.equals(other.size);
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

  public centerOf(other: Frame): Frame {
    return new Frame(
      other.origin.x + (other.size.width - this.size.width) / 2,
      other.origin.y + (other.size.height - this.size.height) / 2,
      this.size.width,
      this.size.height,
    );
  }
}
