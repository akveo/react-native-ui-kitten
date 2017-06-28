/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'react-properties-block',
  template: `
    <div class="block-container">
      <p class="block-title">Properties</p>
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
              <p reactDescription>{{ prop.shortDescription }}</p>
              <p reactDescription>{{ prop.description }}</p>
           </td>
         </tr>
       </tbody>
      </table>
    </div>
  `,
})
export class ReactPropertiesBlockComponent {

  @Input() klass: any;

}
