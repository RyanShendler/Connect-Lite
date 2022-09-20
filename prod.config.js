const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

//this plugin auto-generates a HTML file that includes our webpack bundle as a <script>
//template is the source HTML file
//filename is the output HTML file (relative to output folder i.e. dist/)
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});
//config options for webpack
module.exports = {
  mode: "development",
  entry: "./src/index.js", //bundling starts at index.js (this is our root file/entry point)
  output: {
    path: path.resolve(__dirname, "dist"), //write bundled output to dist/ folder
    filename: "bundle.js", //our bundled output file will be called bundle.js
    clean: true, //deletes everything in dist/ before outputing files
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
