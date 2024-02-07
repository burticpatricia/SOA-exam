module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:vue/recommended',
    '@vue/typescript/recommended',
  ],
  rules: {
    // custom rules (all files)
    complexity: ['error', 12],
    'no-template-curly-in-string': 'warn',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
  },
  overrides: [
    {
      files: ['*.ts', '*.vue'],
      rules: {
        '@typescript-eslint/no-unused-vars': 0,
      },
    },
    {
      // config files written in JS
      files: ['.eslintrc.js', '*.config.js'],
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      // see https://github.com/vuejs/eslint-config-typescript/issues/14#issuecomment-749916416
      files: '*.vue',
      rules: require('@typescript-eslint/eslint-plugin').configs['eslint-recommended'].overrides[0].rules,
    },
    {
      // enable lint rules depending on typechecker for files in the tsconfig includes
      files: require('./tsconfig.json').include.filter((path) => !path.includes('..')),
      // the type checker uses a normal TS compiler, which can't handle *.vue
      // files. investigate https://github.com/znck/vue-developer-experience/tree/master/packages/typescript-plugin-vue
      excludedFiles: '*.vue',
      extends: 'plugin:@typescript-eslint/recommended-requiring-type-checking',
      parserOptions: {
        project: './**/tsconfig.json',
      },
    },
    {
      // custom rules (TS)
      files: ['*.ts', '*.tsx', '*.vue'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': [
          'error',
          {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
          },
        ],
        '@typescript-eslint/no-parameter-properties': [
          'error',
          // we actually allow all parameter props except "readonly" without
          // visibility modifier, this is inline with normal prop declarations
          {
            allows: ['private', 'protected', 'public', 'private readonly', 'protected readonly', 'public readonly'],
          },
        ],
        '@typescript-eslint/require-await': 'off',
      },
    },
    {
      // production sources
      files: './{src}/**',
      rules: {
        'no-console': 'warn',
      },
    },
  ],
  ignorePatterns: ['src/__generated__/*'],
}
