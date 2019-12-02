/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {
  BrowserModule,
  Title,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
  NbThemeModule,
  NbSidebarModule,
  NbCardModule,
  NbLayoutModule,
  NbMenuModule,
  NbTabsetModule,
  NbProgressBarModule,
  NbCheckboxModule,
} from '@nebular/theme';
import { NgdThemeModule } from './@theme/theme.module';
import { NgdAppComponent } from './app.component';
import { routes } from './app.routes';

import { structure  } from '../structure';
const docs = require('../input.json');
const examples = require('../playground.json');
import {
  DOCS,
  STRUCTURE,
  EXAMPLES_STRUCTURE,
} from './app.options';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NbSidebarModule,
    NbCardModule,
    NbLayoutModule,
    NbTabsetModule,
    NbCheckboxModule,
    NbProgressBarModule,
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot(),
    NgdThemeModule.forRoot(),
    NbSidebarModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: false }),
  ],
  declarations: [
    NgdAppComponent,
  ],
  providers: [
    Title,
    { provide: STRUCTURE, useValue: structure },
    { provide: DOCS, useValue: docs },
    { provide: EXAMPLES_STRUCTURE, useValue: examples },
  ],
  entryComponents: [
  ],
  bootstrap: [NgdAppComponent],
})
export class AppModule {
}
