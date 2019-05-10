/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  Input,
} from '@angular/core';
import { NgdExampleView } from '../../enum.example-view';
import { NgdAnalytics } from '../../../@theme/services';

@Component({
  selector: 'ngd-stacked-example-block',
  template: `
    <div>
      <ngd-tabbed-example-block [content]="content"
                                hasViewSwitch="true"
                                (changeView)="changeView($event)">
      </ngd-tabbed-example-block>
    </div>
  `,
})
export class NgdStackedExampleComponent {

  content: any;

  @Input('content')
  set setContent(source: any) {
    this.content = source;
  }

  isLive = false;

  constructor(private analytics: NgdAnalytics) {
  }

  changeView(view: NgdExampleView) {
    this.analytics.trackEvent('changeExampleView', view);
    this.isLive = view === NgdExampleView.LIVE;
  }
}
