const path = require("path");
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        Router: path.resolve(__dirname, "src", "router"),
        Store: path.resolve(__dirname, "src", "store"),
        Views: path.resolve(__dirname, "src", "views"),
        Components: path.resolve(__dirname, "src", "components"),
        Api: path.resolve(__dirname, "src", "api"),
        Helper: path.resolve(__dirname, "src", "helper"),
        Models: path.resolve(__dirname, "src", "models"),
        Styles: path.resolve(__dirname, "src", "styles")
      }
    }
  }
};
