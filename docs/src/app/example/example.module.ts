/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NgdExampleRoutingModule } from './example-routing.module';
import { NgdExampleComponent } from './example.component';
import { NgdExample404Component } from './example-404.component';


@NgModule({
  imports: [
    NgdExampleRoutingModule,
  ],
  declarations: [
    NgdExampleComponent,
    NgdExample404Component,
  ],
})
export class NgdExampleModule {
}
