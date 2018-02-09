exports.config = {
  collections: [{ name: '@stencil/router' }],
  copy: [
    {src: 'docs-content'}
  ],
  globalStyle: 'src/styles/global.css'
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
