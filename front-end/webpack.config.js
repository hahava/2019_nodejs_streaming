const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (_env, argv = {}) => {
  const mode = argv.mode || 'development';
  const isProduction = mode === 'production';

  return {
    mode,
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
      path: path.resolve(__dirname, '../back-end/server/front'),
      filename: 'main.js',
      clean: true,
      publicPath: '/',
    },
    devtool: isProduction ? 'source-map' : 'eval-cheap-module-source-map',
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
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html'),
      }),
    ],
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'public'),
      },
      historyApiFallback: true,
      hot: true,
      port: 3000,
    },
  };
};
