import { TypeManager } from '../typeManager';

describe('typeManger', () => {
  it('Should create a new style', () => {
    const style = {
      fontFamily: theme => theme.fonts.family.bold,
      backgroundColor: 'transparent',
    };

    TypeManager.setType('RkText', 'style', style);

    expect(TypeManager.userTypes.RkText.style).toEqual(style);
  });

  it('Should create style from parent', () => {
    const parentStyle = {
      fontSize: 30,
      backgroundColor: 'transparent',
    };

    const childStyle = {
      fontSize: 20,
    };

    TypeManager.setType('RkText', 'parentStyle', parentStyle);
    TypeManager.setType('RkText', 'childStyle', childStyle, 'parentStyle');

    expect(TypeManager.userTypes.RkText.parentStyle).toEqual(parentStyle);
    expect(TypeManager.userTypes.RkText.childStyle).toEqual({
      ...parentStyle,
      ...childStyle,
    });
  });

  it('Should create style from parent that has nested children', () => {
    const parentStyle = {
      fontSize: 30,
      backgroundColor: 'transparent',
      text: {
        textAlign: 'center',
      },
    };

    const childStyle = {
      fontSize: 20,
    };

    TypeManager.setType('RkText', 'parentStyle', parentStyle);
    TypeManager.setType('RkText', 'childStyle', childStyle, 'parentStyle');

    expect(TypeManager.userTypes.RkText.parentStyle).toEqual(parentStyle);
    expect(TypeManager.userTypes.RkText.childStyle).toEqual({
      ...parentStyle,
      ...childStyle,
    });
  });

  it('Should create a nested style from parent', () => {
    const parentStyle = {
      fontSize: 30,
      backgroundColor: 'transparent',
    };

    const childStyle = {
      fontSize: 20,
      text: {
        textAlign: 'center',
      },
    };

    TypeManager.setType('RkText', 'parentStyle', parentStyle);
    TypeManager.setType('RkText', 'childStyle', childStyle, 'parentStyle');

    expect(TypeManager.userTypes.RkText.parentStyle).toEqual(parentStyle);
    expect(TypeManager.userTypes.RkText.childStyle).toEqual({
      ...parentStyle,
      ...childStyle,
    });
  });

  it('Should create a nested style from parent that has nested children', () => {
    const parentStyle = {
      fontSize: 30,
      backgroundColor: 'transparent',
      text: {
        textAlign: 'center',
      },
    };

    const childStyle = {
      fontSize: 20,
      text: {
        textAlign: 'center',
      },
    };

    TypeManager.setType('RkText', 'parentStyle', parentStyle);
    TypeManager.setType('RkText', 'childStyle', childStyle, 'parentStyle');

    expect(TypeManager.userTypes.RkText.parentStyle).toEqual(parentStyle);
    expect(TypeManager.userTypes.RkText.childStyle).toEqual({
      ...parentStyle,
      ...childStyle,
    });
  });
});
