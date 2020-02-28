import Path from 'path';
import Fs from 'fs';
import Rimraf from 'rimraf';
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
    evaPackage: '@eva-design/eva',
  };

  afterAll(() => {
    const evaPackageIndexPath: string = Path.resolve(`node_modules/${evaConfig.evaPackage}/index.js`);
    const generatedFilePath: string = Path.resolve(`node_modules/${evaConfig.evaPackage}/generated.json`);

    const currentExports = Fs.readFileSync(evaPackageIndexPath, { encoding: 'utf8' });
    const [originalExports] = currentExports.split('exports.styles');

    Fs.writeFileSync(evaPackageIndexPath, originalExports);
    Rimraf.sync(generatedFilePath);

    jest.resetAllMocks();
  });

  it('should bootstrap @eva-design/eva package', () => {
    BootstrapService.run(evaConfig);

    const outputString = Fs.readFileSync(`node_modules/${evaConfig.evaPackage}/generated.json`).toString();
    const outputAsObject = JSON.parse(outputString);

    expect(outputAsObject.checksum).toBeTruthy();
    expect(outputAsObject.checksum).toEqual('default');
    expect(outputAsObject.styles).toBeTruthy();
  });

  it('should bootstrap @eva-design/eva package with custom styles', () => {
    BootstrapService.run({ ...evaConfig, customMappingPath: 'src/metro-config/tests/custom-mapping.json' });

    const outputString = Fs.readFileSync(`node_modules/${evaConfig.evaPackage}/generated.json`).toString();
    const outputAsObject = JSON.parse(outputString);

    expect(outputAsObject.checksum).toBeTruthy();
    expect(outputAsObject.checksum).not.toEqual('default');
    expect(outputAsObject.styles.StatusBar).toBeTruthy();
  });

});
