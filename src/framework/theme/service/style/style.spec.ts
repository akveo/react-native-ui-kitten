import { ThemedStyleType } from '@eva/core';
import { StyleConsumerService } from './styleConsumer.service';
import {
  StyledComponentProps,
  ContextProps,
} from '../../component';
import {
  Interaction,
  State,
  StyleType,
} from '../../type';
import * as Service from './style.service';
import { default as style } from '../../common/styles.json';
import { default as theme } from '../../common/theme.json';

const json = (value: any): string => JSON.stringify(value);

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

  const context: ContextProps = {
    style: style,
    theme: theme,
  };

  const service: StyleConsumerService = new StyleConsumerService('Radio', context);

  describe('* style mapping', () => {

    const derivedProps: StyledComponentProps & any = {
      appearance: 'default',
      disabled: true,
    };

    it('creates valid default props', () => {
      const value: StyledComponentProps = service.createDefaultProps();

      expect(json(value)).toEqual(json({
        appearance: 'default',
        size: 'medium',
      }));
    });

    it('creates valid themedStyle prop', () => {
      const defaultProps: StyledComponentProps = service.createDefaultProps();

      const props: StyledComponentProps = {
        ...defaultProps,
        ...derivedProps,
      };

      const value: StyledComponentProps = service.withStyledProps(props, context, [Interaction.ACTIVE]);

      expect(value.themedStyle).toMatchSnapshot();
    });

  });

});

describe('@style: service methods checks', () => {

  describe('* styling', () => {

    const mapping: ThemedStyleType = {
      prop1: 'blue-primary',
      prop2: 'blue-dark',
      prop3: 'gray-primary',
      prop4: 42,
    };

    it('* default theme', () => {
      const value: StyleType = Service.createThemedStyle(mapping, theme);

      expect(value).toMatchSnapshot();
    });

  });

});
