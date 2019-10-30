import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
  Card,
  CardHeaderElement,
  CardFooterElement,
  CardHeader,
  Text,
} from 'react-native-ui-kitten';

export class CardContainer extends React.Component {

  private renderHeader = (): CardHeaderElement => {
    return (
      <View>
        <Text>Header</Text>
      </View>
    );
  };

  private renderHeader1 = (): CardHeaderElement => {
    return (
      <CardHeader
        title='Header'
        description='Description'
      />
    );
  };

  private renderFooter = (): CardFooterElement => {
    return (
      <View>
        <Text>Footer</Text>
      </View>
    );
  };

  public render() {
    return (
      <View style={styles.container}>
        <Card
          // appearance='noDivider'
          status='danger'
          style={{ marginBottom: 20 }}
          header={this.renderHeader1}
          footer={this.renderFooter}>
          <Text style={styles.bodyText}>A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases. Originally, nebula was a name for any diffuse astronomical object, including galaxies beyond the Milky Way.</Text>
        </Card>
        <Card
          status='primary'
          header={this.renderHeader1}
          footer={this.renderFooter}>
          <Text style={styles.bodyText}>A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases. Originally, nebula was a name for any diffuse astronomical object, including galaxies beyond the Milky Way.</Text>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 20,
  },
});
