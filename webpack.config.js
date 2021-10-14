const webpack = require("webpack");
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");

const terserOptions = {
  module: false,
  compress: {
    drop_console: true,
    ecma: 6,
    // keep_classnames: /Raj/,
    unsafe_math: true,
    unsafe_methods: true,
  },
  mangle: {
    // keep_classnames: /Raj/,
  },
  format: {
    comments: /\*!$/gm,
  },
};

const config = (env, argv) => ({
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            cacheCompression: false,
            cacheDirectory: true,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      openAnalyzer: false,
    }),
  ],
  optimization: {
    usedExports: true,
    minimize: argv.mode === "production",
    minimizer: [
      new TerserPlugin({
        terserOptions,
      }),
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "_test"),
    },
    port: 8080,
    compress: true,
    hot: true,
    // open: true,
  },
  cache: {
    type: "filesystem",
  },
});

module.exports = config;
