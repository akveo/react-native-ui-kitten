/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, ElementRef, Input, Renderer2, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile, skip, distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { ThemeBlockModel } from './theme-block.model';
import { ThemeBlockViewModel } from './theme-block.viewmodel';

@Component({
  selector: 'ngd-theme-block',
  styleUrls: ['./theme-block.component.scss'],
  templateUrl: './theme-block.component.html',
  providers: [ThemeBlockModel, ThemeBlockViewModel],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdThemeComponent implements OnInit, OnDestroy {
  searchControl = new FormControl();

  private alive: boolean = true;

  @Input('block')
  set setBlock(block: any) {
    this.vm.themeTitle = block.name;
    this.vm.themeName = block.source.name;
    this.vm.parentTheme = block.source.parent;
    this.vm.themeProperties = block.source.data;
  }

  constructor(public vm: ThemeBlockViewModel) {}

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(skip(1), distinctUntilChanged(), debounceTime(300), takeWhile(() => this.alive))
      .subscribe(value => this.vm.changeSearch(value));
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
