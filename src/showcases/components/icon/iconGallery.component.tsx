import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, useTheme } from '@ui-kitten/components';
import { evaIcons } from '@ui-kitten/eva-icons';

/**
 * Every Eva icon, 100 per page, so that a parity sweep can screenshot the whole set one screen at a
 * time. Pages are separate showcase sections (`IconGallery1` ... `IconGallery5`).
 *
 * The grids are hidden from accessibility: the sweep reads screenshots, and 500 icons would push
 * the accessibility tree past the agent-device snapshot budget (1500 nodes), which cuts off
 * everything enumerated after the root view, including presented modals.
 */
const ICON_NAMES: string[] = Object.keys(evaIcons);
const PAGE_SIZE = 100;

export const ICON_GALLERY_PAGES = Math.ceil(ICON_NAMES.length / PAGE_SIZE);

const IconGalleryPage = ({ page }: { page: number }): React.ReactElement => {
  const theme = useTheme();
  const names = ICON_NAMES.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <View
      style={styles.grid}
      testID={`icon-gallery-${page + 1}`}
      accessibilityElementsHidden={true}
      importantForAccessibility='no-hide-descendants'
    >
      {names.map((name) => (
        <Icon
          key={name}
          name={name}
          style={styles.icon}
          fill={theme['text-basic-color']}
          testID={`icon-gallery-${name}`}
        />
      ))}
    </View>
  );
};

export const IconGallery1Showcase = (): React.ReactElement => <IconGalleryPage page={0} />;
export const IconGallery2Showcase = (): React.ReactElement => <IconGalleryPage page={1} />;
export const IconGallery3Showcase = (): React.ReactElement => <IconGalleryPage page={2} />;
export const IconGallery4Showcase = (): React.ReactElement => <IconGalleryPage page={3} />;
export const IconGallery5Showcase = (): React.ReactElement => <IconGalleryPage page={4} />;

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  icon: {
    width: 28,
    height: 28,
    margin: 8,
  },
});
