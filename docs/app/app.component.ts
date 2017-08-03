/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnInit } from '@angular/core';


import 'style-loader!./styles/styles.scss';
import { Analytics } from './docs/utils/analytics.service';

@Component({
  selector: 'ngd-app-root',
  styleUrls: ['./app.component.scss'],
  template: `
    <a class="github-fork-ribbon right-top" href="https://github.com/akveo/react-native-ui-kitten" target="_blank" title="Fork me on GitHub">Fork me on GitHub</a>
    <router-outlet></router-outlet>
  `,
})
export class NgdAppComponent implements OnInit {
  constructor(private _analytics: Analytics) {

  }

  ngOnInit(): void {
    this._analytics.trackPageViews();
  }
}
