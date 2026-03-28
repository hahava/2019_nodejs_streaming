const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (_env, argv = {}) => {
  const mode = argv.mode || 'development';
  const isProduction = mode === 'production';
  const outputPath = path.resolve(__dirname, '../back-end/server/front');
  const publicPath = '/';

  return {
    mode,
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      path: outputPath,
      filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      chunkFilename: isProduction ? 'js/[name].[contenthash:8].chunk.js' : 'js/[name].chunk.js',
      clean: true,
      publicPath,
    },
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    },
    stats: 'errors-warnings',
    resolve: {
      extensions: ['.js', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/[name].[contenthash:8][ext]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
        minify: isProduction
          ? {
            collapseWhitespace: true,
            removeComments: true,
            useShortDoctype: true,
          }
          : false,
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: 'single',
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'public'),
      historyApiFallback: true,
      hot: true,
      compress: true,
      overlay: true,
      publicPath,
      port: 3000,
    },
  };
};
