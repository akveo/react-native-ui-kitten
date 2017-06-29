/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import {
  NgaThemeModule,
  NgaSidebarModule,
  NgaCardModule,
  NgaLayoutModule,
  NgaMenuModule,
} from '@akveo/nga-theme';
import { NgdAppComponent } from './app.component';
import { routes } from './app.routes';
import { ReactHomepageComponent } from './homepage/homepage.component';
import { DocsService } from './docs/docs.service';
import { ReactDocsComponent } from './docs/docs.component';
import { NgdPageComponent } from './docs/page/page.component';
import { ReactMarkdownComponent } from './docs/page/blocks/react-markdown-block.component';
import { ReactDescriptionBlockComponent } from './docs/page/blocks/react-description-block.component';
import { ReactExamplesBlockComponent } from './docs/page/blocks/react-examples-block.component';
import { ReactPropsBlockComponent } from './docs/page/blocks/react-props-block.component';
import { ReactMethodsBlockComponent } from './docs/page/blocks/react-methods-block.component';
import { ReactStylesBlockComponent } from './docs/page/blocks/react-styles-block.component';
import { ReactPropertiesBlockComponent } from './docs/page/blocks/react-properties-block.component';
import { ReactDescriptionDirective } from './docs/utils/react-description.directive';
import { ReactDemoPhoneComponent } from './docs/page/blocks/react-demo-phone.component';
import { CodeHighlighterComponent } from './docs/utils/code-highlighter.component';
import { ReactHeaderComponent } from './components/header/react-header.component';
import { ReactFooterComponent } from './components/footer/react-footer.component';
import { Analytics } from './docs/utils/analytics.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgaThemeModule,
    NgaSidebarModule,
    NgaCardModule,
    NgaLayoutModule,
    NgaMenuModule.forRoot(),
    NgaThemeModule.forRoot({ name: 'default' }),
    NgaSidebarModule.forRoot(),
    RouterModule.forRoot(routes, { useHash: true }),

  ],
  declarations: [
    NgdAppComponent,
    ReactHomepageComponent,
    ReactDocsComponent,
    NgdPageComponent,
    ReactMarkdownComponent,
    ReactDescriptionBlockComponent,
    ReactExamplesBlockComponent,
    ReactPropsBlockComponent,
    ReactMethodsBlockComponent,
    ReactStylesBlockComponent,
    ReactPropertiesBlockComponent,
    ReactDescriptionDirective,
    ReactDemoPhoneComponent,
    CodeHighlighterComponent,
    ReactHeaderComponent,
    ReactFooterComponent,

  ],
  providers: [
    DocsService,
    Analytics,
    Title
  ],
  entryComponents: [
  ],
  bootstrap: [NgdAppComponent],
})
export class AppModule {
}
