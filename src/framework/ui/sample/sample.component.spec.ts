function sum(lhs: number, rhs: number) {
  return lhs + rhs;
}

it('adds 2 + 2 to equal 4 in JavaScript', () => {
  expect(sum(2, 2)).toBe(4);
});
