var config = require("./w.config")
var path = require("path")

// production环境配置
module.exports = {
  devtool: config.devtool,
  entry: config.entry,
  output: {
    path: __dirname + "/build",
    filename: "./static/app-" + config.version + ".js",
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
  plugins: config.productionPlugins,
  postcss: config.postcss,
}
