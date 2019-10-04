export interface StyleType {
  [key: string]: any;
}

export enum Interaction {
  HOVER = 'hover',
  ACTIVE = 'active',
  FOCUSED = 'focused',
  INDETERMINATE = 'indeterminate',
  VISIBLE = 'visible',
}

export enum State {
  CHECKED = 'checked',
  SELECTED = 'selected',
  DISABLED = 'disabled',
}
