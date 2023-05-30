module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true
},
"extends": "eslint:recommended",
"overrides": [
],
"parserOptions": {
    "ecmaVersion": "latest"
},
"rules": {
}
}
