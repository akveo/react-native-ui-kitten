import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigationProps } from '@kitten/ui';
import { BottomNavigationShowcase } from './bottomNavigationShowcase.component';
import {
  bottomNavigationSettings,
  bottomNavigationShowcase,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class BottomNavigationContainer extends React.Component {

  private renderItem = (props: BottomNavigationProps): React.ReactElement<BottomNavigationProps> => {
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

