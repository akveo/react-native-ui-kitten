import { ReactElement } from 'react';

export type ChildrenProp<Element extends ReactElement = ReactElement> = Element | Element[];
export type ChildrenWithProps<Props = {}> = ChildrenProp<ReactElement<Props>>;

export type EvaStatus = 'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control' | string;
export type EvaSize = 'tiny' | 'small' | 'medium' | 'large' | 'giant' | string;
export type EvaInputSize = 'small' | 'medium' | 'large' | string;

export class IndexPath {

  constructor(readonly row: number, readonly section?: number) {
  }

  get groupIndex(): IndexPath {
    return this.section >= 0 && new IndexPath(this.row);
  }

  public toString(): string {
    if (this.section >= 0) {
      return `${this.row + 1}.${this.section + 1}`;
    }
    return (this.row + 1).toString();
  }

  public equals = (other: IndexPath): boolean => {
    if (!other) {
      return false;
    }
    return this.row === other.row && this.section === other.section;
  };
}
