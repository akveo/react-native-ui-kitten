import React from 'react';
import { StyleSheet } from 'react-native';
import { Avatar, Layout, Text } from '@ui-kitten/components';

const SIZES = ['tiny', 'small', 'medium', 'large', 'giant'] as const;
const SHAPES = ['round', 'rounded', 'square'] as const;

const Label: React.FC<{ children: string }> = ({ children }) => (
  <Text category="s1" style={styles.label}>{children}</Text>
);

export const AvatarSimpleUsageShowcase = (): React.ReactElement => (
  <Layout style={styles.container} level="1">

    <Label>Sizes</Label>
    <Layout style={styles.row} level="1">
      {SIZES.map((s) => (
        <Avatar
          key={s}
          style={styles.avatar}
          size={s}
          source={require('../../assets/icon.png')}
        />
      ))}
    </Layout>

    <Label>Shapes</Label>
    {SHAPES.map((shape) => (
      <React.Fragment key={shape}>
        <Text category="c1" style={styles.shapeLabel}>{shape}</Text>
        <Layout style={styles.row} level="1">
          {SIZES.map((s) => (
            <Avatar
              key={s}
              style={styles.avatar}
              size={s}
              shape={shape}
              source={require('../../assets/icon.png')}
            />
          ))}
        </Layout>
      </React.Fragment>
    ))}

  </Layout>
);

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },
  label: {
    marginTop: 12,
    marginBottom: 6,
  },
  shapeLabel: {
    marginTop: 8,
    marginBottom: 4,
    color: '#8F9BB3',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  avatar: {
    margin: 4,
  },
});
