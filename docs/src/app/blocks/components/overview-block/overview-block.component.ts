/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'ngd-overview-block',
  template: `
    <nb-card [ngdFragment]="source.slag">
      <nb-card-body>
        <ng-container class="description">
          <ng-container>
            <div [innerHTML]="description"
                 [ngStyle]="hasImage && {'margin-bottom': '16px'}"></div>
            <ngd-stacked-example-block
              *ngFor="let example of source.overviewExamples"
              [content]="example"
              class="widget-block">
            </ngd-stacked-example-block>
          </ng-container>
        </ng-container>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdOverviewBlockComponent {

  source: any;
  images: string[];
  description: string;
  hasImage: boolean;

  @Input('source')
  set setSource(source: any) {
    this.source = this.prepareDescription(source);
    this.hasImage = this.source.images.length && this.source.images.length !== 0;
  }

  private prepareDescription(source): any {
    this.description = source.description;
    this.images = source.images.map((image: string) => `assets/images/overview/${image}`);
    return source;
  }
}
