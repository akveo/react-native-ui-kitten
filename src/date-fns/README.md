# @ui-kitten/date-fns

[date-fns](https://date-fns.org) date service for the [UI Kitten](https://akveo.github.io/react-native-ui-kitten) Calendar, RangeCalendar and Datepicker.

```sh
npm install @ui-kitten/date-fns date-fns
```

```tsx
import { Datepicker } from '@ui-kitten/components';
import { DateFnsService } from '@ui-kitten/date-fns';

const dateService = new DateFnsService();

export const Picker = () => {
  const [date, setDate] = React.useState(new Date());
  return <Datepicker date={date} onSelect={setDate} dateService={dateService} />;
};
```

Pass a locale and date-fns options to the constructor: `new DateFnsService('fr', { formatOptions: { locale: fr }, parseOptions: { locale: fr } })`. See [Datepicker](https://akveo.github.io/react-native-ui-kitten/docs/components/datepicker).

## Part of UI Kitten

Lives in the [UI Kitten](https://github.com/akveo/react-native-ui-kitten) monorepo and is versioned together with [`@ui-kitten/components`](https://www.npmjs.com/package/@ui-kitten/components). Upgrading from 5.x? Run `npx @ui-kitten/codemod` and read the [5.x to 6 migration guide](https://akveo.github.io/react-native-ui-kitten/docs/migration/5x-to-6).

[MIT](https://github.com/akveo/react-native-ui-kitten/blob/master/LICENSE.txt)
