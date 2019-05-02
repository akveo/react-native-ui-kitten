import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ngd-icon-card',
  styleUrls: ['./icon-card.component.scss'],
  template: `
    <div class="icon">
      <img [src]="icon" />
    </div>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdIconCardComponent {

  @Input() title: string;
  @Input() icon: SafeHtml;
  @Input() description: string;
}
