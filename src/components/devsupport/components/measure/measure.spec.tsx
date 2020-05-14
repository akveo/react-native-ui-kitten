import React from 'react';
import {
  Frame,
  Point,
  Size,
} from './type';

describe('@measure: frame class instance checks', () => {

  const lhsFrame: Frame = new Frame(2, 2, 2, 2);
  const rhsFrame: Frame = new Frame(4, 4, 2, 2);

  it('left of', () => {
    const { origin: { x, y } } = rhsFrame.leftOf(lhsFrame);

    expect(x).toEqual(0);
    expect(y).toEqual(4);
  });

  it('top of', () => {
    const { origin: { x, y } } = rhsFrame.topOf(lhsFrame);

    expect(x).toEqual(4);
    expect(y).toEqual(0);
  });

  it('right of', () => {
    const { origin: { x, y } } = rhsFrame.rightOf(lhsFrame);

    expect(x).toEqual(4);
    expect(y).toEqual(4);
  });

  it('bottom of', () => {
    const { origin: { x, y } } = rhsFrame.bottomOf(lhsFrame);

    expect(x).toEqual(4);
    expect(y).toEqual(4);
  });

  it('center horizontal of', () => {
    const { origin: { x, y } } = rhsFrame.centerHorizontalOf(lhsFrame);

    expect(x).toEqual(2);
    expect(y).toEqual(4);
  });

  it('center vertical of', () => {
    const { origin: { x, y } } = rhsFrame.centerVerticalOf(lhsFrame);

    expect(x).toEqual(4);
    expect(y).toEqual(2);
  });

  it('center of', () => {
    const { origin: { x, y } } = rhsFrame.centerOf(lhsFrame);

    expect(x).toEqual(2);
    expect(y).toEqual(2);
  });

  it('point equals', () => {
    expect(Point.zero().equals(new Point(0, 0))).toBeTruthy();
    expect(Point.zero().equals(new Point(0, 1))).toBeFalsy();
    expect(Point.zero().equals(null)).toBeFalsy();
  });

  it('size equals', () => {
    expect(Size.zero().equals(new Size(0, 0))).toBeTruthy();
    expect(Size.zero().equals(new Size(0, 1))).toBeFalsy();
    expect(Size.zero().equals(null)).toBeFalsy();
  });

  it('frame equals', () => {
    expect(Frame.zero().equals(new Frame(0, 0, 0, 0))).toBeTruthy();
    expect(Frame.zero().equals(new Frame(0, 0, 0, 1))).toBeFalsy();
    expect(Frame.zero().equals(null)).toBeFalsy();
  });

});
