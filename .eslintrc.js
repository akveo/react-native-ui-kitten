module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-hooks'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        // Keep meaningful rules
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        'react-native/no-raw-text': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'no-bitwise': 'off',

        // Disable formatting — let prettier handle this separately
        'prettier/prettier': 'off',
        'quotes': 'off',
        'jsx-quotes': 'off',
        'semi': 'off',
        'comma-dangle': 'off',
        'object-curly-spacing': 'off',
        'arrow-parens': 'off',
        'eol-last': 'off',
        'no-trailing-spaces': 'off',
        'indent': 'off',
        'react/self-closing-comp': 'off',
        'react-native/no-inline-styles': 'off',
        'curly': 'off',
      },
      extends: [
        '@react-native-community',
      ],
    },
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '19.0.0',
    },
  },
  ignorePatterns: [
    // Deliberately-broken v5 sources the codemod transforms; they must not typecheck or lint.
    'src/codemod/__testfixtures__',
    'src/codemod/__e2e__',
    'lib',
    'dist',
    'docs/',
    '**/*.d.ts',
    'babel.config.js',
    'jest.config.js',
    'src/processor/',
    '**/*.spec.ts',
    '**/*.spec.tsx',
  ],
};
