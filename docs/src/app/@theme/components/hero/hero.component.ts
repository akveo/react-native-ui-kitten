import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngd-hero',
  styleUrls: ['./hero.component.scss'],
  template: `
    <div class="block">
      <h1>Angular 8: UI Kit, Auth&nbsp;&&nbsp;Security</h1>
      <div class="btns-wrapper">
        <a class="btn get-started" routerLink="docs">Get Started</a>
        <a class="btn" href="http://akveo.com/ngx-admin?utm_source=nebular_documentation&utm_medium=demo_button"
           target="_blank">Demo</a>
      </div>
      <div class="hero-features">
        <div class="hero-feature">
          <div class="feature-key">
            35+
          </div>
          <h3 class="feature-title">
            Angular Components
          </h3>
        </div>
        <div class="hero-feature">
          <div class="feature-key">
            3
          </div>
          <h3 class="feature-title">
            Visual themes
          </h3>
        </div>
        <div class="hero-feature">
          <div class="feature-key">
            3
          </div>
          <h3 class="feature-title">
            Auth strategies
          </h3>
        </div>
        <div class="hero-feature">
          <div class="feature-key">
            <nb-icon icon="lock"></nb-icon>
          </div>
          <h3 class="feature-title">
            Security
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
