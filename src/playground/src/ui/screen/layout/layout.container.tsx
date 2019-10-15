import React from 'react';
import { StyleSheet } from 'react-native';
import {
  LayoutElement,
  LayoutProps,
} from 'react-native-ui-kitten';
import { LayoutShowcase } from './layoutShowcase.component';
import {
  layoutShowcase,
  layoutSettings,
} from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class LayoutContainer extends React.Component {

  private renderItem = (props: LayoutProps): LayoutElement => {
    return (
      <LayoutShowcase
        {...props}
        style={[styles.component, props.style]}
      />
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={layoutShowcase}
        settings={layoutSettings}
        renderItem={this.renderItem}>
      </ShowcaseContainer>
    );
  }
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    height: 256,
  },
});

