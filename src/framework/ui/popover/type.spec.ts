import {
  Frame,
  OffsetRect,
  PlacementOptions,
  PopoverPlacement,
  PopoverPlacements,
} from './type';

describe('@type: popover model checks', () => {

  describe('* frame', () => {

    const lhsFrame: Frame = new Frame(2, 2, 2, 2);
    const rhsFrame: Frame = new Frame(4, 4, 2, 2);

    it('* left of', () => {
      const { origin: { x, y } } = rhsFrame.leftOf(lhsFrame);

      expect(x).toEqual(0);
      expect(y).toEqual(4);
    });

    it('* top of', () => {
      const { origin: { x, y } } = rhsFrame.topOf(lhsFrame);

      expect(x).toEqual(4);
      expect(y).toEqual(0);
    });

    it('* right of', () => {
      const { origin: { x, y } } = rhsFrame.rightOf(lhsFrame);

      expect(x).toEqual(4);
      expect(y).toEqual(4);
    });

    it('* bottom of', () => {
      const { origin: { x, y } } = rhsFrame.bottomOf(lhsFrame);

      expect(x).toEqual(4);
      expect(y).toEqual(4);
    });

    it('* center horizontal of', () => {
      const { origin: { x, y } } = rhsFrame.centerHorizontalOf(lhsFrame);

      expect(x).toEqual(2);
      expect(y).toEqual(4);
    });

    it('* center vertical of', () => {
      const { origin: { x, y } } = rhsFrame.centerVerticalOf(lhsFrame);

      expect(x).toEqual(4);
      expect(y).toEqual(2);
    });

  });

  describe('* placement', () => {

    const options: PlacementOptions = {
      source: new Frame(6, 6, 2, 2),
      other: new Frame(2, 2, 4, 4),
      offsets: OffsetRect.zero(),
      bounds: Frame.zero(),
    };

    it('* left', () => {
      const { origin: { x, y } } = PopoverPlacements.LEFT.frame(options);

      expect(x).toEqual(0);
      expect(y).toEqual(3);
    });

    it('* left start', () => {
      const { origin: { x, y } } = PopoverPlacements.LEFT_START.frame(options);

      expect(x).toEqual(0);
      expect(y).toEqual(2);
    });

    it('* left end', () => {
      const { origin: { x, y } } = PopoverPlacements.LEFT_END.frame(options);

      expect(x).toEqual(0);
      expect(y).toEqual(4);
    });

    it('* top', () => {
      const { origin: { x, y } } = PopoverPlacements.TOP.frame(options);

      expect(x).toEqual(3);
      expect(y).toEqual(0);
    });

    it('* top start', () => {
      const { origin: { x, y } } = PopoverPlacements.TOP_START.frame(options);

      expect(x).toEqual(2);
      expect(y).toEqual(0);
    });

    it('* top end', () => {
      const { origin: { x, y } } = PopoverPlacements.TOP_END.frame(options);

      expect(x).toEqual(4);
      expect(y).toEqual(0);
    });

    it('* right', () => {
      const { origin: { x, y } } = PopoverPlacements.RIGHT.frame(options);

      expect(x).toEqual(6);
      expect(y).toEqual(3);
    });

    it('* right start', () => {
      const { origin: { x, y } } = PopoverPlacements.RIGHT_START.frame(options);

      expect(x).toEqual(6);
      expect(y).toEqual(2);
    });

    it('* right end', () => {
      const { origin: { x, y } } = PopoverPlacements.RIGHT_END.frame(options);

      expect(x).toEqual(6);
      expect(y).toEqual(4);
    });

    it('* bottom', () => {
      const { origin: { x, y } } = PopoverPlacements.BOTTOM.frame(options);

      expect(x).toEqual(3);
      expect(y).toEqual(6);
    });

    it('* bottom start', () => {
      const { origin: { x, y } } = PopoverPlacements.BOTTOM_START.frame(options);

      expect(x).toEqual(2);
      expect(y).toEqual(6);
    });

    it('* bottom end', () => {
      const { origin: { x, y } } = PopoverPlacements.BOTTOM_END.frame(options);

      expect(x).toEqual(4);
      expect(y).toEqual(6);
    });

  });

  describe('* placement - offset', () => {

    const options: PlacementOptions = {
      source: new Frame(6, 6, 2, 2),
      other: new Frame(2, 2, 4, 4),
      bounds: Frame.zero(),
      offsets: {
        left: 2,
        top: 2,
        right: 2,
        bottom: 2,
      },
    };

    it('* left', () => {
      const { origin: { x, y } } = PopoverPlacements.LEFT.frame(options);

      expect(x).toEqual(2);
      expect(y).toEqual(3);
    });

    it('* left start', () => {
      const { origin: { x, y } } = PopoverPlacements.LEFT_START.frame(options);

      expect(x).toEqual(2);
      expect(y).toEqual(4);
    });

    it('* left end', () => {
      const { origin: { x, y } } = PopoverPlacements.LEFT_END.frame(options);

      expect(x).toEqual(2);
      expect(y).toEqual(2);
    });

    it('* top', () => {
      const { origin: { x, y } } = PopoverPlacements.TOP.frame(options);

      expect(x).toEqual(3);
      expect(y).toEqual(2);
    });

    it('* top start', () => {
      const { origin: { x, y } } = PopoverPlacements.TOP_START.frame(options);

      expect(x).toEqual(4);
      expect(y).toEqual(2);
    });

    it('* top end', () => {
      const { origin: { x, y } } = PopoverPlacements.TOP_END.frame(options);

      expect(x).toEqual(2);
      expect(y).toEqual(2);
    });

    it('* right', () => {
      const { origin: { x, y } } = PopoverPlacements.RIGHT.frame(options);

      expect(x).toEqual(4);
      expect(y).toEqual(3);
    });

    it('* right start', () => {
      const { origin: { x, y } } = PopoverPlacements.RIGHT_START.frame(options);

      expect(x).toEqual(4);
      expect(y).toEqual(4);
    });

    it('* right end', () => {
      const { origin: { x, y } } = PopoverPlacements.RIGHT_END.frame(options);

      expect(x).toEqual(4);
      expect(y).toEqual(2);
    });

    it('* bottom', () => {
      const { origin: { x, y } } = PopoverPlacements.BOTTOM.frame(options);

      expect(x).toEqual(3);
      expect(y).toEqual(4);
    });

    it('* bottom start', () => {
      const { origin: { x, y } } = PopoverPlacements.BOTTOM_START.frame(options);

      expect(x).toEqual(4);
      expect(y).toEqual(4);
    });

    it('* bottom end', () => {
      const { origin: { x, y } } = PopoverPlacements.BOTTOM_END.frame(options);

      expect(x).toEqual(2);
      expect(y).toEqual(4);
    });

  });

  describe('* placement - reverse', () => {

    const options: PlacementOptions = {
      source: new Frame(6, 6, 2, 2),
      other: new Frame(2, 2, 4, 4),
      bounds: Frame.zero(),
      offsets: OffsetRect.zero(),
    };

    it('* left', () => {
      const { origin: { x, y } } = PopoverPlacements.LEFT.reverse().frame(options);

      expect(x).toEqual(6);
      expect(y).toEqual(3);
    });

    it('* left start', () => {
      const { origin: { x, y } } = PopoverPlacements.LEFT_START.reverse().frame(options);

      expect(x).toEqual(6);
      expect(y).toEqual(2);
    });

    it('* left end', () => {
      const { origin: { x, y } } = PopoverPlacements.LEFT_END.reverse().frame(options);

      expect(x).toEqual(6);
      expect(y).toEqual(4);
    });

    it('* top', () => {
      const { origin: { x, y } } = PopoverPlacements.TOP.reverse().frame(options);

      expect(x).toEqual(3);
      expect(y).toEqual(6);
    });

    it('* top start', () => {
      const { origin: { x, y } } = PopoverPlacements.TOP_START.reverse().frame(options);

      expect(x).toEqual(2);
      expect(y).toEqual(6);
    });

    it('* top end', () => {
      const { origin: { x, y } } = PopoverPlacements.TOP_END.reverse().frame(options);

      expect(x).toEqual(4);
      expect(y).toEqual(6);
    });

    it('* right', () => {
      const { origin: { x, y } } = PopoverPlacements.RIGHT.reverse().frame(options);

      expect(x).toEqual(0);
      expect(y).toEqual(3);
    });

    it('* right start', () => {
      const { origin: { x, y } } = PopoverPlacements.RIGHT_START.reverse().frame(options);

      expect(x).toEqual(0);
      expect(y).toEqual(2);
    });

    it('* right end', () => {
      const { origin: { x, y } } = PopoverPlacements.RIGHT_END.reverse().frame(options);

      expect(x).toEqual(0);
      expect(y).toEqual(4);
    });

    it('* bottom', () => {
      const { origin: { x, y } } = PopoverPlacements.BOTTOM.reverse().frame(options);

      expect(x).toEqual(3);
      expect(y).toEqual(0);
    });

    it('* bottom start', () => {
      const { origin: { x, y } } = PopoverPlacements.BOTTOM_START.reverse().frame(options);

      expect(x).toEqual(2);
      expect(y).toEqual(0);
    });

    it('* bottom end', () => {
      const { origin: { x, y } } = PopoverPlacements.BOTTOM_END.reverse().frame(options);

      expect(x).toEqual(4);
      expect(y).toEqual(0);
    });

  });

  describe('* raw constructor', () => {

    it('* left', () => {
      const placement: PopoverPlacement = PopoverPlacements.parse('left');

      expect(placement.rawValue).toEqual(PopoverPlacements.LEFT.rawValue);
    });

    it('* left start', () => {
      const placement: PopoverPlacement = PopoverPlacements.parse('left start');

      expect(placement.rawValue).toEqual(PopoverPlacements.LEFT_START.rawValue);
    });

    it('* left end', () => {
      const placement: PopoverPlacement = PopoverPlacements.parse('left end');

      expect(placement.rawValue).toEqual(PopoverPlacements.LEFT_END.rawValue);
    });

    it('* top', () => {
      const placement: PopoverPlacement = PopoverPlacements.parse('top');

      expect(placement.rawValue).toEqual(PopoverPlacements.TOP.rawValue);
    });

    it('* top start', () => {
      const placement: PopoverPlacement = PopoverPlacements.parse('top start');

      expect(placement.rawValue).toEqual(PopoverPlacements.TOP_START.rawValue);
    });

    it('* top end', () => {
      const placement: PopoverPlacement = PopoverPlacements.parse('top end');

      expect(placement.rawValue).toEqual(PopoverPlacements.TOP_END.rawValue);
    });

    it('* right', () => {
      const placement: PopoverPlacement = PopoverPlacements.parse('right');

      expect(placement.rawValue).toEqual(PopoverPlacements.RIGHT.rawValue);
    });

    it('* right start', () => {
      const placement: PopoverPlacement = PopoverPlacements.parse('right start');

      expect(placement.rawValue).toEqual(PopoverPlacements.RIGHT_START.rawValue);
    });

    it('* right end', () => {
      const placement: PopoverPlacement = PopoverPlacements.parse('right end');

      expect(placement.rawValue).toEqual(PopoverPlacements.RIGHT_END.rawValue);
    });

    it('* bottom', () => {
      const placement: PopoverPlacement = PopoverPlacements.parse('bottom');

      expect(placement.rawValue).toEqual(PopoverPlacements.BOTTOM.rawValue);
    });

    it('* bottom start', () => {
      const placement: PopoverPlacement = PopoverPlacements.parse('bottom start');

      expect(placement.rawValue).toEqual(PopoverPlacements.BOTTOM_START.rawValue);
    });

    it('* bottom end', () => {
      const placement: PopoverPlacement = PopoverPlacements.parse('bottom end');

      expect(placement.rawValue).toEqual(PopoverPlacements.BOTTOM_END.rawValue);
    });

    it('* fallback', () => {
      const placement: PopoverPlacement = PopoverPlacements.parse('undefined', PopoverPlacements.BOTTOM);

      expect(placement.rawValue).toEqual(PopoverPlacements.BOTTOM.rawValue);
    });

  });

});
