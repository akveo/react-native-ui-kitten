import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { forkJoin,  of as observableOf,  Observable } from 'rxjs';
import { map,  catchError } from 'rxjs/operators';
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
  examples = [];

  @Input()
  set content({ files }) {
    console.log(files)
    this.examples = files.map((file: any) => {
      return {
        code: file.code,
        path: file.path,
        extension: 'tsx',
      }
    });
    this.examples[0].active = true;

    // forkJoin(files.map(file => {
    //   return {
    //     code: file.code,
    //     path: '',
    //     extension: 'tsx',
    //   }
    // }))
    //   .subscribe(files => {
    //     (files[0] as any).active = true;
    //     this.examples = files;
    //     this.cd.detectChanges();
    //   });
  }

  constructor(private codeLoader: NgdCodeLoaderService, private cd: ChangeDetectorRef) {
  }

  switchToLiveView() {
    this.changeView.emit(NgdExampleView.LIVE);
  }

  private load(path): Observable<any> {
    const extension = path.split('.').pop();
    return this.codeLoader.load(path)
      .pipe(
        map(code => ({ code, path, extension })),
        catchError(e => observableOf('')),
      );
  }
}
