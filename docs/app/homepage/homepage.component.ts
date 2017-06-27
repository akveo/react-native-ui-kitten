import { Component, Renderer2 } from '@angular/core';

@Component({
    selector: 'react-homepage',
    templateUrl: 'homepage.component.html',
    styleUrls: ['homepage.component.scss'],
})
export class ReactHomepageComponent {
  constructor(private renderer: Renderer2) {
    this.renderer.setProperty(document.body, "scrollTop", 0);
  }
}
