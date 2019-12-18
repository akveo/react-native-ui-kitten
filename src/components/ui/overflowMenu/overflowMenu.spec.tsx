describe('@overflow-menu: component checks', () => {

  const message: string = [
    'Unfortunately, there is no way to test OverflowMenu since it relies on native code to perform measuring.',
    'However, most use cases are covered with tests of Menu component',
  ].join('\n');

  it('inform unable to perform test', () => {
    console.info(message);
  });

});
