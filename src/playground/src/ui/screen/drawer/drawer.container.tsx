import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { DrawerProps } from '@kitten/ui';
import { DrawerShowcase } from './drawerShowcase.component';
import { drawerShowcase } from './type';
import { ShowcaseContainer } from '../common/showcase.container';

export class DrawerContainer extends React.Component<NavigationScreenProps> {

  private toggleDrawer = () => {
    this.props.navigation.toggleDrawer();
  };

  private renderItem = (props: DrawerProps): React.ReactElement<DrawerProps> => {
    return (
      <DrawerShowcase
        {...props}
        style={[styles.component, props.style]}
        onPress={this.toggleDrawer}
      />
    );
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        showcase={drawerShowcase}
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

