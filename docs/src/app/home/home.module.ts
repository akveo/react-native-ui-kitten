/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';

import { NgdHomeRoutingModule } from './home-routing.module';
import { NgdHomeComponent } from './home.component';
import { NgdThemeModule } from '../@theme/theme.module';


@NgModule({
  imports: [
    NgdHomeRoutingModule,
    NgdThemeModule,
  ],
  declarations: [
    NgdHomeComponent,
  ],
})
export class NgdHomeModule {
}
