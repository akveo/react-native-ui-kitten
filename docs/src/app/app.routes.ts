/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: './documentation/documentation.module#NgdDocumentationModule',
  },
  {
    path: 'example',
    loadChildren: './example/example.module#NgdExampleModule',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
