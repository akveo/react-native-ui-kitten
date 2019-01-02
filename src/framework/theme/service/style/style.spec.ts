import { APPEARANCE_DEFAULT } from '../mapping';
import {
  mapping,
  theme,
} from './style.spec.config';
import * as Service from './style.service';

describe('@style: service methods checks', () => {

  const { Test: testMapping } = mapping;

  describe('* preprocess', () => {

    it('* normalizes appearance properly', () => {
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

    it('* normalizes variants properly', () => {
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

    it('* normalizes states properly', () => {
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

  });

  describe('* styling', () => {

    describe('* default appearance', () => {

      it('* no variant and no state', () => {
        const style = Service.createStyle(theme, testMapping);
        expect(style).toMatchSnapshot();
      });

      describe('* with state', () => {

        it('* single', () => {
          const style = Service.createStyle(
            theme,
            testMapping,
            APPEARANCE_DEFAULT,
            [],
            ['active'],
          );

          expect(style).toMatchSnapshot();
        });

        it('* multiple', () => {
          const style = Service.createStyle(
            theme,
            testMapping,
            APPEARANCE_DEFAULT,
            [],
            ['active', 'checked'],
          );

          expect(style).toMatchSnapshot();
        });
      });

      describe('* with variant', () => {

        describe('* single', () => {

          it('* no state', () => {
            const style = Service.createStyle(
              theme,
              testMapping,
              APPEARANCE_DEFAULT,
              ['success'],
            );

            expect(style).toMatchSnapshot();
          });

          describe('* with state', () => {

            it('* single implicit (should apply from appearance)', () => {
              const style = Service.createStyle(
                theme,
                testMapping,
                APPEARANCE_DEFAULT,
                ['success'],
                ['active'],
              );

              expect(style).toMatchSnapshot();
            });

            it('* single explicit (should apply own)', () => {
              const style = Service.createStyle(
                theme,
                testMapping,
                APPEARANCE_DEFAULT,
                ['success'],
                ['checked'],
              );

              expect(style).toMatchSnapshot();
            });

            it('* multiple', () => {
              const style = Service.createStyle(
                theme,
                testMapping,
                APPEARANCE_DEFAULT,
                ['success'],
                ['active', 'checked'],
              );

              expect(style).toMatchSnapshot();
            });

          });

        });

        describe('* multiple', () => {

          it('* no state', () => {
            const style = Service.createStyle(
              theme,
              testMapping,
              APPEARANCE_DEFAULT,
              ['success', 'big'],
            );

            expect(style).toMatchSnapshot();
          });

          describe('* with state', () => {

            it('* single', () => {
              const style = Service.createStyle(
                theme,
                testMapping,
                APPEARANCE_DEFAULT,
                ['success', 'big'],
                ['active'],
              );

              expect(style).toMatchSnapshot();
            });

            it('* multiple', () => {
              const style = Service.createStyle(
                theme,
                testMapping,
                APPEARANCE_DEFAULT,
                ['success', 'big'],
                ['active', 'checked'],
              );

              expect(style).toMatchSnapshot();
            });

          });

        });

      });

    });

    describe('* custom appearance', () => {

      it('* no variant and no state', () => {
        const style = Service.createStyle(theme, testMapping, 'custom');

        expect(style).toMatchSnapshot();
      });

      describe('* with state', () => {

        it('* implicit (should apply from default appearance)', () => {
          const style = Service.createStyle(
            theme,
            testMapping,
            'custom',
            [],
            ['checked'],
          );

          expect(style).toMatchSnapshot();
        });

        it('* explicit (should apply own)', () => {
          const style = Service.createStyle(
            theme,
            testMapping,
            'custom',
            [],
            ['active'],
          );

          expect(style).toMatchSnapshot();
        });

      });

      describe('* with variant', () => {

        it('* implicit (should apply from default appearance)', () => {
          const style = Service.createStyle(
            theme,
            testMapping,
            'custom',
            ['big'],
          );

          expect(style).toMatchSnapshot();
        });

        it('* explicit (should apply own)', () => {
          const style = Service.createStyle(
            theme,
            testMapping,
            'custom',
            ['success'],
          );

          expect(style).toMatchSnapshot();
        });

      });

    });

    describe('* undefined appearance', () => {

      it('* no variant and no state (should apply default appearance)', () => {
        const style = Service.createStyle(theme, testMapping, 'undefined');

        expect(style).toMatchSnapshot();
      });

    });

  });

});
