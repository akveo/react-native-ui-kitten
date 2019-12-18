describe('@datepicker component checks', () => {

  const message: string = [
    'Unfortunately, there is no way to test Datepicker since it relies on native code to perform measuring.',
    'However, most use cases are covered with tests of Calendar and the Input element of Datepicker',
  ].join('\n');

  it('inform unable to perform test', () => {
    console.info(message);
  });

});
