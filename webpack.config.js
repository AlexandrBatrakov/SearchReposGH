const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

// здесь размещаются все свойства нашего приложения
module.exports = {
  mode: 'development', // - указывает что приложение находится в разработке, выходные файлы js не надо сжимать
  entry: ['@babel/polyfill', './src/index.jsx'], // - путь к файлу который является входным(точка входа)
  // @babel/polyfill - это нужно для корректной работы бейбла, 2я вхдная точка
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/', // - это необходимо чтобы не возикало проблем с хешированием при переходе на разные страницы
  }, // - указывается куда вебпак будет собирать файлы
  devServer: {
    inline: false,
    contentBase: './dist',
    port: 3000,
    historyApiFallback: true
  },// - сервер позволяющий в реальном времени отслеживать изменения в приложениии
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'// - опция указывает путь к нашему хтмл файлу
    }),
    new CleanWebpackPlugin(),
  ],// - плагины подключаемые в проект
  module: {
    rules: [
      {
        test: /\.(css|scss)$/, // - регулярное выражение для работы с лоадерами
        use: ['style-loader', 'css-loader', 'sass-loader'] // - массив лоадеров, которые будут использоваться(очередность запуска справа налево)
      },
      {
        test: /\.(jpg|jpeg|png|svg)/,// - различные расширения для работы
        use: ['file-loader']
      }, // - импорт файлов с различными расширениями
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",// - лоадер делается объектом для указания дополнительных опций
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.m?jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-react']
          }
        }
      } // - пресет для работы с JSX разметкой
    ]
  } // - модули с которыми будет работать приложение
}
