import { Injectable } from '@angular/core';

@Injectable()
export class NgdMetadataService {
  isPublic(prop): boolean {
    return !prop.isDocsPrivate && !prop.inherited;
  }
}
