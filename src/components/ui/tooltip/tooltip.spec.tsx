describe('@tooltip: component checks', () => {

  const message: string = [
    'Unfortunately, there is no way to test Tooltip since it relies on native code to perform measuring.',
  ].join('\n');


  it('inform unable to perform test', () => {
    console.info(message);
  });

});
