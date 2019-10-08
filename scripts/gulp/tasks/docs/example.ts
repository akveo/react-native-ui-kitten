import {
  Project,
  SourceFile,
} from 'ts-morph';
import * as fs from 'fs';

const glob = require('glob');

const SHOWCASE_KEY_WORD: string = 'Showcase';

export function generateDocsNavigation() {
  const project = new Project();
  const navigationFile: SourceFile = project
    .addExistingSourceFile('src/playground/src/navigation/navigation.component.tsx');
  const statements = navigationFile.getStructure().statements;
  const showcasesNames: string[] = getShowcasesNames();
  const showcasesRoutes: string[] = getShowcasesRoutes(showcasesNames);

  if (statements) {
    // @ts-ignore
    statements = statements.map((statement: any) => {
      if (statement.moduleSpecifier === '../ui/screen') {
        const showcasesImports = getShowcasesImportsStructure(showcasesNames);
        statement.namedImports = statement.namedImports.concat(showcasesImports);
      }
      const isRoutesObject: boolean =
        statement.declarations &&
        statement.declarations.length !== 0 &&
        statement.declarations[0].name === 'routes';
      if (isRoutesObject) {
        const existingRoutesString: string = statement.declarations[0].initializer.split('}')[0];
        statement.declarations[0].initializer =
          existingRoutesString + showcasesRoutes.join(',') + '}';
      }

      return statement;
    });
  }

  const sourceFile = project.createSourceFile(
    'src/playground/src/navigation/navigation.component.tsx',
    {
      statements: statements,
    },
    {
      overwrite: true,
    },
  );
  sourceFile.save();
}

function getShowcasesNames() {
  return glob.sync('src/playground/src/ui/screen/documentationExamples/**/*.tsx')
    .map((path: string) => {
      const code: string = fs.readFileSync(path, 'utf8');
      return code
        .split(' ')
        .filter((item: string) => item.includes(SHOWCASE_KEY_WORD))[0];
    });
}

function getShowcasesImportsStructure(names: string[]): { kind: number; name: string; }[] {
  return names.map((name: string) => {
    return {
      name: name,
      kind: 15,
    };
  });
}

function getShowcasesRoutes(names: string[]): string[] {
  return names.map((name: string) => {
    const propName: string = name.replace(SHOWCASE_KEY_WORD, '');
    return `['${propName}']: () => sharingHeightContainer(${name}, '${propName}')\n`;
  });
}
