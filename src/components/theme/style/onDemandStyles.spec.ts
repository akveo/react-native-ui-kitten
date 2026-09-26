import { SchemaProcessor, SchemaType, ThemeStyleType } from '@ui-kitten/processor';
import * as eva from '@ui-kitten/eva';
import * as material from '@ui-kitten/material';
import { createOnDemandStyles, OnDemandControlStyles } from './onDemandStyles';

const SEPARATOR = '.';

function parseKey(meta: OnDemandControlStyles['meta'], key: string): { appearance: string; variants: string[]; states: string[] } {
  const [appearance, ...rest] = key.split(SEPARATOR);
  const variants = rest.filter((part) => Object.keys(meta.variantGroups).some((group) => meta.variantGroups[group][part] !== undefined));
  const states = rest.filter((part) => meta.states[part] !== undefined);
  return { appearance, variants, states };
}

describe.each([
  ['eva', eva.mapping as SchemaType],
  ['material', material.mapping as SchemaType],
])('createOnDemandStyles (%s)', (_name, mapping) => {
  const eager: ThemeStyleType = new SchemaProcessor().process(mapping);
  const onDemand = createOnDemandStyles(mapping) as unknown as Record<string, OnDemandControlStyles>;

  it('resolves every eagerly generated key to an identical style', () => {
    let checked = 0;
    Object.keys(eager).forEach((component) => {
      const entry = onDemand[component];
      expect(entry.meta).toBe(mapping.components[component].meta);
      Object.keys(eager[component].styles).forEach((key) => {
        const query = parseKey(entry.meta, key);
        // Shuffle order: the resolver must sort by mapping order itself.
        const resolved = entry.resolve({ appearance: query.appearance, variants: [...query.variants].reverse(), states: [...query.states].reverse() });
        expect(resolved).toEqual(eager[component].styles[key]);
        checked++;
      });
    });
    expect(checked).toBeGreaterThan(1000);
  });

  it('rejects combinations the eager processor never generated', () => {
    const button = onDemand.Button;
    expect(button.resolve({ appearance: 'nope', variants: ['primary', 'medium'], states: [] })).toBeUndefined();
    expect(button.resolve({ appearance: 'filled', variants: ['primary'], states: [] })).toBeUndefined();
    expect(button.resolve({ appearance: 'filled', variants: ['primary', 'success'], states: [] })).toBeUndefined();
    expect(button.resolve({ appearance: 'filled', variants: ['primary', 'medium'], states: ['sleeping'] })).toBeUndefined();
  });

  it('memoizes resolved entries and exposes them under the eager key', () => {
    const button = onDemand.Button;
    const first = button.resolve({ appearance: 'filled', variants: ['medium', 'primary'], states: ['active'] });
    const second = button.resolve({ appearance: 'filled', variants: ['primary', 'medium'], states: ['active'] });
    expect(second).toBe(first);
    expect(button.styles['filled.primary.medium.active']).toBe(first);
  });
});
