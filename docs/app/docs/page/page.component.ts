/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnDestroy, Renderer2 } from '@angular/core';

import { NgaMenuService } from '@akveo/nga-theme';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'ngd-page',
  styleUrls: ['page.component.scss'],
  template: `
    <nga-card>
      <nga-card-header>{{ currentItem?.name }}</nga-card-header>
      <nga-card-body>
        <ng-container *ngFor="let item of currentItem?.children">
          <ng-container [ngSwitch]="item.block">
            
            <react-markdown-block *ngSwitchCase="'markdown'" [block]="item"></react-markdown-block>
            <react-description-block *ngSwitchCase="'rk-description'" [klass]="item.klass"></react-description-block>
            <react-properties-block *ngSwitchCase="'rk-properties'" [klass]="item.klass"></react-properties-block>
            <react-examples-block *ngSwitchCase="'rk-examples'" [klass]="item.klass"></react-examples-block>
            <react-props-block *ngSwitchCase="'rk-props'" [klass]="item.klass"></react-props-block>
            <react-methods-block *ngSwitchCase="'rk-methods'" [klass]="item.klass"></react-methods-block>            
            <react-styles-block *ngSwitchCase="'rk-styles'" [klass]="item.klass"></react-styles-block>            
            
          </ng-container>
        </ng-container>
       </nga-card-body>
     </nga-card>
  `,
})
export class NgdPageComponent implements OnDestroy {

  currentItem: any;
  private routerSubscription: Subscription;

  constructor(private menuService: NgaMenuService,
              private router: Router,
              private renderer: Renderer2) {

    this.routerSubscription = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event) => {

        this.menuService.getSelectedItem().subscribe((event: {tag: string, item: any}) => {
          if (event && event.item && event.item.data) {
            this.currentItem = event.item.data;

            this.renderer.setProperty(document.body, 'scrollTop', 0);
          }
        });

      });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }
}
