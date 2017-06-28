/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';

import { NgaMenuService } from '@akveo/nga-theme';

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
export class NgdPageComponent {

  currentItem: any;

  constructor(private menuService: NgaMenuService) {
    this.menuService.onItemSelect().subscribe((event: {tag: string, item: any}) => {
      // TODO: check the tag
      if (event && event.item && event.item.data) {
        this.currentItem = event.item.data;
      }
    });
  }
}
