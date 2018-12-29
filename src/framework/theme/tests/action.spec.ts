import {
  Interaction,
  State,
} from '../component';

describe('@style: interaction type checks', () => {

  it('parses action properly', () => {
    const active = Interaction.parse('active');
    const undefined = Interaction.parse('undefined');

    expect(active).toEqual(Interaction.ACTIVE);
    expect(undefined).toBeUndefined();
  });

});

describe('@style: configuration type checks', () => {

  it('parses action properly', () => {
    const checked = State.parse('checked');
    const disabled = State.parse('disabled');
    const focus = State.parse('focused');
    const undefined = State.parse('undefined');

    expect(checked).toEqual(State.CHECKED);
    expect(disabled).toEqual(State.DISABLED);
    expect(focus).toEqual(State.FOCUSED);
    expect(undefined).toBeUndefined();
  });

});
