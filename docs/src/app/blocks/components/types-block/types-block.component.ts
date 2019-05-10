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
  selector: 'ngd-types-block',
  template: `
    <ngd-prop-block *ngIf="types.length > 0"
                    [properties]="types"
                    name="Types"
                    [slag]="slag"
                    class="widget-block">
    </ngd-prop-block>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdTypesBlockComponent {
  slag: string;

  types: any[] = [];

  @Input('source')
  set setSource(source: any) {
    this.types = source.types;
    this.slag = source.slag;
  }

  constructor(private metadataService: NgdMetadataService) {
  }
}
