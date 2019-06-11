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
  selector: 'ngd-examples-block',
  template: `
    <nb-card [ngdFragment]="source.slag">
      <nb-card-body>
        <h2>{{ source.name }}</h2>
        <ngd-stacked-example-block *ngIf="hasExamples()" [content]="examples"
                                   class="widget-block">
        </ngd-stacked-example-block>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdExamplesBlockComponent {

  source: any;
  examples: any[];

  @Input('source')
  set setExamples(source: any) {
    this.source = source;
    this.examples = source.examples;
  }

  hasExamples(): boolean {
    return this.examples.length !== 0;
  }
}
