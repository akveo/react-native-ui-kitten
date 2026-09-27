import React from 'react';
import { IconPack, IconProvider } from '@ui-kitten/components';
import { SvgProps } from 'react-native-svg';
import { EvaIcon } from './evaIcon.component';
import { IconData } from './iconData';
import { EvaIconName, evaIcons } from './icons/all';

/**
 * Adapts icon data to the `IconProvider` contract of `IconRegistry`.
 */
export class EvaIconProvider implements IconProvider<SvgProps> {

  constructor(public readonly icon: IconData) {
  }

  public toReactElement(props: SvgProps): React.ReactElement<SvgProps> {
    return (
      <EvaIcon
        icon={this.icon}
        {...props}
      />
    );
  }
}

/**
 * Builds an icon pack from the given icons only, so that a bundle contains just those.
 *
 * @example
 * import { createEvaIconsPack } from '@ui-kitten/eva-icons';
 * import home from '@ui-kitten/eva-icons/icons/home';
 * import star from '@ui-kitten/eva-icons/icons/star';
 *
 * <IconRegistry icons={createEvaIconsPack([home, star])} />
 * <Icon name='star' />
 */
export const createEvaIconsPack = (icons: readonly IconData[], name = 'eva'): IconPack<SvgProps> => {
  const providers: Record<string, IconProvider<SvgProps>> = {};
  for (const icon of icons) {
    providers[icon.name] = new EvaIconProvider(icon);
  }
  return { name, icons: providers };
};

const hasIcon = (name: PropertyKey): name is EvaIconName => {
  return typeof name === 'string' && Object.prototype.hasOwnProperty.call(evaIcons, name);
};

const providerCache = new Map<EvaIconName, EvaIconProvider>();

const getProvider = (name: EvaIconName): EvaIconProvider => {
  let provider = providerCache.get(name);
  if (!provider) {
    provider = new EvaIconProvider(evaIcons[name]);
    providerCache.set(name, provider);
  }
  return provider;
};

/*
 * Providers for the full pack are created on first lookup rather than for all 490 icons at
 * registration. Unknown names resolve to `undefined`, which lets `IconRegistry` raise its usual
 * "icon is not registered" error instead of rendering an undefined element.
 */
const createIconsMap = (): Record<string, IconProvider<SvgProps>> => {
  return new Proxy<Record<string, IconProvider<SvgProps>>>({}, {
    get: (_target, name) => (hasIcon(name) ? getProvider(name) : undefined),
    has: (_target, name) => hasIcon(name),
    ownKeys: () => Object.keys(evaIcons),
    getOwnPropertyDescriptor: (_target, name) => {
      return hasIcon(name) ? { value: getProvider(name), enumerable: true, configurable: true } : undefined;
    },
  });
};

/**
 * Every Eva icon, for `<IconRegistry icons={EvaIconsPack} />`.
 *
 * Registering the full pack puts all 490 icons in the bundle; use `createEvaIconsPack` with
 * per-icon imports to ship only the icons an app renders.
 */
export const EvaIconsPack: IconPack<SvgProps> = {
  name: 'eva',
  icons: createIconsMap(),
};

/**
 * Drops the providers created so far for `EvaIconsPack`. Useful in tests.
 */
export const clearIconCache = (): void => {
  providerCache.clear();
};

/**
 * Number of `EvaIconsPack` icons that have been looked up so far.
 */
export const getIconCacheSize = (): number => {
  return providerCache.size;
};
