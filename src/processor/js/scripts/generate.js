"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const processor_1 = require("../src/processor");
const json = (input) => JSON.stringify(input, null, 2);
const schemaProcessor = new processor_1.SchemaProcessor();
function generateMappingPackage(source) {
    const name = path_1.default.basename(source);
    const generatedDir = path_1.default.resolve('packages', `${name}-js`);
    const { mapping: schema } = require(source);
    const style = schemaProcessor.process(schema);
    const indexOutput = [
        `import { ThemeStyleType } from '@ui-kitten/processor/dss';`,
        `export const mapping: ThemeStyleType = ${json(style)};`,
    ].join('\n\n');
    const packageOutput = json({
        name: `@ui-kitten/${name}-js`,
        version: '0.0.1',
        license: 'MIT',
        author: 'akveo <contact@akveo.com>',
        homepage: 'https://github.com/eva-design/eva#readme',
        repository: 'git+https://github.com/eva-design/eva.git',
        bugs: {
            url: 'https://github.com/eva-design/eva/issues',
        },
    });
    if (!fs_1.existsSync(generatedDir)) {
        fs_1.mkdirSync(generatedDir);
    }
    fs_1.writeFileSync(path_1.default.resolve(generatedDir, 'index.ts'), indexOutput);
    fs_1.writeFileSync(path_1.default.resolve(generatedDir, 'package.json'), packageOutput);
}
exports.generateMappingPackage = generateMappingPackage;
//# sourceMappingURL=generate.js.map