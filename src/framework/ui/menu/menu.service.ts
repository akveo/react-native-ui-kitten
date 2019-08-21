/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { MenuItemType } from './menuItem.component';

export class MenuService {

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
