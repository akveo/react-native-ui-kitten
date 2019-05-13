import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'ngd-text-card',
  styleUrls: ['./text-card.component.scss'],
  template: `
    <div class="icon">
      <img [src]="icon" />
    </div>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdTextCardComponent {

  @Input() title: string;
  @Input() description: string;
  @Input() icon: SafeHtml;
}
