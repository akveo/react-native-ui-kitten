interface EvaTheme {
  [key: string]: ThemeVariableValue;
}

type ThemeVariableValue = string | number;

export interface DocThemes {
  [themeName: string]: DocTheme;
}

export interface DocTheme {
  name: string;
  parent: string | null;
  data: DocThemeData;
}

export interface DocThemeData {
  [variableName: string]: DocThemeVariableMeta;
}

export interface DocThemeVariableMeta {
  name: string;
  value: string | number;
  parents: DocThemeVariable[];
  childs: DocThemeVariable[];
}

export interface DocThemeVariable {
  theme: string;
  prop: string;
}

type EvaPackageName = 'eva' | 'material';
type EvaThemeName = 'light' | 'dark';
const THEME_REF_KEY: string = '$';

/**
 * @param {EvaPackageName} evaPackage - Eva package name.
 * @param {EvaThemeName[]} themes - Eva theme names. Should have the same name as $themeName.json file (e.g light.json)
 * @returns themes object structured to be displayed in documentation
 */
export const createDocThemesForPackage = (evaPackage: EvaPackageName, ...themes: EvaThemeName[]): DocThemes => {
  return themes.reduce((acc: DocThemes, themeName: EvaThemeName): DocThemes => {
    return { ...acc, [`${evaPackage} ${themeName}`]: createTheme(evaPackage, themeName) };
  }, {});
};

const createTheme = (evaPackage: EvaPackageName, themeName: EvaThemeName): DocTheme  => {
  const theme: EvaTheme = require(`@eva-design/${evaPackage}/themes/${themeName}`);
  return { name: themeName, parent: null, data: createThemeData(theme, themeName) };
};

const createThemeData = (theme: EvaTheme, themeName: EvaThemeName): DocThemeData => {
  return Object.keys(theme).reduce((acc: DocThemeData, themeVariableName: string): DocThemeData => {
    return { ...acc, [themeVariableName]: createVariableMeta(theme, themeName, themeVariableName) };
  }, {});
};

const createVariableMeta = (theme: EvaTheme, themeName: string, themeVariableName: string): DocThemeVariableMeta => {
  const parentsKeys: string[] = findVariableParentsRecursive(theme, themeVariableName, []);
  const childrenKeys: string[] = findVariableChildren(theme, themeVariableName);

  return {
    name: themeVariableName,
    value: findVariableValueRecursive(theme, themeVariableName),
    parents: createThemeVariables(themeName, parentsKeys),
    childs: createThemeVariables(themeName, childrenKeys),
  };
};

const findVariableValueRecursive = (theme: EvaTheme, themeVariableName: string): ThemeVariableValue => {
  if (isReferencingKey(themeVariableName)) {
    const themeKey: string = toThemeKey(themeVariableName);
    return findThemeValue(theme, themeKey);
  }

  return findThemeValue(theme, themeVariableName);
};

const findVariableParentsRecursive = (theme: EvaTheme, themeVariableName: string, parents: string[] = []): string[] => {
  const variableValue: ThemeVariableValue = theme[themeVariableName];

  if (isReferencingKey(variableValue)) {
    const themeKey: string = toThemeKey(variableValue);
    return findVariableParentsRecursive(theme, themeKey, [...parents, themeKey]);
  }

  return parents;
};

const findVariableChildren = (theme: EvaTheme, themeVariableName: string): string[] => {
  return Object.keys(theme).filter((comparableThemeKey: string): boolean => {
    const themeValue: ThemeVariableValue = theme[comparableThemeKey];
    return isReferencingKey(themeValue) && themeVariableName === toThemeKey(themeValue);
  });
};

const findThemeValue = (theme: EvaTheme, name: string): ThemeVariableValue => {
  const value: ThemeVariableValue | undefined = theme[name];

  if (isReferencingKey(value)) {
    const themeKey: string = toThemeKey(value);
    return findThemeValue(theme, themeKey);
  }

  return value;
};

const isReferencingKey = (value: ThemeVariableValue): boolean  => {
  return `${value}`.startsWith(THEME_REF_KEY);
};

const toThemeKey = (value: ThemeVariableValue): string => {
  return `${value}`.substring(1);
};

const createThemeVariables = (theme: string, keys: string[]): DocThemeVariable[] => {
  return keys.map((key: string): DocThemeVariable => {
    return { theme, prop: key };
  });
};
