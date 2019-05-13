/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input, OnDestroy, HostBinding } from '@angular/core';
import { takeWhile, map, publishReplay, refCount } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Observable, of as observableOf, combineLatest } from 'rxjs';

@Component({
  selector: 'ngd-page-tabs',
  styleUrls: ['./page-tabs.component.scss'],
  template: `
    <a *ngFor="let item of items$ | async" [class.selected]="item.selected" [routerLink]="['../', item.tab]">
      <div class="text-container">
        <nb-icon [icon]="item.icon"></nb-icon>
        <span class="title">{{ item.title }}</span>
      </div>
      <i class="line"></i>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdPageTabsComponent implements OnDestroy {

  items$: Observable<any[]> = observableOf([]);

  @Input()
  set tabs(value) {
    this.items$ = combineLatest(
      observableOf(value || []).pipe(
        map(tabs => this.availableTabs.filter(tab => tabs[tab.tab])),
      ),
      this.activatedRoute.params.pipe(publishReplay(), refCount()),
    )
    .pipe(
      takeWhile(() => this.alive),
      map(([tabs, params]) => (tabs.map((item: any) => ({ ...item, selected: item.tab === params.tab })))),
    );
  }

  @HostBinding('class.horizontal')
  isHorizontal = false;
  @Input()
  set horizontal(value) {
    this.isHorizontal = value !== 'false' && value !== false;
  }

  private availableTabs: {
    tab: string;
    title: string;
    icon: string;
    selected?: boolean;
  }[] = [
      {
        tab: 'overview',
        title: 'Overview',
        icon: 'eye-outline',
        selected: true,
      },
      {
        tab: 'api',
        title: 'API',
        icon: 'settings-outline',
      },
      {
        tab: 'theme',
        title: 'Theme',
        icon: 'droplet-outline',
      },
      {
        tab: 'examples',
        title: 'Examples',
        icon: 'image-outline',
      },
    ];
  private alive = true;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
