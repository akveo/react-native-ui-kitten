import { StyleType } from '@rk-kit/theme';

export type ConfigType = any;

type ComponentCacheType = Map<string, StyleType>;

const SEPARATOR_STYLE_KEY = '.';

export class StyleCacheService {

  private cache = new Map<string, ComponentCacheType>();

  constructor(config: ConfigType) {
    Object.keys(config).forEach(component => {
      const componentCache = config[component];
      this.cache.set(component, new Map(Object.entries(componentCache)));
    });
  }

  public getStyle(component: string, appearance: string, variants: string[], states: string[]): StyleType | undefined {
    const componentCache = this.cache.get(component);
    if (componentCache) {
      const styleKey = this.normalizeCacheKey(appearance, variants, states);
      return componentCache.get(styleKey);
    }
    return undefined;
  }

  private normalizeCacheKey(appearance: string, variants: string[], states: string[]): string {
    return [
      appearance,
      ...variants,
      ...states,
    ].join(SEPARATOR_STYLE_KEY);
  }
}
