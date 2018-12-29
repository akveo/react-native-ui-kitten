import { Action } from '../component';

describe('@style: action type checks', () => {

  it('parses action properly', () => {
    const stateless = Action.parse('');
    const checked = Action.parse('checked');
    const disabled = Action.parse('disabled');
    const active = Action.parse('active');
    const focus = Action.parse('focus');
    const undefined = Action.parse('undefined');

    expect(stateless).toEqual(Action.STATELESS);
    expect(checked).toEqual(Action.STATE_CHECKED);
    expect(disabled).toEqual(Action.STATE_DISABLED);
    expect(active).toEqual(Action.STATE_ACTIVE);
    expect(focus).toEqual(Action.STATE_FOCUS);
    expect(undefined).toBeUndefined();
  });

});
