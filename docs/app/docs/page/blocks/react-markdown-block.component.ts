import { Component, OnInit, Input } from '@angular/core';
import * as Prism from 'prismjs';
import 'prismjs/components/prism-jsx.js';
import * as marked from 'marked';

@Component({
  selector: 'react-markdown-block',
  template: `<div reactDescription [innerHtml]="markdown"></div>`,
})
export class ReactMarkdownComponent implements OnInit {

  @Input() block: any;
  markdown: string;

  ngOnInit() {
    let markdownFile = this.block.source;
    this.markdown = require('raw-loader!../../../../assets/articles/' + markdownFile);
    let md = marked.setOptions({
      highlight: (code) => Prism.highlight(code.trim(), Prism.languages.jsx)
    });

    this.markdown = md.parse(this.markdown.trim());
  }

}
