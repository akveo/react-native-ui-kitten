import React from 'react';
import { render } from '@testing-library/react-native';
import { EvaIconStyle } from './evaIcon.component';
import {
  EvaIconsPack,
  EvaIconProvider,
  clearIconCache,
  createEvaIconsPack,
  getIconCacheSize,
} from './evaIconsPack';
import home from './icons/home';
import star from './icons/star';

interface HostNode {
  type: string;
  props: Record<string, unknown>;
}

describe('EvaIconsPack', () => {

  beforeEach(() => {
    clearIconCache();
  });

  it('is registered under the eva name', () => {
    expect(EvaIconsPack.name).toBe('eva');
  });

  it('resolves every Eva icon by name', () => {
    expect(EvaIconsPack.icons.star).toBeInstanceOf(EvaIconProvider);
    expect(EvaIconsPack.icons['arrow-back-outline']).toBeInstanceOf(EvaIconProvider);
    expect(Object.keys(EvaIconsPack.icons)).toHaveLength(490);
    expect('star' in EvaIconsPack.icons).toBe(true);
  });

  it('resolves unknown names to undefined so IconRegistry reports them', () => {
    expect(EvaIconsPack.icons['no-such-icon']).toBeUndefined();
    expect(EvaIconsPack.icons.toString).toBeUndefined();
    expect('no-such-icon' in EvaIconsPack.icons).toBe(false);
  });

  it('creates a provider once per icon, on first lookup', () => {
    expect(getIconCacheSize()).toBe(0);

    const first = EvaIconsPack.icons.star;
    const second = EvaIconsPack.icons.star;
    EvaIconsPack.icons.home;

    expect(first).toBe(second);
    expect(getIconCacheSize()).toBe(2);
  });

  it('creates a new provider after the cache is cleared', () => {
    const before = EvaIconsPack.icons.star;
    clearIconCache();

    expect(getIconCacheSize()).toBe(0);
    expect(EvaIconsPack.icons.star).not.toBe(before);
  });

  it('renders the icon with the props IconRegistry passes', () => {
    const element = EvaIconsPack.icons.star.toReactElement({
      style: { tintColor: '#123456', width: 24, height: 24 } as EvaIconStyle,
      testID: 'star',
    });
    const tree = render(element).toJSON() as unknown as HostNode;

    expect(tree.type).toBe('RNSVGSvgView');
    expect(tree.props.fill).toBe('#123456');
    expect(tree.props.testID).toBe('star');
  });
});

describe('createEvaIconsPack', () => {

  it('contains only the given icons', () => {
    const pack = createEvaIconsPack([home, star]);

    expect(pack.name).toBe('eva');
    expect(Object.keys(pack.icons)).toEqual(['home', 'star']);
    expect(pack.icons.star).toBeInstanceOf(EvaIconProvider);
    expect(pack.icons['arrow-back-outline']).toBeUndefined();
  });

  it('accepts a custom pack name', () => {
    expect(createEvaIconsPack([star], 'eva-subset').name).toBe('eva-subset');
  });

  it('renders its icons', () => {
    const pack = createEvaIconsPack([star]);
    const tree = render(pack.icons.star.toReactElement({ fill: '#ABCDEF' })).toJSON() as unknown as HostNode;

    expect(tree.type).toBe('RNSVGSvgView');
    expect(tree.props.fill).toBe('#ABCDEF');
  });
});
