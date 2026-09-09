// v5's `@ui-kitten/components` depended on `lodash.merge`, so this resolved without being declared.
// v6 dropped that dependency. Nothing is removed: it is the app's import, not the codemod's.
import merge from 'lodash.merge';

export const combine = (a: object, b: object): object => merge({}, a, b);
