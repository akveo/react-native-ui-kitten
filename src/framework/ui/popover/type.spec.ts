import React from 'react';
import {
  Frame,
  Placement,
  Placements,
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

    const lhsFrame: Frame = new Frame(2, 2, 4, 4);
    const rhsFrame: Frame = new Frame(6, 6, 2, 2);

    it('* left', () => {
      const { origin: { x, y } } = Placements.LEFT.frame(rhsFrame, lhsFrame);

      expect(x).toEqual(0);
      expect(y).toEqual(3);
    });

    it('* left start', () => {
      const { origin: { x, y } } = Placements.LEFT_START.frame(rhsFrame, lhsFrame);

      expect(x).toEqual(0);
      expect(y).toEqual(2);
    });

    it('* left end', () => {
      const { origin: { x, y } } = Placements.LEFT_END.frame(rhsFrame, lhsFrame);

      expect(x).toEqual(0);
      expect(y).toEqual(4);
    });

    it('* top', () => {
      const { origin: { x, y } } = Placements.TOP.frame(rhsFrame, lhsFrame);

      expect(x).toEqual(3);
      expect(y).toEqual(0);
    });

    it('* top start', () => {
      const { origin: { x, y } } = Placements.TOP_START.frame(rhsFrame, lhsFrame);

      expect(x).toEqual(2);
      expect(y).toEqual(0);
    });

    it('* top end', () => {
      const { origin: { x, y } } = Placements.TOP_END.frame(rhsFrame, lhsFrame);

      expect(x).toEqual(4);
      expect(y).toEqual(0);
    });

    it('* right', () => {
      const { origin: { x, y } } = Placements.RIGHT.frame(rhsFrame, lhsFrame);

      expect(x).toEqual(6);
      expect(y).toEqual(3);
    });

    it('* right start', () => {
      const { origin: { x, y } } = Placements.RIGHT_START.frame(rhsFrame, lhsFrame);

      expect(x).toEqual(6);
      expect(y).toEqual(2);
    });

    it('* right end', () => {
      const { origin: { x, y } } = Placements.RIGHT_END.frame(rhsFrame, lhsFrame);

      expect(x).toEqual(6);
      expect(y).toEqual(4);
    });

    it('* bottom', () => {
      const { origin: { x, y } } = Placements.BOTTOM.frame(rhsFrame, lhsFrame);

      expect(x).toEqual(3);
      expect(y).toEqual(6);
    });

    it('* bottom start', () => {
      const { origin: { x, y } } = Placements.BOTTOM_START.frame(rhsFrame, lhsFrame);

      expect(x).toEqual(2);
      expect(y).toEqual(6);
    });

    it('* bottom end', () => {
      const { origin: { x, y } } = Placements.BOTTOM_END.frame(rhsFrame, lhsFrame);

      expect(x).toEqual(4);
      expect(y).toEqual(6);
    });

  });

  describe('* placement - reverse', () => {

    const lhsFrame: Frame = new Frame(2, 2, 4, 4);
    const rhsFrame: Frame = new Frame(6, 6, 2, 2);

    it('* left', () => {
      const { origin: { x, y } } = Placements.LEFT.reverse().frame(rhsFrame, lhsFrame);

      expect(x).toEqual(6);
      expect(y).toEqual(3);
    });

    it('* left start', () => {
      const { origin: { x, y } } = Placements.LEFT_START.reverse().frame(rhsFrame, lhsFrame);

      expect(x).toEqual(6);
      expect(y).toEqual(2);
    });

    it('* left end', () => {
      const { origin: { x, y } } = Placements.LEFT_END.reverse().frame(rhsFrame, lhsFrame);

      expect(x).toEqual(6);
      expect(y).toEqual(4);
    });

    it('* top', () => {
      const { origin: { x, y } } = Placements.TOP.reverse().frame(rhsFrame, lhsFrame);

      expect(x).toEqual(3);
      expect(y).toEqual(6);
    });

    it('* top start', () => {
      const { origin: { x, y } } = Placements.TOP_START.reverse().frame(rhsFrame, lhsFrame);

      expect(x).toEqual(2);
      expect(y).toEqual(6);
    });

    it('* top end', () => {
      const { origin: { x, y } } = Placements.TOP_END.reverse().frame(rhsFrame, lhsFrame);

      expect(x).toEqual(4);
      expect(y).toEqual(6);
    });

    it('* right', () => {
      const { origin: { x, y } } = Placements.RIGHT.reverse().frame(rhsFrame, lhsFrame);

      expect(x).toEqual(0);
      expect(y).toEqual(3);
    });

    it('* right start', () => {
      const { origin: { x, y } } = Placements.RIGHT_START.reverse().frame(rhsFrame, lhsFrame);

      expect(x).toEqual(0);
      expect(y).toEqual(2);
    });

    it('* right end', () => {
      const { origin: { x, y } } = Placements.RIGHT_END.reverse().frame(rhsFrame, lhsFrame);

      expect(x).toEqual(0);
      expect(y).toEqual(4);
    });

    it('* bottom', () => {
      const { origin: { x, y } } = Placements.BOTTOM.reverse().frame(rhsFrame, lhsFrame);

      expect(x).toEqual(3);
      expect(y).toEqual(0);
    });

    it('* bottom start', () => {
      const { origin: { x, y } } = Placements.BOTTOM_START.reverse().frame(rhsFrame, lhsFrame);

      expect(x).toEqual(2);
      expect(y).toEqual(0);
    });

    it('* bottom end', () => {
      const { origin: { x, y } } = Placements.BOTTOM_END.reverse().frame(rhsFrame, lhsFrame);

      expect(x).toEqual(4);
      expect(y).toEqual(0);
    });

  });

  describe('* raw constructor', () => {

    it('* left', () => {
      const placement: Placement = Placements.parse('left');

      expect(placement.rawValue).toEqual(Placements.LEFT.rawValue);
    });

    it('* left start', () => {
      const placement: Placement = Placements.parse('left start');

      expect(placement.rawValue).toEqual(Placements.LEFT_START.rawValue);
    });

    it('* left end', () => {
      const placement: Placement = Placements.parse('left end');

      expect(placement.rawValue).toEqual(Placements.LEFT_END.rawValue);
    });

    it('* top', () => {
      const placement: Placement = Placements.parse('top');

      expect(placement.rawValue).toEqual(Placements.TOP.rawValue);
    });

    it('* top start', () => {
      const placement: Placement = Placements.parse('top start');

      expect(placement.rawValue).toEqual(Placements.TOP_START.rawValue);
    });

    it('* top end', () => {
      const placement: Placement = Placements.parse('top end');

      expect(placement.rawValue).toEqual(Placements.TOP_END.rawValue);
    });

    it('* right', () => {
      const placement: Placement = Placements.parse('right');

      expect(placement.rawValue).toEqual(Placements.RIGHT.rawValue);
    });

    it('* right start', () => {
      const placement: Placement = Placements.parse('right start');

      expect(placement.rawValue).toEqual(Placements.RIGHT_START.rawValue);
    });

    it('* right end', () => {
      const placement: Placement = Placements.parse('right end');

      expect(placement.rawValue).toEqual(Placements.RIGHT_END.rawValue);
    });

    it('* bottom', () => {
      const placement: Placement = Placements.parse('bottom');

      expect(placement.rawValue).toEqual(Placements.BOTTOM.rawValue);
    });

    it('* bottom start', () => {
      const placement: Placement = Placements.parse('bottom start');

      expect(placement.rawValue).toEqual(Placements.BOTTOM_START.rawValue);
    });

    it('* bottom end', () => {
      const placement: Placement = Placements.parse('bottom end');

      expect(placement.rawValue).toEqual(Placements.BOTTOM_END.rawValue);
    });

    it('* fallback', () => {
      const placement: Placement = Placements.parse('undefined', Placements.BOTTOM);

      expect(placement.rawValue).toEqual(Placements.BOTTOM.rawValue);
    });

  });

});
