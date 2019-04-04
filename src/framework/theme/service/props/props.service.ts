export interface Props {
  [key: string]: any;
}

export interface RestProps {
  rest?: Partial<Props>;
}

export type AllOfProps = Partial<Props>;

export type AllWithRestProps = Partial<Props> & RestProps;

/**
 * Retrieves all props included in `from` array
 *
 * @param source (Props) - source object
 * @param from (string[]) - array of keys needed to retrieve from `source`
 *
 * @return (Partial<Props>) - object with keys contained in `from` array
 */
export function all(source: Props | undefined, from: string[]): AllOfProps {
  if (!source) {
    return {};
  }

  return from.reduce((acc: Partial<AllOfProps>, prop: string): Partial<AllOfProps> => {
    return { ...acc, [prop]: source[prop] };
  }, {});
}

/**
 * Retrieves all props included in `from` array, rest props includes in under the `rest` key
 */
export function allWithRest(source: Props | undefined, from: string[]): AllWithRestProps {
  if (!source) {
    return { rest: {} };
  }

  return Object.keys(source).reduce((acc: Partial<AllWithRestProps>, prop: string): Partial<AllWithRestProps> => {
    const { rest, ...allOf } = acc;

    if (from.includes(prop)) {
      return { ...allOf, [prop]: source[prop], rest };
    }

    return { ...allOf, rest: { ...rest, [prop]: source[prop] } };
  }, {});
}
