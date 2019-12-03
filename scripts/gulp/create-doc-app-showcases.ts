import * as fs from 'fs';

export interface DocShowcase {
  name: string;
  code: string;
  path: string;
}

const SHOWCASE_KEY_WORD: string = 'Showcase';

export const createDocAppShowcases = (files: string[]): DocShowcase[] => {
  return files.map((path: string): DocShowcase => {
    const code: string = fs.readFileSync(path, 'utf8');
    const name: string = code.split(' ')
                             .filter(isShowcaseComponent)[0]
                             .replace(SHOWCASE_KEY_WORD, '');

    return { code, path, name };
  });
};

const isShowcaseComponent = (code: string): boolean => {
  return code.includes(SHOWCASE_KEY_WORD);
};
