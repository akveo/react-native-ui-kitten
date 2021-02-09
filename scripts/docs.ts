import { structure as DOCS } from '../docs/src/structure';
import { task } from 'gulp';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { isAbsolute, join, resolve, sep } from "path";
export const DOCS_DIST = './docs/dist';
export const DOCS_SITE_URL = 'https://akveo.github.io/react-native-ui-kitten/';

task('create-docs-dirs', (done) => {
  const docsStructure = flatten('docs', routesTree(DOCS));
  createDirsStructure(docsStructure);

  done();
});

task('create-sitemap', (done) => {
  const docsPages = flattenLeafs('docs', routesTree(DOCS));
  createSitemap(docsPages);

  done();
});


function createSitemap(docsPages) {
  const sitemap = getSitemap(docsPages);
  writeFileSync(join(DOCS_DIST, 'sitemap.xml'), sitemap);
}

function getSitemap(docsPages) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${DOCS_SITE_URL}</loc>
      </url>
      ${getUrlTags(docsPages)}
     </urlset>`;
}

function getUrlTags(docsPages) {
  return docsPages.map(pageUrl => {
    return `
     <url>
       <loc>${DOCS_SITE_URL}${pageUrl}</loc>
     </url>`;
  }).join('');
}

function flatten(root, arr) {
  let res: any[] = [];
  arr.forEach((item: any) => {
    const path = `${root}/${item.path}`;
    res.push(path);
    if (item.children) {
      res = res.concat(flatten(path, item.children));
    }
  });

  return res;
}

function flattenLeafs(root, arr) {
  let res: any[] = [];
  arr.forEach((item: any) => {
    const path = `${root}/${item.path}`;
    if (!item.children || item.children.length === 0) {
      res.push(path);
    }
    if (item.children) {
      res = res.concat(flatten(path, item.children));
    }
  });

  return res;
}

function createDirsStructure(dirs) {
  const index = readFileSync(join(DOCS_DIST, '/docs/index.html'), 'utf8');
  dirs.forEach((dir: any) => {
    const fullPath = join(DOCS_DIST, dir);
    if (!existsSync(fullPath)) {
      mkDirByPathSync(fullPath);
    }

    writeFileSync(join(fullPath, 'index.html'), index);
  });
}

function mkDirByPathSync(targetDir, {isRelativeToScript = false} = {}) {
  const initDir = isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = resolve(baseDir, parentDir, childDir);
    try {
      mkdirSync(curDir);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }

    return curDir;
  }, initDir);
}

function routesTree(structure) {
  return structure
    .filter((page: any) => ['section', 'page', 'tabs'].includes(page.type))
    .map((page: any) => {
      if (page.type === 'tabs') {
        page.children = ['overview', 'api', 'theme', 'examples']
          .map(name => ({ name, type: 'page'}));
      }
      return page;
    })
    .map((page: any) => {
      return {
        path: prepareSlag(page.name),
        children: page.children ? routesTree(page.children) : [],
      }
    });
}

function prepareSlag(name) {
  return name.replace(/[^a-zA-Z0-9\s]+/g, '')
    .replace(/\s/g, '-')
    .toLowerCase();
}
