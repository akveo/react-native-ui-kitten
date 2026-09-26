import React, { useEffect } from 'react';
import type { Preview } from '@storybook/react-vite';
import * as eva from '@ui-kitten/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { evaDark, evaLight } from './theme';

// Match the manager (see manager.ts): start stories in the OS colour scheme.
const prefersDark =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // The canvas background is driven by the Eva theme toolbar below.
    backgrounds: { disable: true },
    docs: {
      theme: evaLight,
    },
  },
  globalTypes: {
    theme: {
      description: 'Eva theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: prefersDark ? 'dark' : 'light',
  },
  decorators: [
    (Story, context) => {
      const themeName = context.globals.theme || 'light';
      const theme = themeName === 'dark' ? eva.dark : eva.light;
      const canvasBg = themeName === 'dark' ? evaDark.appPreviewBg : evaLight.appPreviewBg;

      // Paint the whole canvas, not only the story root, with the Eva background so
      // the padding around a story matches `background-basic-color-1`.
      useEffect(() => {
        document.body.style.backgroundColor = canvasBg ?? '';
        document.body.style.color = theme['text-basic-color'];
      }, [canvasBg, theme]);

      return (
        <>
          <IconRegistry icons={[EvaIconsPack]} />
          <ApplicationProvider {...eva} theme={theme}>
            <Story />
          </ApplicationProvider>
        </>
      );
    },
  ],
};

export default preview;
