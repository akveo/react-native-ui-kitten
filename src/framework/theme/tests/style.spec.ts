import {
  mapping,
  theme,
} from './config';
import * as Service from '../service/styleUtil.service';
import { APPEARANCE_DEFAULT } from '../service';

describe('@style: service methods checks', () => {

  const { Test: testMapping } = mapping;

  const json = (object: any) => JSON.stringify(object);

  it('normalizes appearance properly', () => {
    const implicitDefault = Service.normalizeAppearance('default');
    const custom = Service.normalizeAppearance('custom');
    const empty = Service.normalizeAppearance('');
    const nullable = Service.normalizeAppearance(undefined);

    expect(implicitDefault).toEqual([
      'default',
    ]);
    expect(custom).toEqual([
      'default',
      'custom',
    ]);
    expect(empty).toEqual([
      'default',
    ]);
    expect(nullable).toEqual([
      'default',
    ]);
  });

  it('normalizes variants properly', () => {
    const success = Service.normalizeVariants([
      'success',
    ]);
    const successTiny = Service.normalizeVariants([
      'success',
      'tiny',
    ]);
    const withDuplicates = Service.normalizeVariants([
      'success',
      'success',
      'tiny',
    ]);
    const withNulls = Service.normalizeVariants([
      'success',
      undefined,
      'tiny',
      null,
    ]);
    const empty = Service.normalizeVariants([
      '',
    ]);

    expect(success).toEqual([
      'success',
    ]);
    expect(successTiny).toEqual([
      'success',
      'tiny',
    ]);
    expect(withDuplicates).toEqual([
      'success',
      'tiny',
    ]);
    expect(withNulls).toEqual([
      'success',
      'tiny',
    ]);
    expect(withNulls).toEqual([
      'success',
      'tiny',
    ]);
    expect(empty).toEqual([]);
  });

  it('normalizes states properly', () => {
    const active = Service.normalizeStates([
      'active',
    ]);
    const activeChecked = Service.normalizeStates([
      'active',
      'checked',
    ]);
    const activeCheckedDisabled = Service.normalizeStates([
      'active',
      'checked',
      'disabled',
    ]);
    const withDuplicates = Service.normalizeStates([
      'active',
      'checked',
      'active',
    ]);
    const withNulls = Service.normalizeStates([
      'active',
      undefined,
      'checked',
      null,
    ]);
    const empty = Service.normalizeStates([
      '',
    ]);
    const customSeparator = Service.normalizeStates([
      'active',
      'checked',
    ], '-');

    expect(active).toEqual([
      'active',
    ]);
    expect(activeChecked).toEqual([
      'active',
      'checked',
      'active.checked',
    ]);
    expect(activeCheckedDisabled).toEqual([
      'active',
      'checked',
      'active.checked',
      'disabled',
      'active.checked.disabled',
    ]);
    expect(withDuplicates).toEqual([
      'active',
      'checked',
      'active.checked',
    ]);
    expect(withNulls).toEqual([
      'active',
      'checked',
      'active.checked',
    ]);
    expect(empty).toEqual([]);
    expect(customSeparator).toEqual([
      'active',
      'checked',
      'active-checked',
    ]);
  });

  it('creates styles for default appearance properly', () => {
    const style = Service.createStyle(theme, testMapping);
    const withVariant = Service.createStyle(
      theme,
      testMapping,
      APPEARANCE_DEFAULT,
      ['success'],
    );
    const withVariants = Service.createStyle(
      theme,
      testMapping,
      APPEARANCE_DEFAULT,
      ['success', 'big'],
    );
    const withState = Service.createStyle(
      theme,
      testMapping,
      APPEARANCE_DEFAULT,
      [],
      ['active'],
    );
    const withStates = Service.createStyle(
      theme,
      testMapping,
      APPEARANCE_DEFAULT,
      [],
      ['active', 'checked'],
    );
    const withVariantAndState = Service.createStyle(
      theme,
      testMapping,
      APPEARANCE_DEFAULT,
      ['success'],
      ['active'],
    );
    const withVariantAndStates = Service.createStyle(
      theme,
      testMapping,
      APPEARANCE_DEFAULT,
      ['success'],
      ['active', 'checked'],
    );
    const withVariantsAndStates = Service.createStyle(
      theme,
      testMapping,
      APPEARANCE_DEFAULT,
      ['success', 'big'],
      ['active', 'checked'],
    );

    expect(json(style)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#9E9E9E',
      selectColor: 'transparent',
    }));
    expect(json(withVariant)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#9E9E9E',
      selectColor: 'transparent',
    }));
    expect(json(withVariants)).toEqual(json({
      size: 42,
      innerSize: 28,
      borderWidth: 2,
      borderColor: '#9E9E9E',
      selectColor: 'transparent',
    }));
    expect(json(withState)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#616161',
      selectColor: 'transparent',
    }));
    expect(json(withStates)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#1976D2',
      selectColor: '#2196F3',
    }));
    expect(json(withVariantAndState)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#616161',
      selectColor: 'transparent',
    }));
    expect(json(withVariantAndStates)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#00796B',
      selectColor: '#009688',
    }));
    expect(json(withVariantsAndStates)).toEqual(json({
      size: 42,
      innerSize: 28,
      borderWidth: 2,
      borderColor: '#00796B',
      selectColor: '#009688',
    }));
  });

  it('creates styles for custom appearance properly', () => {
    const style = Service.createStyle(theme, testMapping, 'custom');
    const withVariant = Service.createStyle(
      theme,
      testMapping,
      'custom',
      ['success'],
    );
    const withVariants = Service.createStyle(
      theme,
      testMapping,
      'custom',
      ['success', 'big'],
    );
    const withState = Service.createStyle(
      theme,
      testMapping,
      'custom',
      [],
      ['active'],
    );
    const withStates = Service.createStyle(
      theme,
      testMapping,
      'custom',
      [],
      ['active', 'checked'],
    );
    const withVariantAndState = Service.createStyle(
      theme,
      testMapping,
      'custom',
      ['success'],
      ['active'],
    );
    const withVariantAndStates = Service.createStyle(
      theme,
      testMapping,
      'custom',
      ['success'],
      ['active', 'checked'],
    );
    const withVariantsAndStates = Service.createStyle(
      theme,
      testMapping,
      'custom',
      ['success', 'big'],
      ['active', 'checked'],
    );

    expect(json(style)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 4,
      borderColor: '#9E9E9E',
      selectColor: 'transparent',
    }));
    expect(json(withVariant)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 4,
      borderColor: '#9E9E9E',
      selectColor: 'transparent',
    }));
    expect(json(withVariants)).toEqual(json({
      size: 42,
      innerSize: 28,
      borderWidth: 4,
      borderColor: '#9E9E9E',
      selectColor: 'transparent',
    }));
    expect(json(withState)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 4,
      borderColor: '#616161',
      selectColor: 'transparent',
    }));
    expect(json(withStates)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 4,
      borderColor: '#1976D2',
      selectColor: '#2196F3',
    }));
    expect(json(withVariantAndState)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 4,
      borderColor: '#616161',
      selectColor: 'transparent',
    }));
    expect(json(withVariantAndStates)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 4,
      borderColor: '#00796B',
      selectColor: '#009688',
    }));
    expect(json(withVariantsAndStates)).toEqual(json({
      size: 42,
      innerSize: 28,
      borderWidth: 4,
      borderColor: '#00796B',
      selectColor: '#009688',
    }));
  });

  it('creates styles for undefined appearance properly', () => {
    const style = Service.createStyle(theme, testMapping, 'undefined');
    const withVariant = Service.createStyle(
      theme,
      testMapping,
      'undefined',
      ['success'],
    );
    const withVariants = Service.createStyle(
      theme,
      testMapping,
      'undefined',
      ['success', 'big'],
    );
    const withState = Service.createStyle(
      theme,
      testMapping,
      'undefined',
      [],
      ['active'],
    );
    const withStates = Service.createStyle(
      theme,
      testMapping,
      'undefined',
      [],
      ['active', 'checked'],
    );
    const withVariantAndState = Service.createStyle(
      theme,
      testMapping,
      'undefined',
      ['success'],
      ['active'],
    );
    const withVariantAndStates = Service.createStyle(
      theme,
      testMapping,
      'undefined',
      ['success'],
      ['active', 'checked'],
    );
    const withVariantsAndStates = Service.createStyle(
      theme,
      testMapping,
      'undefined',
      ['success', 'big'],
      ['active', 'checked'],
    );

    expect(json(style)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#9E9E9E',
      selectColor: 'transparent',
    }));
    expect(json(withVariant)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#9E9E9E',
      selectColor: 'transparent',
    }));
    expect(json(withVariants)).toEqual(json({
      size: 42,
      innerSize: 28,
      borderWidth: 2,
      borderColor: '#9E9E9E',
      selectColor: 'transparent',
    }));
    expect(json(withState)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#616161',
      selectColor: 'transparent',
    }));
    expect(json(withStates)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#1976D2',
      selectColor: '#2196F3',
    }));
    expect(json(withVariantAndState)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#616161',
      selectColor: 'transparent',
    }));
    expect(json(withVariantAndStates)).toEqual(json({
      size: 36,
      innerSize: 24,
      borderWidth: 2,
      borderColor: '#00796B',
      selectColor: '#009688',
    }));
    expect(json(withVariantsAndStates)).toEqual(json({
      size: 42,
      innerSize: 28,
      borderWidth: 2,
      borderColor: '#00796B',
      selectColor: '#009688',
    }));
  });

});
