import React from 'react';
import { StyleSheet } from 'react-native';
import { TopNavigationProps } from '@kitten/ui';
import {
  topNavigationSettings,
  topNavigationShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';
import { TopNavigationShowcase } from './topNavigationShowcase.component';

export class TopNavigationContainer extends React.Component {

  private renderItem = (props: TopNavigationProps): React.ReactElement<TopNavigationProps> => {
    return (
      <TopNavigationShowcase
        {...props}
        style={[styles.component, props.style]}
      />
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={topNavigationShowcase}
        settings={topNavigationSettings}
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

