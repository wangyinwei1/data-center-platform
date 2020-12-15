var config = require("./w.config")
var path = require("path")

// dev环境配置
module.exports = {
  devtool: config.devtool,
  entry: config.entry,
  output: {
    path: __dirname + "/server",
    filename: "app.js",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  eslint: config.eslint,
  module: {
    loaders: config.loaders,
  },
  plugins: config.devPlugins,
  devServer: config.devServer,
  postcss: config.postcss,
}
