import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import * as marked from 'marked';

@Directive({
  selector: '[ngdDescription]',
})
export class NgdDescriptionDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    const md = marked.setOptions({});
    this.el.nativeElement.innerHTML = md.parse(this.el.nativeElement.innerHTML.trim());
  }
}
