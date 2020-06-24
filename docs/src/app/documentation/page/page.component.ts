/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Inject, NgZone, OnDestroy, OnInit, ViewChild, AfterContentChecked } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, publishReplay, refCount, tap, takeWhile } from 'rxjs/operators';
import { NB_WINDOW } from '@nebular/theme';
import { NgdTabbedBlockComponent } from '../../blocks/components/tabbed-block/tabbed-block.component';
import { NgdStructureService } from '../../@theme/services';

@Component({
  selector: 'ngd-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class NgdPageComponent implements OnInit, AfterContentChecked, OnDestroy {

  currentItem;
  private alive = true;

  currentTabName: string = '';

  @ViewChild(NgdTabbedBlockComponent, { static: false }) tabbedBlock: NgdTabbedBlockComponent;

  constructor(@Inject(NB_WINDOW) private window,
              private ngZone: NgZone,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private structureService: NgdStructureService,
              private titleService: Title,
              private metaTagsService: Meta) {
  }

  get showSettings() {
    return this.currentItem && this.currentItem.children
      .some((item) => ['markdown', 'component', 'tabbed'].includes(item.block));
  }

  ngOnInit() {
    this.handlePageNavigation();
    this.window.history.scrollRestoration = 'manual';
  }

  ngAfterContentChecked() {
    const currentTabName = this.getCurrentTabName();
    if (this.currentTabName !== currentTabName) {
      Promise.resolve().then(() => this.currentTabName = currentTabName);
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  handlePageNavigation() {
    this.activatedRoute.params
      .pipe(
        takeWhile(() => this.alive),
        filter((params: any) => params.subPage),
        map((params: any) => {
          const slag = `${params.page}_${params.subPage}`;
          return this.structureService.findPageBySlag(this.structureService.getPreparedStructure(), slag);
        }),
        filter(item => item),
        tap((item: any) => {
          this.titleService.setTitle(`UI Kitten - ${item.title}`);
          this.metaTagsService.updateTag({ name: 'description', content: item.description });
          this.metaTagsService.updateTag({ name: 'keywords', content: item.keywords })
        }),
        publishReplay(),
        refCount(),
      )
      .subscribe((item) => {
        this.currentItem = item;
      });
  }

  protected getCurrentTabName(): string {
    if (this.tabbedBlock && this.tabbedBlock.currentTab) {
      return this.tabbedBlock.currentTab.tab;
    }

    return '';
  }
}
