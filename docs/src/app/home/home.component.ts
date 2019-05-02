/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngd-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class NgdHomeComponent {

  features = [
    {
      title: 'Introduction',
      description: 'Install from scratch or based on ngx-admin',
      icon: 'assets/img/intro.svg',
      link: 'docs',
    },
    {
      title: 'Guides',
      description: 'Theme System configuration, customisation and other articles',
      icon: 'assets/img/guides.svg',
      link: 'docs/guides/install-based-on-starter-kit',
    },
    {
      title: 'Components',
      description: 'Native Angular components with configurable styles',
      icon: 'assets/img/components.svg',
      link: 'docs/components/components-overview',
    },
    {
      title: 'Theme System',
      description: `Three built-in themes & hundreds of variables to create your own.
                    With hot-reload out of the box`,
      icon: 'assets/img/themes.svg',
      link: 'docs/guides/theme-system',
    },
    {
      title: 'Auth',
      description: 'Authentication layer with configurable Strategies',
      icon: 'assets/img/auth.svg',
      link: 'docs/auth/introduction',
    },
    {
      title: 'Security',
      description: 'ACL list with helpful directives',
      icon: 'assets/img/security.svg',
      link: 'docs/security/introduction',
    },
  ];

  advantages = [
    {
      title: 'Modular',
      description: `Each feature is a separate npm module. Use only what you need.`,
      icon: 'assets/img/modular.svg',
    },
    {
      title: 'Angular',
      description: `Components are written in pure Angular without 3rd-party dependencies.`,
      icon: 'assets/img/native.svg',
    },
    {
      title: 'Open',
      description: `Modules source code is free and available under MIT licence.`,
      icon: 'assets/img/open-sourced.svg',
    },
    {
      title: 'Extendable',
      description: `Can be used in a mix with any UI library.`,
      icon: 'assets/img/extendable.svg',
    },
  ];

  constructor(themeService: NbThemeService) {
    themeService.changeTheme('docs-home');
  }
}
