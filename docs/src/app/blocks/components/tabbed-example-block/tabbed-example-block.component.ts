import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgdCodeLoaderService } from '../../../@theme/services';
import { NgdExampleView } from '../../enum.example-view';

@Component({
  selector: 'ngd-tabbed-example-block',
  styleUrls: ['./tabbed-example-block.component.scss'],
  templateUrl: './tabbed-example-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdTabbedExampleBlockComponent {


  @Input() hasViewSwitch = false;
  @Output() changeView = new EventEmitter<NgdExampleView>();
  examples: any[];

  @Input()
  set content(content: any) {
    this.examples = content;
    this.examples.map((item: any) => {
      item.code = this.prepareCode(item.code);
      item.path = 'path';
      return item;
    });
    this.examples[0].active = true;
  }

  constructor(private codeLoader: NgdCodeLoaderService, private cd: ChangeDetectorRef) {
  }

  private prepareCode(code: string): string {
    return code.replace(/`/g, '');
  }

}
