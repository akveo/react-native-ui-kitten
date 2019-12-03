import * as path from 'path';

export type GulpCompletionCallback = (error?: any) => void;
export const DOCS_DIR: string = path.resolve(__dirname, '../../', 'docs');
