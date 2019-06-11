import { Injectable } from '@angular/core';

@Injectable()
export class NgdVersionService {

  supportedVersions = [ '3.1.3' ];

  getKittenVersion(): string {
    return require('../../../../../package.json').version;
  }

  getKittenVersions(): string[] {
    return this.supportedVersions.concat(this.getKittenVersion());
  }

  getVersionPath(version: string): string {
    const base = '/react-native-ui-kitten/docs';
    if (version === this.getKittenVersion()) {
      return base;
    }

    return `${base}/${version}`;
  }
}
