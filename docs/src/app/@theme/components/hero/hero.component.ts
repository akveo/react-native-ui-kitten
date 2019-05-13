import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngd-hero',
  styleUrls: ['./hero.component.scss'],
  template: `
    <div class="block">
      <h1>React Native: UI Kit, Theming and so on</h1>
      <div class="btns-wrapper">
        <a class="btn get-started" routerLink="docs">Get Started</a>
        <a class="btn" href="https://itunes.apple.com/us/app/kitten-tricks/id1246143230"
           target="_blank">IOS Demo</a>
        <a class="btn" href="https://play.google.com/store/apps/details?id=com.akveo.kittenTricks"
           target="_blank">Android Demo</a>
      </div>
      <div class="hero-features">
        <div class="hero-feature">
          <div class="feature-key">
            15+
          </div>
          <h3 class="feature-title">
            React Native Components
          </h3>
        </div>
        <div class="hero-feature">
          <div class="feature-key">
            <nb-icon icon="star"></nb-icon>
          </div>
          <h3 class="feature-title">
            Theming System
          </h3>
        </div>
      </div>
    </div>
    <div class="right-block">
      <div class="hero-components">
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdHeroComponent {
}
