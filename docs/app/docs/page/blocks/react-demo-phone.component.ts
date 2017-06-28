import { Component, Input } from '@angular/core';

@Component({
  selector: 'react-phone-block',
  styleUrls: ['react-demo-phone.component.scss'],
  template:`
    <div>
      <button [class.active]="!isAndroid" (click)="switchToIos()">iOS</button>
      <button [class.active]="isAndroid" (click)="switchToAndroid()">Android</button>
    </div>  
    <div [class.android]="isAndroid">
      <img *ngIf="demoUrl" [src]="demoUrl" alt="Loading...">
    </div>
  `
})

export class ReactDemoPhoneComponent {

  @Input() demoUrl: string;
  isAndroid: boolean = false;

  switchToAndroid() {
    this.isAndroid = true;
  }

  switchToIos() {
    this.isAndroid = false;
  }
}
