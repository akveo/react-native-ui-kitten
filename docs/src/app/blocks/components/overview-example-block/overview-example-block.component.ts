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
  selector: 'ngd-overview-example',
  template: `
    <h5 style="margin-top: 2rem">{{title}}:</h5>
    <ngd-code-block [code]="code"></ngd-code-block>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdOverviewExampleBlock {

  code: any;
  title: string;

  @Input('example')
  set example(value) {
    this.code = value.code.replace(/```/g, '');
    this.title = value.description;
  }
}
