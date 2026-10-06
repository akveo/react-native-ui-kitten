# @ui-kitten/moment

[moment](https://momentjs.com) date service for the [UI Kitten](https://akveo.github.io/react-native-ui-kitten) Calendar, RangeCalendar and Datepicker.

```sh
npm install @ui-kitten/moment moment
```

```tsx
import moment from 'moment';
import { Datepicker } from '@ui-kitten/components';
import { MomentDateService } from '@ui-kitten/moment';

const dateService = new MomentDateService();

export const Picker = () => {
  const [date, setDate] = React.useState(moment());
  return <Datepicker date={date} onSelect={setDate} dateService={dateService} />;
};
```

Pass a locale to the constructor (`new MomentDateService('fr')`) after importing that moment locale. See [Datepicker](https://akveo.github.io/react-native-ui-kitten/docs/components/datepicker).

## Part of UI Kitten

Lives in the [UI Kitten](https://github.com/akveo/react-native-ui-kitten) monorepo and is versioned together with [`@ui-kitten/components`](https://www.npmjs.com/package/@ui-kitten/components). Upgrading from 5.x? Run `npx @ui-kitten/codemod` and read the [5.x to 6 migration guide](https://akveo.github.io/react-native-ui-kitten/docs/migration/5x-to-6).

[MIT](https://github.com/akveo/react-native-ui-kitten/blob/master/LICENSE.txt)
