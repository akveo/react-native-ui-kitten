import { ChangeDetectionStrategy, Component, HostBinding, Inject, Input, OnInit } from '@angular/core';
import { NB_WINDOW, NbMenuItem, NbSidebarService } from '@nebular/theme';
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
        <a href="/react-native-ui-kitten">React Native UI Kitten</a>
        <span class="version">v{{ currentVersion }}</span>
      </div>
    </div>
    <div class="section middle">
      <nb-menu [items]="mainMenu"></nb-menu>
      <ngd-search></ngd-search>
      <nb-select class="version-select" [selected]="currentVersion" (selectedChange)="redirectToVersion($event)">
        <nb-option *ngFor="let version of versions" [value]="version">
          {{ version }}
        </nb-option>
      </nb-select>
    </div>
    <div class="section right">
      <iframe class="stars"
              src="https://ghbtns.com/github-btn.html?user=akveo&repo=react-native-ui-kitten&type=star&count=true"
              frameborder="0"
              scrolling="0">
      </iframe>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdHeaderComponent implements OnInit {

  @HostBinding('class.docs-page') @Input() isDocs = false;

  private window: Window;
  versions: string[];
  currentVersion: string;

  mainMenu: NbMenuItem[] = [
    {
      title: 'Docs',
      link: '/',
    },
    {
      title: 'Components',
      link: '/components/components-overview',
    },
    {
      title: 'Design System',
      link: '/design-system/eva-design-system-intro',
    },
  ];

  @Input() sidebarTag: string;
  constructor(
    @Inject(NB_WINDOW) window,
    private versionService: NgdVersionService,
    private sidebarService: NbSidebarService,
  ) {
    this.window = window;
    this.currentVersion = versionService.getKittenVersion();
    this.versions = versionService.getKittenVersions();
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

  redirectToVersion(version: string): void {
    this.window.location.href = this.versionService.getVersionPath(version);
  }
}
