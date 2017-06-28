/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'react-description-block',
  template: `
    <div class="block-container">
      <p *ngIf="isShortDescription" class="short-description">
        {{ klass?.shortDescription }}
      </p>
      <p *ngIf="isDescription" reactDescription class="description">
        {{klass?.description}}
      </p>
    </div>
  `,
})
export class ReactDescriptionBlockComponent implements OnChanges {

  @Input() klass: any;
  isDescription: boolean;
  isShortDescription: boolean;

  ngOnChanges() {
    this.isShortDescription = !!this.klass.shortDescription && this.klass.shortDescription != this.klass.name;
    this.isDescription = !!this.klass.description && this.klass.description != this.klass.shortDescription;
  }
}
