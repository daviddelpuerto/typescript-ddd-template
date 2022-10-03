module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: 'airbnb-typescript/base',
  plugins: [
    'import', 
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
};