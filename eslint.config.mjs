export default [{
  files: ['**/*.{js,jsx,mjs}'],
  languageOptions: { ecmaVersion: 'latest', sourceType: 'module', parserOptions: { ecmaFeatures: { jsx: true } } },
  rules: {
    'constructor-super': 'error',
    'no-constant-condition': 'error',
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-unreachable': 'error',
    'valid-typeof': 'error',
  },
}];
