import { StyleConsumerService } from './styleConsumer.service';
import { APPEARANCE_DEFAULT } from 'eva';
import {
  Interaction,
  State,
} from '../../type';
import * as Service from './style.service';
import * as config from './style.spec.config';

describe('@style: service methods checks', () => {

  describe('* styling', () => {

    it('* default theme', () => {
      const style = Service.createThemedStyle(config.mapping, config.theme);

      expect(style).toMatchSnapshot();
    });

    it('* inverse theme', () => {
      const style = Service.createThemedStyle(config.mapping, config.themeInverse);

      expect(style).toMatchSnapshot();
    });

  });

});

describe('@style: consumer service methods check', () => {

  const service: StyleConsumerService = new StyleConsumerService();

  it('retrieves variant prop keys properly', () => {
    const defaultAppearanceKeys = service.getVariantPropKeys(config.componentMapping, 'Test', {
      appearance: APPEARANCE_DEFAULT,
      checked: false,
      status: 'info',
      size: 'small',
    });
    const customAppearanceKeys = service.getVariantPropKeys(config.componentMapping, 'Test', {
      appearance: 'custom',
      checked: false,
      size: 'small',
    });
    const undefinedAppearanceKeys = service.getVariantPropKeys(config.componentMapping, 'Test', {
      appearance: 'undefined',
      checked: false,
      status: 'info',
    });

    expect(defaultAppearanceKeys).toEqual(['info', 'small']);
    expect(customAppearanceKeys).toEqual(['small']);
    expect(undefinedAppearanceKeys).toEqual(['info']);
  });

  it('retrieves state prop keys properly', () => {
    const falsyKeys = service.getStatePropKeys(config.componentMapping, 'Test', {
      appearance: APPEARANCE_DEFAULT,
      checked: false,
      disabled: true,
    });

    const statelessKeys = service.getStatePropKeys(config.componentMapping, 'Test', {
      appearance: APPEARANCE_DEFAULT,
      checked: true,
      disabled: true,
    }, []);

    const activeKeys = service.getStatePropKeys(config.componentMapping, 'Test', {
      appearance: APPEARANCE_DEFAULT,
      checked: true,
      disabled: true,
    }, [Interaction.ACTIVE]);

    expect(falsyKeys).toEqual(['disabled']);
    expect(statelessKeys).toEqual(['checked', 'disabled']);
    expect(activeKeys).toEqual(['active', 'checked', 'disabled']);
  });

  it('parses action properly', () => {
    const active = Interaction.parse('active');
    const undefined = Interaction.parse('undefined');

    expect(active).toEqual(Interaction.ACTIVE);
    expect(undefined).toBeUndefined();
  });


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

