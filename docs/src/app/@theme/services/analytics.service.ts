import { Injectable, Inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

import { filter, delay, map } from 'rxjs/operators';
import { NB_WINDOW } from '@nebular/theme';
declare const ga: any;

@Injectable()
export class NgdAnalytics {
  private enabled: boolean;

  constructor(@Inject(NB_WINDOW) private window,
              private location: Location,
              private router: Router) {
    this.enabled = this.window.location.href.indexOf('akveo.github.io') >= 0;
  }

  trackPageViews() {
    if (this.enabled) {
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.location.path()),
        filter((location: string) => this.trackLocation(location)),
        delay(50),
      )
        .subscribe((location: string) => {
          this.gtmPushToDataLayer({event: 'pageView' , path: location});
        });
    }
  }

  trackEvent(eventName: string, eventVal: string = '') {
    if (this.enabled) {
      this.gtmPushToDataLayer({ event: eventName, eventValue: eventVal });
    }
  }

  private trackLocation(path: string) {
    if (path.match(/\/components\/[a-zA-Z-]+\/?$/)
      || path.match(/\/docs\/?$/)
      || path.match(/\/example\//)) {

      return !!path.match(/\/components\/components-overview\/?$/);
    }
    return true;
  }

  private gtmPushToDataLayer(params) {
    this.window.dataLayer.push(params);
  }
}
