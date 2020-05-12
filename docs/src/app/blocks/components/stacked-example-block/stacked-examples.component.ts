import { Component, Input, OnInit } from '@angular/core';

import { NgdExampleView } from '../../enum.example-view';
import { NgdAnalytics } from '../../../@theme/services';
import { animate, animation, keyframes, style, transition, trigger, useAnimation } from '@angular/animations';

export const pulse = animation(
  animate(
    '{{ timing }}s {{ delay }}s',
    keyframes([
      style({ transform: 'scale3d(1, 1, 1)' }),
      style({ transform: 'scale3d({{ scale }}, {{ scale }}, {{ scale }})' }),
      style({ transform: 'scale3d(1, 1, 1)' }),
    ]),
  ),
  { params: { scale: 1.02, timing: 0.5, delay: 0 } },
);

@Component({
  selector: 'ngd-stacked-example-block',
  template: `
    <div *ngIf="isLiveExample">
      <td>
        <div *ngIf="content.shortDescription" ngdDescription>{{ content.shortDescription }}</div>
      </td>
      <ngd-live-example-block [hidden]="!isLive"
                              [@exampleState]="isLive ? 'live': 'code'"
                              [content]="content"
                              hasViewSwitch="true"
                              (changeView)="changeView($event)">
      </ngd-live-example-block>

      <ngd-tabbed-example-block [hidden]="isLive"
                                [@exampleState]="isLive ? 'live': 'code'"
                                [content]="content"
                                hasViewSwitch="true"
                                (changeView)="changeView($event)">
      </ngd-tabbed-example-block>
    </div>
    <div *ngIf="!isLiveExample">
      <ngd-overview-example [example]="content">
      </ngd-overview-example>
    </div>
  `,
  animations: [
    trigger('exampleState', [
      transition('live => code', [
        useAnimation(pulse),
      ]),
      transition('code => live', [
        useAnimation(pulse),
      ]),
    ]),
  ],
})
export class NgdStackedExampleComponent implements OnInit {

  @Input() content: any;
  isLive = true;
  isLiveExample: boolean;

  ngOnInit(): void {
    this.isLiveExample = this.content.hasOwnProperty('id');
  }

  constructor(private analytics: NgdAnalytics) {
  }

  changeView(view: NgdExampleView) {
    this.analytics.trackEvent('changeExampleView', view);
    this.isLive = view === NgdExampleView.LIVE;
  }
}
