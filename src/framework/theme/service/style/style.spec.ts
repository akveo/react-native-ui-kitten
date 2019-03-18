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

  describe('* style mapping', () => {

    const props: StyledComponentProps & any = {
      checked: false,
      disabled: true,
    };

    it('config contains no pre-created mapping', () => {
      const value = service.getComponentStyleMapping(
        config.componentMapping,
        {},
        'Test',
        props,
        [],
      );

      expect(value).toMatchSnapshot();
    });

    it('throws warning for undeclared mapping keys', () => {
      service.getComponentStyleMapping(
        config.componentMapping,
        {},
        'Invalid',
        props,
        [],
      );

      jest.spyOn(console, 'warn');
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
