/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

describe('@autocomplete: component checks', () => {

  const message: string = [
    'Unfortunately, there is no way to test Autocomplete since it relies on native code to perform measuring.',
    'However, most use cases are covered with tests of Input and List components.',
  ].join('\n');

  it('inform unable to perform test', () => {
    console.info(message);
  });

});
