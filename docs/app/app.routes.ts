/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Routes } from '@angular/router';
import { ReactHomepageComponent } from './homepage/homepage.component';
import { NgdPageComponent } from './docs/page/page.component';
import { ReactDocsComponent } from './docs/docs.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: ReactHomepageComponent,
  },
  {
    path: 'docs',
    component: ReactDocsComponent,
    children: [{
      path: ':page',
      component: NgdPageComponent,
    },
    {
      path: ':page/:sub-page',
      component: NgdPageComponent,
    }],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
