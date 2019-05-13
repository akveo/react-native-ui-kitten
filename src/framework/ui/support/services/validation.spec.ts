import { isValidString } from '@kitten/ui/support/services/validation.service';

describe('@validation: service checks', () => {

  it('* isValidString: non-empty', () => {
    const result: boolean = isValidString('test');

    expect(result).toBe(true);
  });

  it('* isValidString: empty', () => {
    const result: boolean = isValidString('');

    expect(result).toBe(false);
  });

  it('* isValidString: falsy', () => {
    const result: boolean = isValidString(undefined);

    expect(result).toBe(false);
  });

});
