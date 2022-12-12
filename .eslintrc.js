module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [ '@typescript-eslint' ],
  overrides: [
    {
      files: [ '*.ts', '*.tsx' ],
      rules: {
        '@typescript-eslint/no-shadow': [ 'error' ],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-native/no-raw-text': 'off',
      },
      extends: [
        'akveo/react-native:recommended',
      ],
    },
  ],
  parserOptions: {
    project: [ './tsconfig.json' ],
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '18.0.0',
    },
  },
  ignorePatterns: ["src/template-js", "src/template-ts"]
};
