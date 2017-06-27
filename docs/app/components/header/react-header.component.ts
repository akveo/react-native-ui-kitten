import { Component, OnInit, OnDestroy } from '@angular/core';
import { List } from 'immutable';
import { NgaMenuItem, NgaMenuService } from '@akveo/nga-theme/components/menu/menu.service';
import { Subscription } from 'rxjs/Subscription';
import { DocsService } from '../../docs/docs.service';

@Component({
  selector: 'react-header',
  styleUrls: ['react-header.component.scss'],
  template: `
    <div class="logo ui-kitten">
      <a routerLink="/">
        <img src="assets/logo.png">
        UI kitten
      </a>
    </div>
    <div class="menu">
      <a routerLink="/home">HOME</a>
      <a routerLink="/docs" routerLinkActive="active-link">DOCUMENTATION</a>
      <hr>
    </div>
    <span> Need some help? Let us know! 
      <a href="mailto:contact@akveo.com"><b>contact@akveo.com</b></a>
    </span>
    <i class="menu-icon ion-navicon" (click)="toggleMenu()"></i>
    <nga-menu class="mobile-menu" [class.active]="isMenuActive" [items]="menuItems"></nga-menu>
  `,

})

export class ReactHeaderComponent implements OnInit, OnDestroy {

  isMenuActive: boolean = false;
  menuItems: List<NgaMenuItem> = List([]);
  private structure: any;
  private menuSubscription: Subscription;

  constructor(private service: DocsService,
              private menuService: NgaMenuService) {
  }

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }

  ngOnInit() {
    this.menuItems = this.service.getPreparedMenu([
      {title: 'Home', link: '/home'},
      {title: 'Docs', link: '/docs'}
    ]);
    this.structure = this.service.getPreparedStructure();
    this.menuSubscription = this.menuService.onItemSelect().subscribe(event => this.isMenuActive = false);
  }

  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
  }
}
