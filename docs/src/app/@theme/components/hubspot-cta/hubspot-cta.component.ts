import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { NB_DOCUMENT, NB_WINDOW } from '@nebular/theme';

@Component({
  selector: 'ngd-hubspot-cta-component',
  template: `
    <span #wrapper class="hs-cta-wrapper" id="hs-cta-wrapper-{{ctaId}}">
      <span class="hs-cta-node hs-cta-{{ctaId}}" id="hs-cta-{{ctaId}}">
        <a href="https://cta-redirect.hubspot.com/cta/redirect/2452262/{{ctaId}}" target="_blank">
          <ng-content></ng-content>
        </a>
      </span>
    </span>
  `,
})

export class HubspotCtaComponent implements OnInit {
  @Input() ctaId: string;

  @ViewChild('wrapper', { static: true }) wrapper: ElementRef;

  constructor(private host: ElementRef,
              @Inject(NB_DOCUMENT) private document,
              @Inject(NB_WINDOW) private window) {
  }

  ngOnInit() {
    const banner = this.wrapper.nativeElement;

    if (this.window.hbspt && this.window.hbspt.cta && this.window.hbspt.cta.load) {
      this.loadCta();

      return;
    }

    banner.appendChild(
      this.document.createRange().createContextualFragment(
        `<script type="text/javascript" src="https://js.hscta.net/cta/current.js"></script>`
      )
    );
    banner.querySelector('script').onload = this.loadCta.bind(this);
  }

  private loadCta() {
    this.wrapper.nativeElement.appendChild(
      this.document.createRange().createContextualFragment(
        `<script type="text/javascript">hbspt.cta.load(2452262, '${this.ctaId}', {});</script>`
      )
    );
  }
}
