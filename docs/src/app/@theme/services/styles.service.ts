/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Inject, Injectable } from '@angular/core';
import { DOCS } from '../../app.options';

@Injectable()
export class NgdStylesService {

  constructor(@Inject(DOCS) private docs) {
  }

  mapThemedValues(classStyles: any): any {
    return classStyles.map(item => {
      item.styles.map(prop => {
        prop.themedValues = [];
        for (const themeName in this.docs.themes) {
          if (this.docs.themes.hasOwnProperty(themeName)) {
            const theme = this.docs.themes[themeName];
            prop.themedValues.push({
              theme: theme.name,
              value: theme.data[prop.name] ? theme.data[prop.name].value : 'unknown',
            });
          }
        }
        return prop;
      });
      return item;
    })
  }
}
