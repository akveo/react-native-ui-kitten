import {
  all,
  AllOfProps,
  allWithRest,
  AllWithRestProps,
  Props,
} from './props.service';

describe('@props: service checks', () => {

  const json = (value: any): string => JSON.stringify(value);

  const props: Props = {
    backgroundColor: 'black',
    color: 'white',
    fontSize: 32,
  };

  const textProps: string[] = [
    'color',
    'fontSize',
  ];

  describe('* all', () => {

    it('* non-null', () => {
      const retrievedProps: AllOfProps = all(props, textProps);

      expect(json(retrievedProps)).toEqual(json({
        color: 'white',
        fontSize: 32,
      }));
    });

    it('* nullable', () => {
      const retrievedProps: AllOfProps = all(undefined, textProps);

      expect(json(retrievedProps)).toEqual(json({}));
    });

  });

  describe('* allWithRest', () => {

    it('* non-null', () => {
      const retrievedProps: AllWithRestProps = allWithRest(props, textProps);

      const { rest, ...allOf } = retrievedProps;

      expect(json(allOf)).toEqual(json({
        color: 'white',
        fontSize: 32,
      }));

      expect(json(rest)).toEqual(json({
        backgroundColor: 'black',
      }));
    });

    it('* nullable', () => {
      const retrievedProps: AllWithRestProps = allWithRest(undefined, textProps);

      expect(json(retrievedProps)).toEqual(json({
        rest: {},
      }));
    });

  });

});
