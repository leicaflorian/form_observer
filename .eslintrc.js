module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'google',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    'require-jsdoc': 0,
    'linebreak-style': 0,
    'comma-dangle': 0,
    'indent': 0,
    'new-cap': 0,
    'eol-last': 0,
    'arrow-parens': 0,
    'object-curly-spacing': 0,
    'max-len': 100
  },
};