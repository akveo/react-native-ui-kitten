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
    <router-outlet></router-outlet>
  `,
})
export class NgdAppComponent {

}
