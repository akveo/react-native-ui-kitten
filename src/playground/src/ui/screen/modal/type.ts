import { StyleSheet } from 'react-native';
import {
  ComponentShowcase,
  ComponentShowcaseItem,
  ComponentShowcaseSection,
} from '../common/type';

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#636e80',
    width: 200,
    height: 200,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  backdropStyle: {
    backgroundColor: 'black',
    opacity: 0.5,
  },
  customModalPosition: {
    left: 100,
    top: 100,
  },
});

const defaultModal: ComponentShowcaseItem = {
  title: 'Default',
  props: {},
};

const defaultSection: ComponentShowcaseSection = {
  title: 'Default Modal',
  items: [
    defaultModal,
  ],
};

const customStyledModal: ComponentShowcaseItem = {
  title: 'Styled Modal',
  props: {
    style: styles.modal,
  },
};

const customStyledModalBackdrop: ComponentShowcaseItem = {
  title: 'Styled Backdrop',
  props: {
    style: styles.modal,
    backdropStyle: styles.backdropStyle,
  },
};

const customModalPosition: ComponentShowcaseItem = {
  title: 'Custom Position',
  props: {
    style: [ styles.customModalPosition, styles.modal ],
  },
};

const customStyledSection: ComponentShowcaseSection = {
  title: 'Styling',
  items: [
    customStyledModal,
    customStyledModalBackdrop,
    customModalPosition,
  ],
};

const customModalBackdropAllowed: ComponentShowcaseItem = {
  title: 'Close On Backdrop: true',
  props: {
    allowBackdrop: true,
    style: styles.modal,
    backdropStyle: styles.backdropStyle,
  },
};

const customModalBackdropNotAllowed: ComponentShowcaseItem = {
  title: 'Close On Backdrop: false',
  props: {
    closeOnBackdrop: false,
    style: styles.modal,
    backdropStyle: styles.backdropStyle,
  },
};

const customBackdropAllowingSection: ComponentShowcaseSection = {
  title: 'Backdrop Closing Permissions',
  items: [
    customModalBackdropAllowed,
    customModalBackdropNotAllowed,
  ],
};

export const modalShowcase: ComponentShowcase = {
  sections: [
    defaultSection,
    customStyledSection,
    customBackdropAllowingSection,
  ],
};
