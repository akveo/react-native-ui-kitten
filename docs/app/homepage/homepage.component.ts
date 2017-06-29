import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'react-homepage',
    templateUrl: 'homepage.component.html',
    styleUrls: ['homepage.component.scss'],
})
export class ReactHomepageComponent implements AfterViewInit {
  constructor(private renderer: Renderer2,
              private titleServise: Title) {
    this.renderer.setProperty(document.body, 'scrollTop', 0);
  }

  transparentHeader: boolean = true;

  ngOnInit() {
    this.titleServise.setTitle('React Native UI Kitten');
  }

  ngAfterViewInit() {
    Observable.fromEvent(window, 'scroll')
      .subscribe(() => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.transparentHeader = scrollTop == 0;
      });
  }
}
