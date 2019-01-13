import { StyleConsumerService } from './styleConsumer.service';
import { StyledComponentProps } from '../../component';
import {
  Interaction,
  State,
} from '../../type';
import * as Service from './style.service';
import * as config from './style.spec.config';

describe('@style: state type checks', () => {

  describe('* interaction', () => {

    it('* defined value', () => {
      const value = Interaction.parse('active');

      expect(value).toEqual(Interaction.ACTIVE);
    });

    it('* undefined value', () => {
      const value = Interaction.parse('undefined');

      expect(value).toEqual(undefined);
    });

  });

  describe('* state', () => {

    it('* defined value', () => {
      const value = State.parse('checked');

      expect(value).toEqual(State.CHECKED);
    });

    it('* undefined value', () => {
      const value = State.parse('undefined');

      expect(value).toEqual(undefined);
    });

  });

});

describe('@style: consumer service methods check', () => {

  const service: StyleConsumerService = new StyleConsumerService();

  describe('* variant prop keys', () => {

    describe('* props contain variant(s)', () => {

      const props: StyledComponentProps & any = {
        status: 'success',
        size: 'small',
      };

      it('* config contains no expected component', () => {
        const value = service.getVariantPropKeys(config.componentMapping, 'Undefined', props);

        expect(value).toEqual([]);
      });

      it('* config contains variant', () => {
        const value = service.getVariantPropKeys(config.componentMapping, 'Test', props);

        expect(value).toEqual(['success', 'small']);
      });

      it('* config contains no variant', () => {
        const value = service.getVariantPropKeys(config.componentMapping, 'Empty', props);

        expect(value).toEqual([]);
      });
    });

    describe('* props contain no variant', () => {

      const props: StyledComponentProps & any = {
        value: 'success',
      };

      it('* config contains variant', () => {
        const value = service.getVariantPropKeys(config.componentMapping, 'Test', props);

        expect(value).toEqual([]);
      });

    });

  });

  describe('* state prop keys', () => {

    const props: StyledComponentProps & any = {
      checked: false,
      disabled: true,
    };

    it('* no interaction', () => {
      const value = service.getStatePropKeys(
        config.componentMapping,
        'Test',
        props,
      );

      expect(value).toEqual(['disabled']);
    });

    it('* config contains appearance states', () => {
      const value = service.getStatePropKeys(
        config.componentMapping,
        'Test',
        props,
        [Interaction.ACTIVE],
      );

      expect(value).toEqual(['active', 'disabled']);
    });

    it('* config contains no appearance states', () => {
      const value = service.getStatePropKeys(
        config.componentMapping,
        'Empty',
        props,
        [Interaction.ACTIVE],
      );

      expect(value).toEqual(['active']);
    });

    it('* config contains variant states', () => {
      const value = service.getStatePropKeys(
        config.componentMapping,
        'Test',
        props,
        [Interaction.ACTIVE],
      );

      expect(value).toEqual(['active', 'disabled']);
    });

    it('* config contains no variant states', () => {
      const value = service.getStatePropKeys(
        config.componentMapping,
        'Empty',
        props,
        [Interaction.ACTIVE],
      );

      expect(value).toEqual(['active']);
    });

  });

  describe('* style mapping', () => {

    const props: StyledComponentProps & any = {
      checked: false,
      disabled: true,
    };

    it('config contains pre-created mapping', () => {
      const value = service.getComponentStyleMapping(
        config.componentMapping,
        'Test',
        props,
        'custom',
        [],
      );

      expect(value).toMatchSnapshot();
    });

    it('config contains no pre-created mapping', () => {
      const value = service.getComponentStyleMapping(
        config.componentMapping,
        'Test',
        props,
        'undefined',
        [],
      );

      expect(value).toMatchSnapshot();
    });

  });

});

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
