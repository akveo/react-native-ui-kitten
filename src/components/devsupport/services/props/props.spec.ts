import {
  AllOfProps,
  AllWithRestProps,
  Props,
  PropsService,
} from './props.service';

describe('@props: service checks', () => {

  const props: Props = {
    backgroundColor: 'black',
    color: 'white',
    fontSize: 32,
  };

  const textProps: string[] = [
    'color',
    'fontSize',
  ];

  it('should retrieve all text props', () => {
    const retrievedProps: AllOfProps = PropsService.all(props, textProps);

    expect(retrievedProps).toEqual({
      color: 'white',
      fontSize: 32,
    });
  });

  it('should retrieve all text props and move rest props under `rest` key', () => {
    const retrievedProps: AllWithRestProps = PropsService.allWithRest(props, textProps);
    const { rest, ...allOf } = retrievedProps;

    expect(allOf).toEqual({
      color: 'white',
      fontSize: 32,
    });

    expect(rest).toEqual({
      backgroundColor: 'black',
    });
  });

  it('should be able to work with falsy objects', () => {
    const allRetrievedProps: AllOfProps = PropsService.all(undefined, textProps);
    const allWithRestRetrievedProps: AllWithRestProps = PropsService.allWithRest(undefined, textProps);

    expect(allRetrievedProps).toEqual({});
    expect(allWithRestRetrievedProps).toEqual({
      rest: {},
    });
  });

});
