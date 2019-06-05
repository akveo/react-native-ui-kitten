/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgdStylesService } from '../../../@theme/services';

@Component({
  selector: 'ngd-styles-table-block',
  template: `
    <table class="striped" *ngFor="let style of classStyles">
      <thead>
      <tr>
        <td>Name</td>
        <td>Theme Variable</td>
        <td>Default Value</td>
        <td>Description</td>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let item of style">
        <td>{{ item.name }}</td>
        <td>{{ item.parent || '' }}</td>
        <td ngdColorSwatch>{{ item.value || 'unknown' }}</td>
        <td>
          <p *ngIf="item.shortDescription" ngdDescription>{{ item.shortDescription}}</p>
          <p *ngIf="item.description" ngdDescription>{{ item.description }}</p>
        </td>
      </tr>
      </tbody>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdStylesTableBlockComponent {

  classStyles: any;

  @Input('source')
  set setSource(source: any) {
    this.classStyles = this.stylesService.mapThemedValues(source.styles);
  };

  constructor(private stylesService: NgdStylesService) {
  }

}
