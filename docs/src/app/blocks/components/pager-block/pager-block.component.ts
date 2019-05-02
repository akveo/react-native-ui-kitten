import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

import { NgdPaginationService } from '../../../@theme/services';

@Component({
  selector: 'ngd-pager-block',
  styleUrls: ['./pager-block.component.scss'],
  template: `
    <ng-container *ngIf="paginationItem">
      <nb-card [class.invisible]="!paginationItem.prev" class="left-block">
        <a *ngIf="paginationItem.prev" [routerLink]="paginationItem.prev.link"
          [attr.title]="paginationItem.prev.title">
          <div class="page-title">
            <nb-icon icon="arrow-back-outline"></nb-icon>
            <span>{{ paginationItem.prev.title }}</span>
          </div>
          <div class="description">Previous page</div>
        </a>
      </nb-card>

      <nb-card [class.invisible]="!paginationItem.next" class="right-block">
        <a *ngIf="paginationItem.next" [routerLink]="paginationItem.next.link"
          [attr.title]="paginationItem.next.title">
          <div class="page-title">
            <span>{{ paginationItem.next.title }}</span>
            <nb-icon icon="arrow-forward-outline"></nb-icon>
          </div>
          <div class="description">Next page</div>
        </a>
      </nb-card>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdPagerBlockComponent {
  paginationItem;

  @Input('currentItemSlag')
  set setPaginationItem(currentItemSlag: string) {
    this.paginationItem = this.getPaginationItem(currentItemSlag);
  }

  constructor(private paginationService: NgdPaginationService) {
  }

  getPaginationItem(currentItemSlag) {
    return this.paginationService.getPaginationItem(currentItemSlag);
  }
}
