/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'react-methods-block',
  template: `
    <p class="block-title">Methods</p>
    
    <table class="table" *ngIf="klass?.methods?.length > 0">
      <thead>
        <tr>
          <td>Name</td>
          <td>Description</td>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let method of klass?.methods">
          <td>{{ method.name }}</td>
          <td>
          <div class="method-signature">
            <div><i>parameters:</i>
              <span *ngFor="let param of method.params; let last = last">
                {{param.name}}: <code>{{param.type}}</code><span *ngIf="!last">,</span>
              </span> 
            </div>
            <div>
             <i>return type:</i> 
              <code>{{ method.type.join(",\\n") }}</code>
            </div>
          </div>
          <div reactDescription>
            {{method.shortDescription}} <br> {{ method.description }} 
          </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div *ngFor="let method of klass?.methods">
      <div *ngIf="method.examples.length > 0">
        <react-examples-block  [klass]="method" [title]="'Examples of usage ' + method.name"></react-examples-block>
      </div>
    </div>  
`,
})
export class ReactMethodsBlockComponent {

  @Input() block: any;
  @Input() klass: any;

}
