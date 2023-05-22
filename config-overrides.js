const { override, disableChunk } = require('customize-cra');

module.exports = override(
  disableChunk(),
  (config) => {
    const oneOfRule = config.module.rules.find(rule => rule.oneOf);
    const babelLoader = oneOfRule.oneOf.find(rule => rule.loader.includes('babel-loader'));
    babelLoader.include.push(/devextreme-react/);

    return config;
  }
);
