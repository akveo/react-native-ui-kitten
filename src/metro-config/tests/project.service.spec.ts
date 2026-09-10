import Path from 'path';
import ProjectService from '../services/project.service';
import { createTempProject, spyOnConsole, TempProject } from './helpers/temp-project';

describe('@project-service: path resolution', () => {

  let project: TempProject;

  beforeEach(() => {
    project = createTempProject({ packages: [] });
    spyOnConsole();
  });

  afterEach(() => {
    project.cleanup();
    jest.restoreAllMocks();
  });

  it('should resolve relative paths against process.cwd(), not the module location', () => {
    expect(ProjectService.resolvePath('./custom-mapping.json')).toEqual(Path.join(project.root, 'custom-mapping.json'));
    expect(ProjectService.resolvePath('node_modules/@ui-kitten/eva')).toEqual(Path.join(project.root, 'node_modules/@ui-kitten/eva'));
    expect(ProjectService.resolvePath('./custom-mapping.json').startsWith(__dirname)).toBe(false);
  });

  it('should follow process.chdir', () => {
    const otherProject = createTempProject({ packages: [] });

    try {
      expect(ProjectService.resolvePath('a.json')).toEqual(Path.join(otherProject.root, 'a.json'));
    } finally {
      otherProject.cleanup();
    }

    expect(ProjectService.resolvePath('a.json')).toEqual(Path.join(project.root, 'a.json'));
  });

  it('should not resolve an absent path to the project root', () => {
    expect(ProjectService.resolvePath(undefined)).toBeNull();
    expect(ProjectService.resolvePath(null)).toBeNull();
    expect(ProjectService.resolvePath('')).toBeNull();
  });

  it('should return null for modules that are not there', () => {
    expect(ProjectService.requireModule('node_modules/@ui-kitten/eva')).toBeNull();
    expect(ProjectService.requireActualModule('node_modules/@ui-kitten/eva/index.js')).toBeNull();
    expect(ProjectService.requireActualModule('')).toBeNull();
    expect(ProjectService.hasModule('node_modules/@ui-kitten/eva')).toBe(false);
  });

  it('should read files that exist in the project', () => {
    project.writeFile('some.json', '{"a":1}');

    expect(ProjectService.requireActualModule('./some.json')).toEqual('{"a":1}');
    expect(ProjectService.requireModule<{ a: number }>('./some.json')).toEqual({ a: 1 });
    expect(ProjectService.hasModule('./some.json')).toBe(true);
  });
});
