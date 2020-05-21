/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NbLayoutModule,
  NbMenuModule,
  NbTabsetModule,
  NbSidebarModule,
  NbCardModule,
  NbCheckboxModule,
  NbIconModule,
  NbSelectModule,
  NbInputModule, NbButtonModule,
} from '@nebular/theme';

import { NbEvaIconsModule } from '@nebular/eva-icons';

import {
  NgdHeaderComponent,
  NgdHeroComponent,
  NgdIconCardComponent,
  NgdTextCardComponent,
  NgdFooterComponent,
  NgdFragmentTargetDirective,
  NgdPageTocComponent,
  NgdPageTabsComponent,
  NgdColorSwatchDirective,
  NgdDescriptionDirective,
  NgdSearchComponent,
} from './components/';

import {
  NgdHighlightService,
  NgdTextService,
  NgdTabbedService,
  NgdStructureService,
  NgdCodeLoaderService,
  NgdIframeCommunicatorService,
  NgdStylesService,
  NgdVersionService,
  NgdVisibilityService,
  NgdPaginationService,
  NgdAnalytics,
  NgdMenuService,
  NgdMetadataService,
} from './services';
import { AkveoServicesBanner } from './components/hubspot-cta/akveo-services-banner.component';

@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbMenuModule,
    NbTabsetModule,
    NbIconModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
    NbEvaIconsModule,
    RouterModule,
  ],
  declarations: [
    NgdHeaderComponent,
    NgdHeroComponent,
    NgdIconCardComponent,
    NgdTextCardComponent,
    NgdFooterComponent,
    NgdFragmentTargetDirective,
    NgdPageTocComponent,
    NgdPageTabsComponent,
    NgdColorSwatchDirective,
    NgdDescriptionDirective,
    NgdSearchComponent,
    AkveoServicesBanner,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NbIconModule,
    NbLayoutModule,
    NbSidebarModule,
    NbCardModule,
    NbMenuModule,
    NbTabsetModule,
    NbCheckboxModule,
    NgdHeaderComponent,
    NgdHeroComponent,
    NgdIconCardComponent,
    NgdTextCardComponent,
    NgdFooterComponent,
    NgdFragmentTargetDirective,
    NgdPageTocComponent,
    NgdPageTabsComponent,
    NgdColorSwatchDirective,
    NgdDescriptionDirective,
    AkveoServicesBanner,
  ],
})
export class NgdThemeModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: NgdThemeModule,
      providers: [
        NgdHighlightService,
        NgdTextService,
        NgdTabbedService,
        NgdStructureService,
        NgdCodeLoaderService,
        NgdIframeCommunicatorService,
        NgdStylesService,
        NgdVersionService,
        NgdPaginationService,
        NgdAnalytics,
        NgdMenuService,
        NgdVisibilityService,
        NgdMetadataService,
      ],
    };
  }
}
