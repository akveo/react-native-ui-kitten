import * as fs from 'fs';
import * as path from 'path';
import { pascal } from 'change-case';

interface ShowcaseMap {
  [componentName: string]: ComponentShowcase;
}

interface ComponentShowcase {
  showcases: ShowcaseInfo[];
}

interface ShowcaseInfo {
  name: string;
  routeName: string;
  path: string;
}

interface ShowcaseRouteMap {
  [showcaseName: string]: string;
}

export const createDocAppNavigation = (showcasePath: string): string => {
  const showcaseDirs: string[] = fs.readdirSync(showcasePath).filter((dirOrFile: string) => {
    return !dirOrFile.endsWith('.tsx');
  });

  const showcaseMap: ShowcaseMap = showcaseDirs.reduce((map, component: string) => {
    return { ...map, [component]: createComponentShowcase(showcasePath, component) };
  }, {});

  const showcaseRouteMap: ShowcaseRouteMap = Object.keys(showcaseMap).reduce((routes, component: string) => {
    const componentShowcaseRouteMap: ShowcaseRouteMap = createShowcaseRouteMap(showcaseMap, component);
    return { ...routes, ...componentShowcaseRouteMap };
  }, {});

  const importStatements: string[] = Object.keys(showcaseMap).reduce((statements, component: string) => {
    const componentImportStatements: string[] = createShowcaseImportStatements(showcaseMap, component);
    return [...statements, componentImportStatements.join('\n')];
  }, []);

  const routesStatement: string = createRoutesStatement(showcaseRouteMap);

  return createOutput(importStatements, [routesStatement]);
};

const createShowcaseRouteMap = (map: ShowcaseMap, component: string): ShowcaseRouteMap => {
  return map[component].showcases.reduce((componentShowcases, showcaseInfo: ShowcaseInfo) => {
    const container = showcaseInfo.name.endsWith(`ThemingShowcase`) ? 'ShowcaseThemingIFrame' : 'ShowcaseIFrame';
    const showcaseScreenStatement = `() => ${container}(${showcaseInfo.name}, '${showcaseInfo.routeName}')`;
    return { ...componentShowcases, [showcaseInfo.routeName]: showcaseScreenStatement };
  }, {});
};

const createShowcaseImportStatements = (map: ShowcaseMap, component: string): string[] => {
  return map[component].showcases.map((showcaseInfo: ShowcaseInfo): string => {
    const platformComponentPath: string = path.parse(showcaseInfo.path).name;
    return `import { ${showcaseInfo.name} } from '../components/${component}/${platformComponentPath}';`;
  });
};

const createComponentShowcase = (showcasePath: string, component: string): ComponentShowcase => {
  const showcaseFiles: string[] = fs.readdirSync(path.resolve(showcasePath, component));

  return showcaseFiles.reduce((showcaseAcc: ComponentShowcase, showcaseFile: string) => {
    const routeName: string = pascal(`${showcaseFile.split('.component.tsx')[0]}`);
    const showcaseInfo: ShowcaseInfo = { name: `${routeName}Showcase`, routeName, path: showcaseFile };
    return { ...showcaseAcc, showcases: [...showcaseAcc.showcases, showcaseInfo] };
  }, { showcases: [] });
};

const createOutput = (imports: string[], statements: string[]): string => {
  return [
    'import React from \'react\';',
    'import { createBrowserApp } from \'@react-navigation/web\';',
    'import { createStackNavigator } from \'react-navigation-stack\';',
    'import { ShowcaseIFrame } from \'../components/showcaseIFrame.component\';',
    'import { ShowcaseThemingIFrame } from \'../components/showcaseThemingIFrame.component\';',
    ...imports,
    '',
    ...statements,
    '',
    `const AppStack = createStackNavigator(routes, { headerMode: 'none' });`,
    `export const AppNavigator = createBrowserApp(AppStack, { history: 'hash' });`,
  ].join('\n');
};

const createRoutesStatement = (map: ShowcaseRouteMap): string => {
  return `const routes = ${JSON.stringify(map, null, 2).replace(/"/g, '')};`;
};
