import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Card,
  CardHeader,
  Text,
  List,
} from 'react-native-ui-kitten';

const bodyText: string = 'A nebula is an interstellar cloud of dust, hydrogen, helium and other ionized gases. ' +
  'Originally, nebula was a name for any diffuse astronomical object, including galaxies beyond the Milky Way.';

export class CardStatusesShowcase extends React.Component {

  statuses = [
    'primary',
    'success',
    'info',
    'warning',
    'danger',
  ];

  renderHeader = () => (
    <CardHeader
      title='Title'
      description='Description'
    />
  );

  renderItem = (info) => (
    <Card
      status={info.item}
      style={styles.card}
      header={this.renderHeader}>
      <Text style={styles.bodyText}>
        {bodyText}
      </Text>
    </Card>
  );

  render() {
    return (
      <List
        style={styles.container}
        data={this.statuses}
        renderItem={this.renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 500,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  card: {
    marginVertical: 4,
  },
  bodyText: {
    color: '#8f8b8b',
  },
});
