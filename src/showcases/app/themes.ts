import * as eva from '@eva-design/eva';
import * as material from '@eva-design/material';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const themes: Record<string, any> = {
  Eva: {
    Light: eva.light,
    Dark: eva.dark,
  },
  Material: {
    Light: material.light,
    Dark: material.dark,
  },
};
