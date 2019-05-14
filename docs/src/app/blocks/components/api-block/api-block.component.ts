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
import { NgdTabbedService } from '../../../@theme/services';

@Component({
  selector: 'ngd-api-block',
  template: `
    <nb-card [ngdFragment]="source.slag">
      <nb-card-body>
        <h2>{{ source.name }}</h2>
        <ngd-types-block [source]="source" *ngIf="hasTypes(source)"></ngd-types-block>
        <ngd-props-block [source]="source" *ngIf="hasProps(source)"></ngd-props-block>
        <ngd-methods-block [source]="source" *ngIf="hasMethods(source)"></ngd-methods-block>
        <ngd-hoc-params-block [source]="source" *ngIf="hasParams(source)"></ngd-hoc-params-block>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdApiBlockComponent {

  @Input('source') source;

  constructor(private tabbedService: NgdTabbedService) {
  }


  hasMethods(component): boolean {
    return this.tabbedService.componentHasMethods(component);
  }

  hasProps(component): boolean {
    return this.tabbedService.componentHasProps(component);
  }

  hasTypes(component): boolean {
    return this.tabbedService.componentHasTypes(component);
  }

  hasParams(component: any): boolean {
    return this.tabbedService.componentHasParams(component);
  }
}
