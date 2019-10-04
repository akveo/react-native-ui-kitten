import React from 'react';
import { StyleSheet } from 'react-native';
import {
  TopNavigationElement,
  TopNavigationProps,
} from 'react-native-ui-kitten';
import {
  topNavigationSettings,
  topNavigationShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';
import { TopNavigationShowcase } from './topNavigationShowcase.component';

export class TopNavigationContainer extends React.Component {

  private renderItem = (props: TopNavigationProps): TopNavigationElement => {
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

