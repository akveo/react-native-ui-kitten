import _ from 'lodash';
import { RkTheme } from './themeManager';

const objects = [];
const patternStyles = [];
let id = 0;

/**
 * `RkStyleSheet` - replace for regular `StyleSheet`.
 *
 * Can be helpful if there is need to use dynamic theme values in standard components.
 *
 * @example Usage sample
 *
 * `RkStyleSheet` usually used when some style values should change depending on current theme.
 * This is important for application that change theme on the fly.
 *
 * Here is example of how to bind root View's `backgroundColor` property to current theme:
 *
 * ```
 * <View style={styles.root}>
 *   //...
 * </View>
 *
 * let styles = RkStyleSheet.create(theme => ({
 *     root: {
 *       backgroundColor: theme.colors.screen.base
 *     }
 *   })
 * );
 * ```
 *
 */
class ThemedStyleSheet {
  getStyle(style) {
    if (typeof style === 'function') {
      return style(RkTheme.current);
    }
    return style;
  }

  invalidate() {
    patternStyles.forEach((patternObj) => {
      const styles = this.getStyle(patternObj.style);
      Object.keys(styles).forEach(key => {
        const { id: styleId } = _.find(patternObj.computedIds, (o) => o.key === key);
        objects[styleId] = styles[key];
      });
    });
  }

  wrapToObject(computedIds) {
    const obj = {};

    computedIds.forEach((item) => {
      Object.defineProperty(obj, item.key, {
        get: () => objects[item.id],
      });
    });
    return obj;
  }

  /**
   * Creates a `RkStyleSheet` style object from the given object or function.
   * @param {object | function} style - Object with styles or function,
   * which returns themed styles object.
   * @returns {object} styles
   */
  create(style) {
    const styles = this.getStyle(style);
    const computedIds = [];
    Object.keys(styles).forEach(key => {
      id += 1;
      objects[id] = styles[key];
      computedIds.push({ key, id });
    });
    patternStyles.push({ style, computedIds });
    return this.wrapToObject(computedIds);
  }
}

export const RkStyleSheet = new ThemedStyleSheet();
