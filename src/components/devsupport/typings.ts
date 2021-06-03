import { ReactElement } from 'react';

export type ChildrenProp<Element extends ReactElement = ReactElement> = Element | Element[];
export type ChildrenWithProps<Props = {}> = ChildrenProp<ReactElement<Props>>;


/*
 * https://github.com/microsoft/TypeScript/issues/29729#issuecomment-505826972
 */
export type LiteralUnion<T extends U, U = string> = T | (U & {});

export type EvaStatus = LiteralUnion<'basic' | 'primary' | 'success' | 'info' | 'warning' | 'danger' | 'control'>;
export type EvaSize = LiteralUnion<'tiny' | 'small' | 'medium' | 'large' | 'giant'>;
export type EvaInputSize = LiteralUnion<'small' | 'medium' | 'large'>;

export class IndexPath {

  constructor(readonly row: number, readonly section?: number) {
  }

  get groupIndex(): IndexPath {
    return this.section >= 0 && new IndexPath(this.row);
  }

  public toString(): string {
    if (this.section >= 0) {
      return `${this.section + 1}.${this.row + 1}`;
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

/*
 * @see https://github.com/piotrwitek/utility-types#overwritet-u
 */
export type Overwrite<T extends object, U extends object, I = Diff<T, U> & Intersection<U, T>> = Pick<I, keyof I>;

/*
 * @see https://github.com/piotrwitek/utility-types#intersectiont-u
 */
export type Intersection<T extends object, U extends object> =
  Pick<T, Extract<keyof T, keyof U> & Extract<keyof U, keyof T>>;

/*
 * @see https://github.com/piotrwitek/utility-types#setdifferencea-b-same-as-exclude
 */
export type SetDifference<A, B> = A extends B ? never : A;

/*
 * @see https://github.com/piotrwitek/utility-types#difft-u
 */
export type Diff<T extends object, U extends object> = Pick<T, SetDifference<keyof T, keyof U>>;
