/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { MenuItemType } from './menuItem.component';

/**
 * Support service for the menu component. Can be expanded.
 */

export class MenuService {

  /**
   * Makes custom indexes for the MenuItems array for proper handling group items.
   *
   * @param {ReadonlyArray<MenuItemType>} data
   * @returns {MenuItemType[]} pack by name
   */
  public setIndexes(data: ReadonlyArray<MenuItemType>): MenuItemType[] {
    let tempIndex: number = 0;
    return data.map((item: MenuItemType) => {
      if (!item.subItems || item.subItems.length === 0) {
        item.menuIndex = tempIndex;
        tempIndex = tempIndex + 1;
      } else {
        item.subItems = item.subItems.map((sub: MenuItemType) => {
          sub.menuIndex = tempIndex;
          tempIndex = tempIndex + 1;
          return sub;
        });
      }
      return item;
    });
  }
}
