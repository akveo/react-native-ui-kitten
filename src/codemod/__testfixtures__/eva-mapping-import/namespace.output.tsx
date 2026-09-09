// `import * as eva from '@eva-design/eva'` spread into ApplicationProvider is *the* canonical v5
// form — it is what `src/template-ts/template/App.tsx` shipped.
import React from 'react';
import * as eva from '@ui-kitten/eva';
import * as material from '@ui-kitten/material';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';

export default (): React.ReactElement => (
  <ApplicationProvider
    {...eva}
    theme={{ ...eva.light, ...material.mapping }}
  >
    <Layout>
      <Text>Welcome to UI Kitten</Text>
    </Layout>
  </ApplicationProvider>
);
