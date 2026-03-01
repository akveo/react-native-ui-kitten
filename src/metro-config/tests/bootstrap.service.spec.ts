import Path from 'path';
import Fs from 'fs';
import { rimrafSync } from 'rimraf';
import BootstrapService from '../services/bootstrap.service';
import { EvaConfig } from '../services/eva-config.service';

/*
 * We need to mock all calls to path so that it will be redirected to the root dir,
 * E.g `some_module` => `react-native-ui-kitten/some_module`
 */
jest.mock('path', () => {
  const ActualPath = jest.requireActual('path');
  return {
    ...ActualPath,
    resolve: (...pathSegments: string[]): string => {
      const lastPathSegment = pathSegments[pathSegments.length - 1];
      return ActualPath.resolve(lastPathSegment);
    },
  };
});

describe('@bootstrap-service: instance checks', () => {

  const evaConfig: EvaConfig = {
    evaPackage: '@ui-kitten/eva',
  };

  // New cache location outside of node_modules packages
  const CACHE_DIR = 'node_modules/.cache/ui-kitten';
  const getCacheFilePath = (evaPackage: string): string => {
    const packageName = evaPackage.replace('@ui-kitten/', '');
    return `${CACHE_DIR}/${packageName}-generated.json`;
  };

  // Store original content to restore after each test
  let originalEvaIndexContent: string;
  const evaPackageIndexPath: string = Path.resolve(`node_modules/${evaConfig.evaPackage}/index.js`);

  beforeAll(() => {
    // Save original content before any tests run
    try {
      originalEvaIndexContent = Fs.readFileSync(evaPackageIndexPath, { encoding: 'utf8' });
    } catch {
      originalEvaIndexContent = '';
    }
  });

  afterEach(() => {
    // Restore original content after each test
    if (originalEvaIndexContent) {
      // Remove any added exports.styles line
      const cleanContent = originalEvaIndexContent.split('\n\nexports.styles')[0];
      Fs.writeFileSync(evaPackageIndexPath, cleanContent);
    }

    // Clean up generated cache files
    const generatedFilePath: string = Path.resolve(getCacheFilePath(evaConfig.evaPackage));
    if (Fs.existsSync(generatedFilePath)) {
      rimrafSync(generatedFilePath);
    }
  });

  afterAll(() => {
    // Final cleanup
    if (originalEvaIndexContent) {
      const cleanContent = originalEvaIndexContent.split('\n\nexports.styles')[0];
      Fs.writeFileSync(evaPackageIndexPath, cleanContent);
    }

    const generatedFilePath: string = Path.resolve(getCacheFilePath(evaConfig.evaPackage));
    if (Fs.existsSync(generatedFilePath)) {
      rimrafSync(generatedFilePath);
    }

    const oldGeneratedPath = Path.resolve(`node_modules/${evaConfig.evaPackage}/generated.json`);
    if (Fs.existsSync(oldGeneratedPath)) {
      rimrafSync(oldGeneratedPath);
    }

    jest.resetAllMocks();
  });

  it('should bootstrap @ui-kitten/eva package', () => {
    BootstrapService.run(evaConfig);

    const cacheFilePath = getCacheFilePath(evaConfig.evaPackage);
    const outputString = Fs.readFileSync(cacheFilePath).toString();
    const outputAsObject = JSON.parse(outputString);

    expect(outputAsObject.checksum).toBeTruthy();
    expect(outputAsObject.checksum).toEqual('default');
    expect(outputAsObject.styles).toBeTruthy();
  });

  it('should bootstrap @ui-kitten/eva package with custom styles', () => {
    BootstrapService.run({ ...evaConfig, customMappingPath: 'src/metro-config/tests/custom-mapping.json' });

    const cacheFilePath = getCacheFilePath(evaConfig.evaPackage);
    const outputString = Fs.readFileSync(cacheFilePath).toString();
    const outputAsObject = JSON.parse(outputString);

    expect(outputAsObject.checksum).toBeTruthy();
    expect(outputAsObject.checksum).not.toEqual('default');
    expect(outputAsObject.styles.StatusBar).toBeTruthy();
  });

  it('should store cache in node_modules/.cache/ui-kitten directory', () => {
    BootstrapService.run(evaConfig);

    const cacheFilePath = getCacheFilePath(evaConfig.evaPackage);

    // Verify the cache is in the new location
    expect(Fs.existsSync(cacheFilePath)).toBe(true);

    // Verify the old location doesn't have the file
    const oldLocation = `node_modules/${evaConfig.evaPackage}/generated.json`;
    expect(Fs.existsSync(oldLocation)).toBe(false);
  });

  it('should create cache directory if it does not exist', () => {
    // Remove the cache directory if it exists
    if (Fs.existsSync(CACHE_DIR)) {
      rimrafSync(CACHE_DIR);
    }

    BootstrapService.run(evaConfig);

    // Verify the cache directory was created
    expect(Fs.existsSync(CACHE_DIR)).toBe(true);
  });

});
