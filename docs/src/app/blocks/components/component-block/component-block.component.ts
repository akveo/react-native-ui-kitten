import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgdTabbedService } from '../../../@theme/services';

@Component({
  selector: 'ngd-component-block',
  template: `
    <nb-card [ngdFragment]="source.slag">
      <nb-card-body>
        <ng-container class="description" *ngFor="let node of overview">
          <ng-container *ngIf="node.type === 'text'">
            <div *ngFor="let section of node.content" [innerHtml]="section.html"></div>
          </ng-container>
          <ngd-live-example-block *ngIf="node.type === 'live-example'" [id]="node.content" [title]="'example'"
                                  class="widget-block">
          </ngd-live-example-block>
          <ngd-inline-example-block *ngIf="node.type === 'inline-example'" [content]="node.content"
                                    class="widget-block">
          </ngd-inline-example-block>
          <ngd-stacked-example-block *ngIf="node.type === 'example'" [content]="node.content"
                                     class="widget-block">
          </ngd-stacked-example-block>
        </ng-container>
        <ngd-props-block [source]="source" *ngIf="hasProps(source)"></ngd-props-block>
        <ngd-methods-block [source]="source" *ngIf="hasMethods(source)"></ngd-methods-block>
        <ng-container *ngIf="hasTheme(source)">
          <h3>Theme</h3>
          <ngd-styles-table-block [source]="source"></ngd-styles-table-block>
        </ng-container>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdComponentBlockComponent {

  source: any;
  overview: any[] = [];

  @Input('source')
  set setSource(source: any) {
    this.source = source;
    this.overview = source.overview;
  }

  constructor(private tabbedService: NgdTabbedService) {
  }

  hasTheme(component) {
    return this.tabbedService.componentHasTheme(component);
  }

  hasMethods(component) {
    return this.tabbedService.componentHasMethods(component);
  }

  hasProps(component) {
    return this.tabbedService.componentHasProps(component);
  }
}
