const path = require('path');

const STATIC_PATH = path.resolve(__dirname, 'static'), DIST_DIR = 'dist';

module.exports = (env = {}) => {
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const { VueLoaderPlugin } = require('vue-loader');

  const isDevEnv = env.NODE_ENV === 'development' || process.env.WEBPACK_DEV_SERVER;
  const plugins = [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevEnv ? '[name]-[contenthash].css' : '[name].css',
    }),
    new VueLoaderPlugin()
  ];

  if (isDevEnv) {
    const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

    plugins.push(
      new WebpackManifestPlugin({
        fileName: path.resolve(STATIC_PATH, 'cache_manifest.json'),
        basePath: `${DIST_DIR}/`,
        publicPath: `${DIST_DIR}/`,
      })
    );
  }

  return {
    mode: isDevEnv ? 'development' : 'production',
    context: path.resolve(STATIC_PATH, 'js'),
    entry: {
      app: './app.js',
      index: './index.js',
    },
    devtool: isDevEnv ? 'eval-cheap-module-source-map' : 'source-map',
    resolve: {
      modules: [path.resolve(__dirname, 'node_modules')],
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue': '@vue/runtime-dom'
      }
    },
    devServer: {
      writeToDisk: true, // Write files to disk in dev mode, so Django can serve the assets
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        }
      ]
    },
    output: {
      path: path.resolve(STATIC_PATH, DIST_DIR),
      filename: isDevEnv ? '[name]-[contenthash].js' : '[name].js',
    },
    plugins,
  };
};
