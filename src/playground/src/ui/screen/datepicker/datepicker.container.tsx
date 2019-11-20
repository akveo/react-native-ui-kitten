import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from 'react-native-ui-kitten';
import { ShowcaseContainer } from '../common/showcase.container';
import { DatepickerShowcase } from './datepickerShowcase.component';
import { RangeDatepickerShowcase } from './rangeDatepickerShowcase.component';

export class DatepickerContainer extends React.Component {

  private renderItem = (): React.ReactElement<any> => {
    return null;
  };

  public render(): React.ReactNode {
    return (
      <ShowcaseContainer
        style={styles.container}
        showcase={{ sections: [] }}
        renderItem={this.renderItem}>
        <Layout style={styles.showcaseContainer}>
          <DatepickerShowcase />
        </Layout>
        <Layout style={styles.showcaseContainer}>
          <RangeDatepickerShowcase />
        </Layout>
      </ShowcaseContainer>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  showcaseContainer: {
    paddingVertical: 8,
  },
});
