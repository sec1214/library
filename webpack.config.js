const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // 1. SET THE MODE (Choose 'development' for coding, 'production' for final deploy)
  mode: "development",

  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },

  // 2. SOURCE MAPS (Makes debugging much easier)
  devtool: "eval-source-map",

  // 3. DEV SERVER (Auto-refresh)
  devServer: {
    watchFiles: ["./src/template.html"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template.html",
    }),
  ],

  module: {
    rules: [
      {
        // 4. CSS LOADER
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        // 5. ASSET LOADER (For your background images)
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
};
