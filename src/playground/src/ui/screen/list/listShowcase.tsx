import React from 'react';
import {
  ListProps,
  List,
} from '@kitten/ui';

export const ListShowcase = (props?: ListProps): React.ReactElement<ListProps> => {
  return (
    <List {...props}/>
  );
};
