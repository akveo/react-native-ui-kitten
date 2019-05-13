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
            <div [innerHTML]="source.description"></div>
          </ng-container>
        </ng-container>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdOverviewBlockComponent {

  source: any;

  @Input('source')
  set setSource(source: any) {
    this.source = this.prepareDescription(source);
  }

  private prepareDescription(source: any): any {
    const description: string = source.description;
    source.description = description
      .replace(/./g, (character: string, index: number) => {
        if (index === description.indexOf('`')) {
          return '<code>';
        } else if (index === description.lastIndexOf('`')) {
          return '</code>';
        } else {
          return character;

        }
      });
    return source;
  }
}
