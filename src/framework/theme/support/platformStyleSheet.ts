import {
  ImageStyle,
  TextStyle,
  ViewStyle,
  Platform,
  StyleSheet,
} from 'react-native';

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export class PlatformStyleSheet {

  static create<T extends NamedStyles<T> | NamedStyles<any>>(styles: T): T {
    return Platform.select({
      default: StyleSheet.create(styles),
      // web: styles,
    });
  }
}
