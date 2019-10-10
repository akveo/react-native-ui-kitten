import {
  Project,
  SourceFile,
} from 'ts-morph';
import * as fs from 'fs';

const glob = require('glob');

const SHOWCASE_KEY_WORD: string = 'Showcase';

export function generateDocsNavigation() {
  const project: Project = new Project();
  generateShowcasesExportsDocumentationExamples(project);
  generateShowcasesExportsScreens(project);
  generateNavigationFile(project);
}

function generateNavigationFile(project: Project) {
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

function generateShowcasesExportsDocumentationExamples(project: Project) {
  project.createWriter();
  const showcasesDirs: string[] = fs
    .readdirSync('src/playground/src/ui/screen/showcases', { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const indexContent: string = showcasesDirs
    .map((dirName: string) => {
      return `export * from './${dirName}';\n`;
    })
    .join()
    .replace(/,/g, '');
  const indexFile = project.createSourceFile(
    'src/playground/src/ui/screen/showcases/index.ts',
    indexContent,
    { overwrite: true },
  );
  indexFile.save();
}

function generateShowcasesExportsScreens(project: Project) {
  const indexFile: SourceFile = project
    .addExistingSourceFile('src/playground/src/ui/screen/index.ts');
  const showcasesNames: string[] = getShowcasesNames();

  const indexStatements = indexFile.getStructure().statements;

  const showcasesExportStatement = {
    kind: 9,
    moduleSpecifier: './showcases',
    namedExports: showcasesNames.map((name: string) => ({
      kind: 10,
      name: name,
    })),
  };

  // @ts-ignore
  indexStatements.push(showcasesExportStatement);
  const sourceFile = project.createSourceFile(
    'src/playground/src/ui/screen/index.ts',
    {
      statements: indexStatements,
    },
    {
      overwrite: true,
    },
  );
  sourceFile.save();
}

function getShowcasesNames() {
  return glob.sync('src/playground/src/ui/screen/showcases/**/*.tsx')
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
