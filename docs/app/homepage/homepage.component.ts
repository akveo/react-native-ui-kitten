import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'react-homepage',
    templateUrl: 'homepage.component.html',
    styleUrls: ['homepage.component.scss'],
})
export class ReactHomepageComponent implements AfterViewInit {
  constructor(private renderer: Renderer2) {
    this.renderer.setProperty(document.body, 'scrollTop', 0);
  }

  transparentHeader: boolean = true;

  ngAfterViewInit() {
    Observable.fromEvent(window, 'scroll')
      // .debounceTime(50)
      .subscribe(() => {
        this.transparentHeader = document.body.scrollTop == 0;
      });
  }
}
