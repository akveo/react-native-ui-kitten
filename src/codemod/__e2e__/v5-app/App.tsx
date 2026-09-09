/**
 * The `@ui-kitten/template-ts` App.tsx as shipped in v5.3.1, extended with the ref patterns from the
 * v5 showcases plus one case from each group the codemod refuses to rewrite.
 *
 * Every line here is a pattern a real v5 app contains. The point of the file is that
 * `tsc --strict` fails on it against v6 *before* the codemod and passes *after* — see
 * `src/codemod/__e2e__/run.sh`.
 *
 * @format
 */

import React from 'react';
import {
  ImageProps,
  StyleSheet,
} from 'react-native';
import {
  ApplicationProvider,
  Button,
  Calendar,
  Icon,
  IconRegistry,
  Input,
  Layout,
  MenuGroup,
  Select,
  Text,
  ViewPager,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { ThemeStyleType } from '@eva-design/dss';

/**
 * Use any valid `name` property from eva icons (e.g `github`, or `heart-outline`)
 * https://akveo.github.io/eva-icons
 */
const HeartIcon = (props?: Partial<ImageProps>): React.ReactElement<ImageProps> => (
  <Icon
    {...props}
    name='heart'
  />
);

export default (): React.ReactElement => {
  // Group A: v6 exports a matching ref type.
  const inputRef = React.useRef<Input>(null);
  const selectRef: React.RefObject<Select> = React.createRef();

  // Group A′: the v5 type argument has to be dropped — `IconRef` is not generic.
  const iconRef = React.useRef<Icon<Partial<ImageProps>>>();

  // Group B: the v6 ref type is generic too, so the argument is carried across.
  const calendarRef = React.useRef<Calendar>(null);

  // Group C: `ViewPagerRef` is real but v6 does not export it.
  const pagerRef = React.useRef<ViewPager>(null);

  // Group E: still a class in v6. This must survive untouched.
  const menuGroupRef = React.useRef<MenuGroup>(null);

  const styleType: ThemeStyleType = {} as ThemeStyleType;

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider
        {...eva}
        theme={eva.light}
      >
        <Layout style={styles.container}>
          <Text
            style={styles.text}
            category='h1'
          >
            Welcome to UI Kitten 😻
          </Text>
          <Input ref={inputRef} />
          <Select ref={selectRef} />
          <Icon
            ref={iconRef}
            name='star'
          />
          <Calendar ref={calendarRef} />
          <ViewPager ref={pagerRef} />
          <MenuGroup
            ref={menuGroupRef}
            title='Group'
          />
          <Button
            style={styles.likeButton}
            accessoryLeft={HeartIcon}
          >
            LIKE
          </Button>
          <Text>{Object.keys(styleType).length}</Text>
        </Layout>
      </ApplicationProvider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  likeButton: {
    marginVertical: 16,
  },
});
