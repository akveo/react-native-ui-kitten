// `styled` is the only export v6 removed. Its replacement is a hook, so this class has to become a
// function component first — a restructuring, not a substitution.
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { styled, StyledComponentProps, Text } from '@ui-kitten/components';

@styled('StyledComponent')
export class StyledCard extends React.Component<StyledComponentProps> {
  public render(): React.ReactElement {
    return (
      <View style={[this.props.eva.style, styles.container]}>
        <Text>Styled</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({ container: { padding: 8 } });
