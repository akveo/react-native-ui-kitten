import { Injectable } from '@angular/core';

@Injectable()
export class NgdVersionService {

  getNebularVersion() {
    return require('../../../../../package.json').version;
  }
}
