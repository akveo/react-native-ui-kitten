/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'react-props-block',
  template: `
    <div class="block-container">
      <p class="block-title">Props</p>
      <table class="table" *ngIf="klass.props.length > 0">
       <thead>
         <tr>
           <td>Name</td>
           <td>Type</td>
           <td>Description</td>
         </tr>
       </thead>
       <tbody>
         <tr *ngFor="let prop of klass?.props">
           <td>{{ prop.name }}</td>
           <td><code>{{ prop.type }}</code></td>
           <td>
              <p *ngIf="!!prop.shortDescription" reactDescription>{{ prop.shortDescription }}</p>
              <p *ngIf="!!prop.description" reactDescription>{{ prop.description }}</p>
           </td>
         </tr>
       </tbody>
      </table>
    </div>
  `,
})
export class ReactPropsBlockComponent {

  @Input() klass: any;

}
