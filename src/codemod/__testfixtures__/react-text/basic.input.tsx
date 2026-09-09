// React 19 removed `ReactText`. It was exactly `string | number`.
import React from 'react';
import { ReactText } from 'react';

export interface Props {
  title: React.ReactText;
  subtitle?: ReactText;
  // Inside a union and an array the replacement has to be parenthesised.
  items: ReactText[];
  either: ReactText | boolean;
}
