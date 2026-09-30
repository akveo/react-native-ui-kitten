import { resolvePlatformFontFamily } from './platformFontFamily';

describe('@platform-font-family: resolvePlatformFontFamily', () => {

  it('should drop the System family on Android for font family keys', () => {
    expect(resolvePlatformFontFamily('fontFamily', 'System', 'android')).toBeUndefined();
    expect(resolvePlatformFontFamily('textFontFamily', 'System', 'android')).toBeUndefined();
    expect(resolvePlatformFontFamily('titleFontfamily', 'System', 'android')).toBeUndefined();
  });

  it('should keep the System family on iOS and web', () => {
    expect(resolvePlatformFontFamily('fontFamily', 'System', 'ios')).toEqual('System');
    expect(resolvePlatformFontFamily('textFontFamily', 'System', 'web')).toEqual('System');
  });

  it('should keep a custom family on Android', () => {
    expect(resolvePlatformFontFamily('fontFamily', 'Roboto-Medium', 'android')).toEqual('Roboto-Medium');
  });

  it('should keep System under a key that is not a font family', () => {
    expect(resolvePlatformFontFamily('accessibilityLabel', 'System', 'android')).toEqual('System');
    expect(resolvePlatformFontFamily('fontWeight', 'System', 'android')).toEqual('System');
  });

  it('should keep non-string values', () => {
    expect(resolvePlatformFontFamily('fontFamily', undefined, 'android')).toBeUndefined();
    expect(resolvePlatformFontFamily('fontFamily', 16, 'android')).toEqual(16);
  });
});
