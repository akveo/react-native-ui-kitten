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
        <ngd-stacked-example-block
          *ngFor="let example of source.examples"
          [content]="example"
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
  }

  hasExamples(): boolean {
    return this.source.examples.length !== 0;
  }
}
