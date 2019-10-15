import React from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomNavigationElement,
  BottomNavigationProps,
} from 'react-native-ui-kitten';
import { BottomNavigationShowcase } from './bottomNavigationShowcase.component';
import {
  bottomNavigationSettings,
  bottomNavigationShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class BottomNavigationContainer extends React.Component {

  private renderItem = (props: BottomNavigationProps): BottomNavigationElement => {
    return (
      <BottomNavigationShowcase
        {...props}
        style={[styles.component, props.style]}
      />
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={bottomNavigationShowcase}
        settings={bottomNavigationSettings}
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

