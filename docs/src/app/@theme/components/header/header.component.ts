import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { NbMenuItem, NbSidebarService } from '@nebular/theme';
import { NgdVersionService } from '../../services';

@Component({
  selector: 'ngd-header',
  styleUrls: ['./header.component.scss'],
  template: `
    <div class="section left">
      <button *ngIf="sidebarTag" class="sidebar-toggle" (click)="toggleSidebar()">
        <nb-icon icon="menu-2"></nb-icon>
      </button>
      <div class="logo">
        <a routerLink="/">Nebular</a>
        <span class="version">v{{ currentVersion }}</span>
      </div>
    </div>
    <div class="section middle">
      <nb-menu [items]="mainMenu"></nb-menu>
      <ngd-search *ngIf="showSearch"></ngd-search>
    </div>
    <div class="section right">
      <iframe class="stars"
              src="https://ghbtns.com/github-btn.html?user=akveo&repo=nebular&type=star&count=true"
              frameborder="0"
              scrolling="0">
      </iframe>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdHeaderComponent implements OnInit {

  @Input() showSearch = true;
  @HostBinding('class.docs-page') @Input() isDocs = false;

  currentVersion: string;

  mainMenu: NbMenuItem[] = [
    {
      title: 'Docs',
      link: '/docs',
    },
    {
      title: 'Components',
      link: '/docs/components/components-overview',
    },
    {
      title: 'Theme System',
      link: '/docs/guides/theme-system',
    },
    {
      title: 'Auth',
      link: '/docs/auth/introduction',
    },
    {
      title: 'Security',
      link: '/docs/security/introduction',
    },
  ];

  @Input() sidebarTag: string;

  constructor(
    versionService: NgdVersionService,
    private sidebarService: NbSidebarService,
  ) {
    this.currentVersion = versionService.getNebularVersion();
  }

  ngOnInit() {
    if (!this.isDocs) {
      this.mainMenu.push({
        title: 'Professional Services',
        link: '/docs/getting-started/professional-services',
      });
    }
  }

  toggleSidebar() {
    this.sidebarService.toggle(false, this.sidebarTag);
  }
}
