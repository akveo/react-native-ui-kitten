import { Directive, ElementRef } from '@angular/core';
import * as marked from 'marked';

@Directive({
    selector: '[reactDescription]',
})
export class ReactDescriptionDirective {

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    let md = marked.setOptions({});
    this.el.nativeElement.innerHTML = md.parse(this.el.nativeElement.innerHTML.trim());
  }
}
