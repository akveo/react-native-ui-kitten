import React from 'react';
import { StyleSheet } from 'react-native';
import {
  TabViewElement,
  TabViewProps,
} from '@kitten/ui';
import { TabViewShowcase } from './tabViewShowcase.component';
import { tabViewShowcase } from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class TabViewContainer extends React.Component {

  private renderItem = (props: TabViewProps): TabViewElement => {
    return (
      <TabViewShowcase
        {...props}
        style={[styles.component, props.style]}
      />
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={tabViewShowcase}
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

