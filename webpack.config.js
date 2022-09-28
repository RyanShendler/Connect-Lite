const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

//tells webpack to use template ./src/index.html to build an output HTML
//file with bundle.js as a script at ./dist/index.html
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"), //dev servers uses ./dist as output dir
    },
    hot: true, //enable hot reloading
  },
  module: {
    rules: [
      {
        test: /\.js$/, //tells webpack to use babel for all .js files (except those in node_modules/)
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/, //tells webpack to run our .css files through style-loader, css-loader and postcss-loader
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [htmlPlugin],
};
