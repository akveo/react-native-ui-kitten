import { ThemeType } from 'react-native-ui-kitten';

export interface ComponentShowcase {
  sections: ComponentShowcaseSection[];
}

export interface ComponentShowcaseSection {
  title?: string;
  items: ComponentShowcaseItem[];
}

export interface ComponentShowcaseItem {
  title?: string;
  props: any;
}

export interface ComponentShowcaseSetting {
  propertyName: string;
  value: any;
  description?: string;
}

export interface ShowcaseThemes {
  [name: string]: ThemeType;
}
