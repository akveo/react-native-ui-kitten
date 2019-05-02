/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ngd-styles-block',
  template: `
    <nb-card [ngdFragment]="source.slag">
      <nb-card-body>
        <h2>{{ source.name }}</h2>
        <ngd-styles-table-block [source]="source"></ngd-styles-table-block>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdStylesBlockComponent {

  @Input() source;
}
