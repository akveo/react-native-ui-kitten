import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ListElement,
  ListProps,
} from '@kitten/ui';
import { ListShowcase } from './listShowcase';
import {
  listSettings,
  listShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class ListContainer extends React.Component {

  private renderItem = (props: ListProps): ListElement => {
    return (
      <ListShowcase
        {...props}
        style={[styles.component, props.style]}
      />
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={listShowcase}
        settings={listSettings}
        renderItem={this.renderItem}>
      </ShowcaseContainer>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
  },
});

