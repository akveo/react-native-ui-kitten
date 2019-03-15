import { StyleConsumerService } from './styleConsumer.service';
import { StyledComponentProps } from '../../component';
import {
  Interaction,
  State,
} from '../../type';
import * as Service from './style.service';
import * as config from './style.spec.config';
import { ThemedStyleType } from 'eva/packages/types/index';

function stringify(variable: any): string {
  return JSON.stringify(variable);
}

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

    it('* extract valid component params', () => {

      const value: string[] = service.getValidComponentStyles(
        config.componentMapping,
        'Test',
        props,
      );

      expect(JSON.stringify(value)).toBe(JSON.stringify([
        'size',
        'innerSize',
        'borderWidth',
        'borderColor',
        'selectColor',
      ]));
    });

  });

});

describe('@style: service methods checks', () => {

  describe('* styling', () => {

    const styleConsumerService: StyleConsumerService = new StyleConsumerService();
    const props: StyledComponentProps & any = {
      checked: false,
      disabled: true,
    };
    const validParams: string[] = styleConsumerService.getValidComponentStyles(
      config.componentMapping,
      'Test',
      props,
    );

    it('* default theme', () => {
      const style = Service.createThemedStyle(config.mapping, config.theme, validParams);

      expect(style).toMatchSnapshot();
    });

    it('* inverse theme', () => {
      const style = Service.createThemedStyle(config.mapping, config.themeInverse, validParams);

      expect(style).toMatchSnapshot();
    });

    describe('* auxiliary style service methods', () => {

      describe('* object not valid field "reducing"', () => {

        it('* usual mapping', () => {
          const mapping: ThemedStyleType = {
            prop1: 'grayLight',
            prop2: 'grayPrimary',
            prop3: 'grayDark',
            prop4: 'bluePrimary',
            prop5: 'blueDark',
          };
          const validKeys: string[] = [
            'prop1', 'prop2', 'prop3',
          ];
          const expectedOutput: ThemedStyleType = {
            prop1: 'grayLight',
            prop2: 'grayPrimary',
            prop3: 'grayDark',
          };
          const reducedMapping: ThemedStyleType = Service.getReducedMapping(mapping, validKeys);
          expect(stringify(reducedMapping)).toBe(stringify(expectedOutput));
        });

        it('* unusual valid styles', () => {
          const mapping: ThemedStyleType = {
            prop1: 'grayLight',
            prop2: 'grayPrimary',
            prop3: 'grayDark',
            prop4: 'bluePrimary',
            prop5: 'blueDark',
          };
          const validKeys: string[] = [];
          const reducedMapping: ThemedStyleType = Service.getReducedMapping(mapping, validKeys);
          expect(stringify(reducedMapping)).toBe(stringify(mapping));
        });

      });

      describe('* arrays matching validation', () => {

        it('* case 1', () => {
          const array1: string[] = ['1', '2', '3', '4', '5'];
          const array2: string[] = ['1', '2', '3'];
          const expectedArray: string[] = ['4', '5'];
          const value: string[] = Service.validate(array1, array2);

          expect(stringify(value)).toBe(stringify(expectedArray));
        });

        it('* case 2', () => {
          const array1: string[] = ['1', '2', '3', '4', '5'];
          const array2: string[] = ['1', '2', '3', '4', '5'];
          const expectedArray: string[] = [];
          const value: string[] = Service.validate(array1, array2);

          expect(stringify(value)).toBe(stringify(expectedArray));
        });

        it('* case 3', () => {
          const array1: string[] = ['1', '2', '3', '4', '5'];
          const array2: string[] = [];
          const expectedArray: string[] = ['1', '2', '3', '4', '5'];
          const value: string[] = Service.validate(array1, array2);

          expect(stringify(value)).toBe(stringify(expectedArray));
        });

      });

    });

  });

});
