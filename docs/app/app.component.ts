/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component } from '@angular/core';


import 'style-loader!./styles/styles.scss';

@Component({
  selector: 'ngd-app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <a class="github-fork-ribbon right-top" href="http://url.to-your.repo" title="Fork me on GitHub">Fork me on GitHub</a>
    <router-outlet></router-outlet>
  `,
})
export class NgdAppComponent {

}
