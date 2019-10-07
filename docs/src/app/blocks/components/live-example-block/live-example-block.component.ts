import {
  Component,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { Location } from '@angular/common';
import { takeWhile } from 'rxjs/operators';
import { NgdAnalytics, NgdIframeCommunicatorService } from '../../../@theme/services';
import { NgdExampleView } from '../../enum.example-view';

@Component({
  selector: 'ngd-live-example-block',
  styleUrls: ['./live-example-block.component.scss'],
  templateUrl: './live-example-block.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdLiveExampleBlockComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('iframe', { static: false }) iframe: ElementRef;
  @Input() content: any;
  @Input() hasViewSwitch: boolean = false;
  @Output() changeView = new EventEmitter<NgdExampleView>();

  @HostBinding('class.theme-default')
  private get isDefault() {
    return this.currentTheme === 'default';
  }

  iframeHeight = 0;
  alive: boolean = true;

  currentTheme: string = 'default';
  loading = true;

  get url(): string {
    return this.location.prepareExternalUrl(this.content.url);
  }

  get iframeWindow(): Window {
    return this.iframe.nativeElement.contentWindow;
  }

  constructor(private changeDetection: ChangeDetectorRef,
              private location: Location,
              private analytics: NgdAnalytics,
              private communicator: NgdIframeCommunicatorService) {
  }

  ngOnInit() {
    this.communicator.receive(this.content.id)
      .pipe(takeWhile(() => this.alive))
      .subscribe(it => {
        this.iframeHeight = it.height;
        this.loading = false;
        this.changeDetection.detectChanges();
      });
  }

  ngAfterViewInit() {
    // we cannot set src using angular binding
    // as it will trigger change detection and reload iframe
    // which in its turn will send a new height
    // and we would need to set the height and trigger change detection again
    // resulting in infinite loop
    this.iframe.nativeElement.src = this.url;
  }

  ngOnDestroy() {
    this.alive = false;
  }

  switchToInlineVew() {
    this.changeView.emit(NgdExampleView.INLINE);
  }
}
