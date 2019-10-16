/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgdThemeModule } from '../@theme/theme.module';

import {
  NgdMdBLockComponent,
  NgdTabbedBlockComponent,
  NgdOverviewBlockComponent,
  NgdExampleBlockComponent,
  NgdInlineExampleBlockComponent,
  NgdTabbedExampleBlockComponent,
  NgdLiveExampleBlockComponent,
  NgdStackedExampleComponent,
  NgdCodeBlockComponent,
  NgdMethodsBlockComponent,
  NgdPropsBlockComponent,
  NgdPropBlockComponent,
  NgdStylesBlockComponent,
  NgdThemeComponent,
  NgdComponentBlockComponent,
  NgdApiBlockComponent,
  NgdStylesTableBlockComponent,
  NgdExamplesBlockComponent,
  NgdPagerBlockComponent,
  NgdComponentsOverviewBlockComponent,
  NgdTypesBlockComponent,
  NgdHocParamsBlockComponent,
  NgdOverviewExampleBlock,
} from './components/';
import {
  NbInputModule,
  NbRadioModule,
  NbTooltipModule,
} from '@nebular/theme';

const blocks = [
  NgdMdBLockComponent,
  NgdTabbedBlockComponent,
  NgdOverviewBlockComponent,
  NgdExampleBlockComponent,
  NgdInlineExampleBlockComponent,
  NgdTabbedExampleBlockComponent,
  NgdLiveExampleBlockComponent,
  NgdStackedExampleComponent,
  NgdCodeBlockComponent,
  NgdMethodsBlockComponent,
  NgdPropsBlockComponent,
  NgdPropBlockComponent,
  NgdStylesBlockComponent,
  NgdThemeComponent,
  NgdComponentBlockComponent,
  NgdApiBlockComponent,
  NgdStylesTableBlockComponent,
  NgdExamplesBlockComponent,
  NgdPagerBlockComponent,
  NgdComponentsOverviewBlockComponent,
  NgdTypesBlockComponent,
  NgdHocParamsBlockComponent,
  NgdOverviewExampleBlock,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgdThemeModule,
    NbRadioModule,
    NbInputModule,
    NbTooltipModule,
  ],
  declarations: [
    ...blocks,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ...blocks,
  ],
})
export class NgdBlocksModule {
}
