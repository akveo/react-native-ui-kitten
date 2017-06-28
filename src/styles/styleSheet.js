import _ from 'lodash';
import {RkTheme} from './themeManager';

let objects = [];
let patternStyles = [];
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
 * let styles = RkStyleSheer.create(theme => ({
 *     root: {
 *       backgroundColor: theme.colors.screen.base
 *     }
 *   })
 * );
 * ```
 *
 */
class ThemedStyleSheet {

  _getStyle(style) {
    if (typeof style === 'function') {
      return style(RkTheme.current);
    }
    return style;
  }

  _invalidate() {
    patternStyles.forEach((patternObj) => {
      let styles = this._getStyle(patternObj.style);
      for (let key in styles) {
        let {id} = _.find(patternObj.computedIds, (o) => {
          return o.key === key
        });
        objects[id] = styles[key];
      }
    })
  }

  _wrapToObject(computedIds) {
    let obj = {};

    computedIds.forEach((item) => {
      Object.defineProperty(obj, item.key, {
        get: () => objects[item.id]
      })
    });
    return obj;
  }

  /**
   * Creates a `RkStyleSheet` style object from the given object or function.
   * @param {object | function} style - Object with styles or function which returns themed styles object.
   * @returns {object} styles
   */
  create(style) {
    let styles = this._getStyle(style);
    let computedIds = [];

    for (let key in styles) {
      id++;
      objects[id] = styles[key];
      computedIds.push({key, id});
    }
    patternStyles.push({style, computedIds});
    return this._wrapToObject(computedIds);
  }
}

export let RkStyleSheet = new ThemedStyleSheet();