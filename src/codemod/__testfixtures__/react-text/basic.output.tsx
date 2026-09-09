// React 19 removed `ReactText`. It was exactly `string | number`.
import React from 'react';

export interface Props {
  title: string | number;
  subtitle?: string | number;
  // Inside a union and an array the replacement has to be parenthesised.
  items: (string | number)[];
  either: string | number | boolean;
}
