/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  OnInit,
} from '@angular/core';
import { NgdAnalytics } from './@theme/services/analytics.service';

@Component({
  selector: 'ngd-app-root',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class NgdAppComponent implements OnInit {

  constructor(private analytics: NgdAnalytics) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}
