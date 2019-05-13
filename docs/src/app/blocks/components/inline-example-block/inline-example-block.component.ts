import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'ngd-inline-example-block',
  template: `
    <ngd-example-block *ngIf="isOneFile" [content]="content"></ngd-example-block>
    <ngd-tabbed-example-block *ngIf="isTabbed" [content]="content"></ngd-tabbed-example-block>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdInlineExampleBlockComponent {

  @Input() content;

  get isOneFile(): boolean {
    return !this.isTabbed;
  }

  get isTabbed(): boolean {
    return this.content.files.length > 1;
  }
}
