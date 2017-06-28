/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-jsx.js';

@Component({
  selector: 'react-examples-block',
  template: `
    <p class="block-title">{{ title }}</p>
    <div class="block-container" *ngFor="let example of klass.examples">
      <p class="block-subtitle">{{example.shortDescription}}</p>
      <p reactDescription>{{example.description}}</p>
      <react-code-highlighter [code]="example.code.trim()"></react-code-highlighter>
      <pre><code [innerHTML]="getContent(example.code)"></code></pre>
    </div>   
`,
})
export class ReactExamplesBlockComponent {
  @Input() title: any = 'Usage';
  @Input() klass: any;
  isDescription: boolean;

  getContent(str) {
    return Prism.highlight(str.trim(), Prism.languages.jsx);
  }
}
