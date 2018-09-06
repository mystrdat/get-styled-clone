import babel from 'rollup-plugin-babel';

export default {
  input: "src/index.js",
  output: {
    format: "umd",
    name: "getStyledClone",
    file: "index.js"
  },
  plugins: [ babel() ]
};
