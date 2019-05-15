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
import { NgdMetadataService } from '../../../@theme/services';

@Component({
  selector: 'ngd-hoc-params-block',
  template: `
    <ngd-prop-block *ngIf="params.length > 0"
                    [properties]="params"
                    name="Parameters"
                    [slag]="slag"
                    class="widget-block">
    </ngd-prop-block>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdHocParamsBlockComponent {
  slag: string;

  params: any[] = [];

  @Input('source')
  set setSource(source: any) {
    this.params = source.params;
    this.slag = source.slag;
  }

  constructor(private metadataService: NgdMetadataService) {
  }
}
