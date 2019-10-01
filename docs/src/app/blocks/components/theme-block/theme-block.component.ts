/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeWhile, skip, distinctUntilChanged, debounceTime } from 'rxjs/operators';


@Component({
  selector: 'ngd-theme-block',
  styleUrls: ['./theme-block.component.scss'],
  templateUrl: './theme-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdThemeComponent implements OnInit, OnDestroy {
  searchControl = new FormControl();

  private alive: boolean = true;

  properties = [];
  filtered = [];
  themeName = '';
  parentThemeName = '';


  @Input('block')
  set _block(block: any) {
    this.themeName = block.source.name;
    this.parentThemeName = block.source.parent;

    this.filtered = this.properties = Object.entries(block.source.data)
      .map(([key, data]: [string, any]) => {
        const propertyValue = data.value;
        return {
          name: key,
          value: Array.isArray(propertyValue) ? propertyValue.join(' ') : propertyValue,
          parents: data.parents,
        };
    });
  }

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(skip(1), distinctUntilChanged(), debounceTime(300), takeWhile(() => this.alive))
      .subscribe((value: string) => {
        this.filtered = this.properties
          .filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));
        this.cd.detectChanges();
      });
  }

  trackByFn(index, item) {
    return item.name;
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
