/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { NgdDocumentationRoutingModule } from './documentation-routing.module';
import { NgdThemeModule } from '../@theme/theme.module';
import { NgdPageComponent } from './page/page.component';
import { NgdDocumentationComponent } from './documentation.component';
import { NgdMenuService } from '../@theme/services/menu.service';
import { NgdBlocksModule } from '../blocks/blocks.module';


@NgModule({
  imports: [
    NgdDocumentationRoutingModule,
    NgdThemeModule,
    NbCardModule,
    NgdBlocksModule,
  ],
  declarations: [
    NgdPageComponent,
    NgdDocumentationComponent,
  ],
  providers: [
    NgdMenuService,
  ],
})
export class NgdDocumentationModule {
}
