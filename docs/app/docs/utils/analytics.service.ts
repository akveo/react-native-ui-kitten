import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class Analytics {
	private enabled: boolean;

	constructor(private location: Location,
							private router: Router) {
		this.enabled = window.location.href.indexOf('akveo.github.io') >= 0;
	}

	trackPageViews() {
		if (this.enabled) {
			this.router.events
				.filter((event) => event instanceof NavigationEnd)
				.map(() => this.location.path())
				.delay(50)
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

	private gtmPushToDataLayer(params) {
		(<any> window).dataLayer.push(params);
	}
}