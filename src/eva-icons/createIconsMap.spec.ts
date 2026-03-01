import { createIconsMap, clearIconCache, getIconCacheSize } from './createIconsMap';

// Mock the dependencies
jest.mock('react-native-eva-icons/icons', () => ({
  findIconByName: jest.fn((name: string) => {
    // Return a mock icon component
    return () => null;
  }),
}));

jest.mock('@ui-kitten/components', () => ({
  IconProvider: class {},
}));

jest.mock('react-native-svg', () => ({
  SvgProps: {},
}));

describe('createIconsMap', () => {
  beforeEach(() => {
    clearIconCache();
  });

  describe('icon caching', () => {
    it('should return the same icon instance for repeated accesses', () => {
      const iconsMap = createIconsMap();

      const icon1 = iconsMap['home'];
      const icon2 = iconsMap['home'];

      expect(icon1).toBe(icon2);
    });

    it('should return different instances for different icons', () => {
      const iconsMap = createIconsMap();

      const homeIcon = iconsMap['home'];
      const settingsIcon = iconsMap['settings'];

      expect(homeIcon).not.toBe(settingsIcon);
    });

    it('should increment cache size when new icons are accessed', () => {
      const iconsMap = createIconsMap();

      expect(getIconCacheSize()).toBe(0);

      iconsMap['home'];
      expect(getIconCacheSize()).toBe(1);

      iconsMap['settings'];
      expect(getIconCacheSize()).toBe(2);

      // Accessing same icon shouldn't increase cache size
      iconsMap['home'];
      expect(getIconCacheSize()).toBe(2);
    });

    it('should clear the cache when clearIconCache is called', () => {
      const iconsMap = createIconsMap();

      iconsMap['home'];
      iconsMap['settings'];
      expect(getIconCacheSize()).toBe(2);

      clearIconCache();
      expect(getIconCacheSize()).toBe(0);
    });

    it('should create new instances after cache is cleared', () => {
      const iconsMap = createIconsMap();

      const icon1 = iconsMap['home'];
      clearIconCache();
      const icon2 = iconsMap['home'];

      // After clearing, a new instance should be created
      expect(icon1).not.toBe(icon2);
    });
  });

  describe('proxy behavior', () => {
    it('should work as a proxy object', () => {
      const iconsMap = createIconsMap();

      expect(typeof iconsMap).toBe('object');
      expect(iconsMap['anyIcon']).toBeDefined();
    });
  });
});
