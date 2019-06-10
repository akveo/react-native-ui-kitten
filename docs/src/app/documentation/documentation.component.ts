/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  takeWhile,
  withLatestFrom,
  map,
} from 'rxjs/operators';
import {
  NbThemeService,
  NbMenuItem,
  NbSidebarService,
  NbMenuService,
} from '@nebular/theme';
import { NgdMenuService } from '../@theme/services/menu.service';
import { NgdPaginationService } from '../@theme/services';
import { NbMediaBreakpoint } from '@nebular/theme';

@Component({
  selector: 'ngd-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
})
export class NgdDocumentationComponent implements OnDestroy {
  menuItems: NbMenuItem[] = [];
  collapsedBreakpoints = ['xs', 'is', 'sm', 'md', 'lg'];
  sidebarTag = 'menuSidebar';

  private alive = true;

  constructor(
    private service: NgdMenuService,
    private router: Router,
    private themeService: NbThemeService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private paginationService: NgdPaginationService) {

    this.themeService.changeTheme('docs-page');
    this.paginationService.setPaginationItems();
    this.menuItems = this.service.getPreparedMenu();

    // TODO: can we do any better?
    this.router.events
      .pipe(
        withLatestFrom(this.themeService.onMediaQueryChange().pipe(map((changes: any[]) => changes[1]))),
        takeWhile(() => this.alive),
      )
      .subscribe(([event, mediaQuery]: [any, NbMediaBreakpoint]) => {
        if (event.url === '/') {
          const firstMenuItem = this.menuItems[0].children[0];
          // angular bug with replaceUrl, temp fix with setTimeout
          setTimeout(() => this.router.navigateByUrl(firstMenuItem.link, { replaceUrl: true }));
        }

        if (this.collapsedBreakpoints.includes(mediaQuery.name)) {
          this.sidebarService.collapse(this.sidebarTag);
        }
      });
  }

  collapseMenu() {
    this.menuService.collapseAll('leftMenu');
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
