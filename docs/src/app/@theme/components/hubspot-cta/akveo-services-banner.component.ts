import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { NB_DOCUMENT, NB_WINDOW } from '@nebular/theme';

@Component({
  selector: 'ngd-akveo-services-banner',
  template: `
    <span #wrapper class="hs-cta-wrapper" id="hs-cta-wrapper-{{ctaId}}">
      <span class="hs-cta-node hs-cta-{{ctaId}}" id="hs-cta-{{ctaId}}">
        <a href="https://cta-redirect.hubspot.com/cta/redirect/2452262/{{ctaId}}" target="_blank">
          <img class="hs-cta-img"
               id="hs-cta-img-38b7285f-759c-4b4e-aedc-6391d3af697c"
               style="border-width:0px; margin-top: 2rem"
               [height]="height"
               [width]="width"
               src="https://no-cache.hubspot.com/cta/default/2452262/{{ctaId}}.png"
               alt="Akveo Services"/>
        </a>
      </span>
    </span>
  `,
  styleUrls: ['akveo-services-banner.component.scss'],
})

export class AkveoServicesBanner implements OnInit {
  @Input() ctaId: string;

  @Input() width: string;

  @Input() height: string;

  @ViewChild('wrapper', { static: true }) wrapper: ElementRef;

  constructor(private host: ElementRef,
              @Inject(NB_DOCUMENT) private document,
              @Inject(NB_WINDOW) private window) {
  }

  ngOnInit() {
    if (this.window.hbspt && this.window.hbspt.cta && this.window.hbspt.cta.load) {
      this.loadCta();
    } else {
      this.loadHubSpotCtaScript();
    }
  }

  private loadCta() {
    this.window.hbspt.cta.load(2452262, this.ctaId, {});
  }

  private loadHubSpotCtaScript() {
    this.wrapper.nativeElement.appendChild(
      this.document.createRange().createContextualFragment(
        `<script type="text/javascript" src="https://js.hscta.net/cta/current.js"></script>`
      )
    );
    this.wrapper.nativeElement.querySelector('script').onload = this.loadCta.bind(this);
  }
}
