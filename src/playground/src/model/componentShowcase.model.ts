export interface ComponentShowcase {
  title: string;
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
