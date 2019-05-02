/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgdTabbedService } from '../../../@theme/services';

@Component({
  selector: 'ngd-api-block',
  template: `
    <nb-card [ngdFragment]="source.slag">
      <nb-card-body>
        <h2>{{ source.name }}</h2>
        <ngd-props-block [source]="source" *ngIf="hasProps(source)"></ngd-props-block>
        <ngd-methods-block [source]="source" *ngIf="hasMethods(source)"></ngd-methods-block>
      </nb-card-body>
    </nb-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdApiBlockComponent {

  @Input('source') source;

  constructor(private tabbedService: NgdTabbedService) {
  }


  hasMethods(component) {
    return this.tabbedService.componentHasMethods(component);
  }

  hasProps(component) {
    return this.tabbedService.componentHasProps(component);
  }
}
