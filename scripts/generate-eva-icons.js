#!/usr/bin/env node
/**
 * Generates `src/eva-icons/icons/*.ts` from the SVG files published in the `eva-icons` npm
 * package (https://github.com/akveo/eva-icons, MIT, Copyright (c) 2018 Akveo).
 *
 * Every icon becomes one module exporting plain data: the SVG child elements as
 * `[tag, attributes]` tuples plus the root `viewBox` when it is not the default `0 0 24 24`.
 * A single React component in `@ui-kitten/eva-icons` renders that data with react-native-svg,
 * so icon modules stay inert and consumers can import only the icons they use.
 *
 * Eva's SVGs are Illustrator exports normalised by svgo: two nested `<g>` wrappers, one
 * invisible `opacity="0"` rectangle or polyline that keeps the 24x24 bounding box for the sprite
 * pipeline, then the real shapes. The wrappers and the bounding-box shims are dropped here;
 * `viewBox` on the root already fixes the coordinate system.
 *
 * The output is committed. CI reruns this script and fails when the tree changes, so the files
 * always match the pinned `eva-icons` version. Run `yarn eva-icons:generate` after upgrading it.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { parseSync } = require('svgson');

const EVA_ROOT = path.dirname(require.resolve('eva-icons/package.json'));
const EVA_VERSION = require('eva-icons/package.json').version;
const OUTPUT_DIRECTORY = path.resolve(__dirname, '..', 'src', 'eva-icons', 'icons');
const DEFAULT_VIEW_BOX = '0 0 24 24';

/*
 * The elements Eva icons are drawn with, and the attributes each may carry. Anything else in an
 * SVG aborts the run: a new upstream element or attribute must be reviewed (and the renderer in
 * `evaIcon.component.tsx` taught about it) rather than silently dropped.
 */
const SHAPES = {
  path: { required: ['d'], optional: [] },
  rect: { required: ['width', 'height'], optional: ['x', 'y', 'rx', 'ry', 'transform'] },
  circle: { required: ['cx', 'cy', 'r'], optional: [] },
  polygon: { required: ['points'], optional: [] },
  polyline: { required: ['points'], optional: [] },
};
const NUMERIC_ATTRIBUTES = new Set(['x', 'y', 'width', 'height', 'rx', 'ry', 'cx', 'cy', 'r']);
const CONTAINER_ELEMENTS = new Set(['g']);
const IGNORED_ELEMENTS = new Set(['defs', 'style', 'title']);
const IGNORED_ATTRIBUTES = /^(id|class|data-.*|xmlns(:.*)?)$/;

const RESERVED_WORDS = new Set([
  'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do',
  'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 'function', 'if', 'import', 'in',
  'instanceof', 'new', 'null', 'return', 'super', 'switch', 'this', 'throw', 'true', 'try',
  'typeof', 'var', 'void', 'while', 'with', 'yield', 'let', 'static', 'implements', 'interface',
  'package', 'private', 'protected', 'public', 'await', 'arguments', 'eval',
]);

const HEADER = [
  '/**',
  ' * @license',
  ` * Generated from Eva Icons ${EVA_VERSION} (https://github.com/akveo/eva-icons).`,
  ' * Eva Icons is MIT licensed, Copyright (c) 2018 Akveo. See LICENSE in this package.',
  ' *',
  ' * Do not edit: run `yarn eva-icons:generate`.',
  ' */',
].join('\n');

const camelCase = (kebab) => kebab.replace(/-([a-z0-9])/g, (_, char) => char.toUpperCase());

const listSvgFiles = (directory) => {
  return fs.readdirSync(directory)
    .filter((file) => file.endsWith('.svg'))
    .map((file) => ({ name: file.slice(0, -'.svg'.length), file: path.join(directory, file) }));
};

const toAttributeValue = (name, value) => {
  if (!NUMERIC_ATTRIBUTES.has(name)) {
    return value;
  }
  const number = Number(value);
  if (!Number.isFinite(number) || String(number) !== value.replace(/^(-?)\./, '$10.')) {
    throw new Error(`attribute ${name}="${value}" is not a plain number`);
  }
  return number;
};

const convertShape = (element) => {
  const shape = SHAPES[element.name];
  const attributes = {};

  for (const [name, value] of Object.entries(element.attributes)) {
    if (IGNORED_ATTRIBUTES.test(name)) {
      continue;
    }
    if (!shape.required.includes(name) && !shape.optional.includes(name)) {
      throw new Error(`<${element.name}> carries unsupported attribute ${name}="${value}"`);
    }
    attributes[name] = toAttributeValue(name, value);
  }

  for (const name of shape.required) {
    if (!(name in attributes)) {
      throw new Error(`<${element.name}> is missing required attribute ${name}`);
    }
  }

  if (element.children.length > 0) {
    throw new Error(`<${element.name}> has children`);
  }

  return [element.name, attributes];
};

const collectNodes = (element, nodes) => {
  for (const child of element.children) {
    if (child.type !== 'element') {
      continue;
    }
    if (IGNORED_ELEMENTS.has(child.name)) {
      continue;
    }
    if (CONTAINER_ELEMENTS.has(child.name)) {
      const attributeNames = Object.keys(child.attributes).filter((name) => !IGNORED_ATTRIBUTES.test(name));
      if (attributeNames.length > 0) {
        throw new Error(`<g> carries attributes that would be lost: ${attributeNames.join(', ')}`);
      }
      collectNodes(child, nodes);
      continue;
    }
    if (!(child.name in SHAPES)) {
      throw new Error(`unsupported element <${child.name}>`);
    }
    if (child.attributes.opacity === '0') {
      // Invisible bounding-box shim from the upstream sprite pipeline.
      continue;
    }
    nodes.push(convertShape(child));
  }
  return nodes;
};

const parseIcon = ({ name, file }) => {
  const root = parseSync(fs.readFileSync(file, 'utf8'));
  if (root.name !== 'svg') {
    throw new Error('root element is not <svg>');
  }

  const viewBox = root.attributes.viewBox;
  if (!/^0 0 \d+(\.\d+)? \d+(\.\d+)?$/.test(viewBox || '')) {
    throw new Error(`unexpected viewBox "${viewBox}"`);
  }

  const nodes = collectNodes(root, []);
  if (nodes.length === 0) {
    throw new Error('icon has no visible shapes');
  }

  /*
   * `cloud-download.svg` ships its whole drawing twice. Repeating an opaque shape on top of
   * itself changes nothing, so exact duplicates are dropped rather than rendered twice.
   */
  const seen = new Set();
  const uniqueNodes = nodes.filter((node) => {
    const key = JSON.stringify(node);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });

  const identifier = camelCase(name);
  if (!/^[a-z][A-Za-z0-9]*$/.test(identifier) || RESERVED_WORDS.has(identifier)) {
    throw new Error(`"${name}" does not map to a usable identifier (${identifier})`);
  }

  return {
    name,
    identifier,
    viewBox: viewBox === DEFAULT_VIEW_BOX ? undefined : viewBox,
    nodes: uniqueNodes,
    deduplicated: nodes.length - uniqueNodes.length,
  };
};

const quote = (value) => `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;

const renderAttributes = (attributes) => {
  const entries = Object.entries(attributes).map(([name, value]) => {
    return `${name}: ${typeof value === 'number' ? value : quote(value)}`;
  });
  return `{ ${entries.join(', ')} }`;
};

const renderIconModule = ({ name, identifier, viewBox, nodes }) => {
  const lines = [
    HEADER,
    '',
    "import type { IconData } from '../iconData';",
    '',
    `const ${identifier}: IconData = {`,
    `  name: ${quote(name)},`,
  ];
  if (viewBox) {
    lines.push(`  viewBox: ${quote(viewBox)},`);
  }
  lines.push('  node: [');
  for (const [tag, attributes] of nodes) {
    lines.push(`    [${quote(tag)}, ${renderAttributes(attributes)}],`);
  }
  lines.push('  ],', '};', '', `export default ${identifier};`, '');
  return lines.join('\n');
};

const renderBarrel = (icons) => {
  const lines = [HEADER, ''];
  for (const { name, identifier } of icons) {
    lines.push(`export { default as ${identifier} } from './${name}';`);
  }
  lines.push('');
  return lines.join('\n');
};

const renderAll = (icons) => {
  const lines = [HEADER, '', "import type { IconData } from '../iconData';"];
  for (const { name, identifier } of icons) {
    lines.push(`import ${identifier} from './${name}';`);
  }
  lines.push('', '/** Every icon name shipped with Eva Icons. */', 'export type EvaIconName =');
  for (const { name } of icons) {
    lines.push(`  | ${quote(name)}`);
  }
  lines[lines.length - 1] += ';';
  lines.push('', '/** Every Eva icon, keyed by the name used with `<Icon name=... />`. */');
  lines.push('export const evaIcons: Readonly<Record<EvaIconName, IconData>> = {');
  for (const { name, identifier } of icons) {
    lines.push(`  ${quote(name)}: ${identifier},`);
  }
  lines.push('};', '');
  return lines.join('\n');
};

const main = () => {
  const sources = [
    ...listSvgFiles(path.join(EVA_ROOT, 'fill', 'svg')),
    ...listSvgFiles(path.join(EVA_ROOT, 'outline', 'svg')),
  ].sort((a, b) => a.name.localeCompare(b.name, 'en'));

  const names = new Set();
  const icons = sources.map((source) => {
    if (names.has(source.name)) {
      throw new Error(`${source.name}: duplicate icon name`);
    }
    names.add(source.name);
    try {
      return parseIcon(source);
    } catch (error) {
      throw new Error(`${path.relative(EVA_ROOT, source.file)}: ${error.message}`);
    }
  });

  fs.rmSync(OUTPUT_DIRECTORY, { recursive: true, force: true });
  fs.mkdirSync(OUTPUT_DIRECTORY, { recursive: true });

  for (const icon of icons) {
    fs.writeFileSync(path.join(OUTPUT_DIRECTORY, `${icon.name}.ts`), renderIconModule(icon));
  }
  fs.writeFileSync(path.join(OUTPUT_DIRECTORY, 'index.ts'), renderBarrel(icons));
  fs.writeFileSync(path.join(OUTPUT_DIRECTORY, 'all.ts'), renderAll(icons));

  const shapes = icons.reduce((total, icon) => total + icon.nodes.length, 0);
  console.log(`eva-icons ${EVA_VERSION}: ${icons.length} icons, ${shapes} shapes -> ${path.relative(process.cwd(), OUTPUT_DIRECTORY)}`);
  for (const icon of icons.filter((entry) => entry.deduplicated > 0)) {
    console.log(`  ${icon.name}: dropped ${icon.deduplicated} duplicated shape(s)`);
  }
};

main();
