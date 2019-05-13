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
  selector: 'ngd-props-block',
  template: `
    <ngd-prop-block *ngIf="props.length > 0"
                    [properties]="props"
                    name="Properties"
                    [slag]="slag"
                    class="widget-block">
    </ngd-prop-block>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdPropsBlockComponent {
  outputs: any = [];
  inputs: any = [];
  props: any = [];
  name: string;
  slag: string;

  @Input('source')
  set setSource(source: any) {
    this.props = source.props.filter(item => item.kind === 'prop');
    this.name = source.name;
    this.slag = source.slag;
  }

  constructor(private metadataService: NgdMetadataService) {
  }
}
