const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

//this plugin auto-generates a HTML file that includes our webpack bundle as a <script>
//template is the source HTML file
//filename is the output HTML file (relative to output folder)
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});
//config options for webpack
module.exports = {
  mode: "development",
  output: {
    filename: "bundle.js", //our bundled output file will be called bundle.js
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
        test: /\.css$/, //tells webpack to run our .css files through style-loader and css-loader
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [htmlPlugin],
};
