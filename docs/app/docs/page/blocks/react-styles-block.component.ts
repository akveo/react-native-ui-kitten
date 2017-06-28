/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'react-styles-block',
  template: `
    <div class="block-container" *ngFor="let style of klass.styles">
      <p class="block-title">{{ style.shortDescription }}</p>
      <table class="table">
        <thead>
          <tr>
            <td>Name</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of style.styles">
            <td>{{ item.name}}</td>
            <td>
              <p *ngIf="item.shortDescription" reactDescription>{{ item.shortDescription}}</p>
              <p *ngIf="item.description" reactDescription>{{ item.description }}</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
`,
})
export class ReactStylesBlockComponent {

  @Input() klass: any;

}
