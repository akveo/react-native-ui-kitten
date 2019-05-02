/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgdDocumentationComponent } from './documentation.component';
import { NgdPageComponent } from './page/page.component';

export const routes: Routes = [
  {
    path: '',
    component: NgdDocumentationComponent,
    children: [
      {
        path: ':page',
        component: NgdPageComponent,
      },
      {
        path: ':page/:subPage',
        component: NgdPageComponent,
      },
      {
        path: ':page/:subPage/:tab',
        component: NgdPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NgdDocumentationRoutingModule {
}
