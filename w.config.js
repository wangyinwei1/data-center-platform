var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var version = require('./package.json').version;
var STITAC = __dirname + '/static/';

// 程序入口
var entry = __dirname + '/src/index.js';

// 输出文件
var output = {
  filename: 'page/[name]/index.js',
  chunkFilename: 'chunk/[name].[chunkhash:5].chunk.js',
};

// 生成source-map追踪js错误
var devtool = 'source-map';

// eslint
var eslint = {
  configFile: __dirname + '/.eslintrc.js',
};

// loader
var loaders = [
  {
    test: /\.(json)$/,
    exclude: /node_modules/,
    loader: 'json',
  },
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      presets: ['react', 'es2015', 'stage-0'],
      plugins: [
        // 这个是配置ant design的按需加载的环境
        [
          'import',
          {
            libraryName: 'antd',
            style: true,
          },
        ],
        'transform-decorators-legacy',
        'add-module-exports',
      ],
    },
  },
  {
    test: /\.(?:png|jpg|gif)$/,
    loader: 'url?limit=8192', //小于8k,内嵌;大于8k生成文件
  },
  {
    test: /\.css$/,
    loader: 'style-loader!css-loader!postcss-loader',
  },
  {
    test: /\.less/,
    loader: ExtractTextPlugin.extract(
      'style',
      'css?modules&localIdentName=[path][name]---[local]---[hash:base64:5]!postcss!less',
    ),
  },
  {
    // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
    test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
    loader: 'file?name=./static/fonts/[name].[ext]',
  },
];

// dev plugin
var devPlugins = [
  new CopyWebpackPlugin([
    {from: './src/resource/music/music.mp3'},
    {from: './src/resource/css/loader.css'},
  ]),
  // 复制
  new CopyWebpackPlugin([
    {
      from: STITAC + 'iconfont/**',
    },
    {
      from: STITAC + 'images/**',
    },
    {
      from: STITAC + 'jq/jquery.min.js*',
    },
    {
      from: STITAC + 'css/antd.min.css',
    },
  ]),
  // 热更新
  new webpack.HotModuleReplacementPlugin(),
  // 允许错误不打断程序, 仅开发模式需要
  new webpack.NoErrorsPlugin(),
  // 打开浏览器页面
  new OpenBrowserPlugin({
    url: 'http://localhost:9080',
    browser: 'Google Chrome',
  }),
  // css打包
  new ExtractTextPlugin('css.css', {
    allChunks: true,
  }),
];

// production plugin
var productionPlugins = [
  // 定义生产环境
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  // 复制
  new CopyWebpackPlugin([
    {
      from: STITAC + 'iconfont/**',
    },
    {
      from: STITAC + 'images/**',
    },
    {
      from: STITAC + 'jq/**',
    },
    {
      from: STITAC + 'css/**',
    },
  ]),
  // HTML 模板
  new HtmlWebpackPlugin({
    template: __dirname + '/server/index.tmpl.html',
  }),
  // JS压缩
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  }),
  // css打包
  new ExtractTextPlugin('./static/css-' + version + '.css', {
    allChunks: true,
  }),
];

// dev server
var devServer = {
  contentBase: './server',
  colors: true,
  historyApiFallback: false,
  port: 9080, // defaults to "8080"
  hot: true, // Hot Module Replacement
  inline: true, // Livereload
  host: '0.0.0.0',
  disableHostCheck: true,
  proxy: [
    {
      context: ['/AEP/**'],
      target: 'http://172.16.7.19:8080/',
      // target: 'http://172.17.3.53:8080/',
      // target: 'http://172.16.4.254:8080/',
    },
  ],
};

module.exports = {
  entry: entry,
  devtool: devtool,
  output: output,
  loaders: loaders,
  devPlugins: devPlugins,
  productionPlugins: productionPlugins,
  devServer: devServer,
  postcss: function() {
    return [precss, autoprefixer];
  },
  version: version,
};
