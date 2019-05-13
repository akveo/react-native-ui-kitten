/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Injectable } from '@angular/core';
import { NgdStructureService } from './structure.service';
import { NgdTextService } from './text.service';
import { NgdMenuService } from './menu.service';

/**
 * Pagination Item options
 */
class NgdPaginationItem {
  title: string;
  slag: string;
  link?: string;
  prev?: {
    title: string;
    link: string;
  };
  next?: {
    title: string;
    link: string;
  };
  parent: NgdPaginationItem;
}

@Injectable()
export class NgdPaginationService {

  protected paginationItems;

  constructor(private structureService: NgdStructureService,
              private textService: NgdTextService,
              private menuService: NgdMenuService) {
  }

  setPaginationItems(basePath: string) {
    this.paginationItems = this.addPrevNextPointers(
      this.prepareItems(
        this.structureService.getPreparedStructure(),
        { link: basePath })
    );
  }

  protected prepareItems(structure, parent = null): NgdPaginationItem[] {
    return structure
        .filter(item => item.name)
        .reduce((result, item: any) => {
          const paginationItem: NgdPaginationItem = {
            title: item.name,
            parent: parent,
            slag: item.slag,
          };
          paginationItem.link = this.menuService.createItemLink<NgdPaginationItem>(paginationItem);

          if (item.name && item.type === 'page' || item.type === 'tabs') {
            result.push(paginationItem);
          }

          if (item.children) {
            return result.concat(this.prepareItems(item.children, paginationItem));
          }

          return result;
      }, [] as NgdPaginationItem[]);
  }

  protected addPrevNextPointers(items): NgdPaginationItem[] {
    return items
      .map((paginationItem, index, paginationItems) => {
        const prev = paginationItems[index - 1];
        const next = paginationItems[index + 1];

        if (prev) {
          paginationItem.prev = {
            link: prev.link,
            title: prev.title,
          };
        }

        if (next) {
          paginationItem.next = {
            link: next.link,
            title: next.title,
          };
        }

        return paginationItem;
      });
  }

  getPaginationItem(slag: string): NgdPaginationItem {
    return this.paginationItems.find(item => item.slag === slag);
  }
}
