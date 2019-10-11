import { Inject, Injectable } from '@angular/core';
import { Observable,  fromEvent as observableFromEvent } from 'rxjs';
import { filter,  map } from 'rxjs/operators';
import { NB_WINDOW } from '@nebular/theme';

@Injectable()
export class NgdIframeCommunicatorService {

  constructor(@Inject(NB_WINDOW) private window) {
  }

  public send(payload: any, target: Window = this.window.parent) {
    if (target !== this.window) {
      target.postMessage(payload, '*');
    }
  }

  public receive(id: string): Observable<any> {
    return observableFromEvent(this.window, 'message')
      .pipe(
        filter((msg: any) => {
          if (msg.data && msg.data.id && msg.data.id.length !== 0) {
            return msg.data && msg.data.id === id
          }
        }),
        map((msg: any) => msg.data),
      );
  }
}
