import { AfterViewInit, ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { NB_WINDOW } from '@nebular/theme';

@Component({
  selector: 'ngd-search',
  styleUrls: ['./search.component.scss'],
  template: `
    <nb-icon icon="search-outline"></nb-icon>
    <input type="text" nbInput id="doc-search" placeholder="Start typing...">
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgdSearchComponent implements AfterViewInit {

  constructor(@Inject(NB_WINDOW) private window) {
  }

  ngAfterViewInit() {
    this.window.docsearch({
      apiKey: '37fb5807fab4fb208cf3a25ddb6aa380',
      indexName: 'react-native-ui-kitten',
      inputSelector: '#doc-search',
      debug: false,
    });
  }
}
