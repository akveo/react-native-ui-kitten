import { Injectable } from '@angular/core';

@Injectable()
export class NgdVersionService {

  getKittenVersion() {
    return require('../../../../../package.json').version;
  }
}
