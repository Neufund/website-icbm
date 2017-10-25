const path = require("path");
const webpack = require("webpack");
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const RobotstxtPlugin = require("robotstxt-webpack-plugin").default;
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const { mapValues, keys } = require("lodash");

const isProduction = process.env.NODE_ENV === "production";
const dotenv = require("dotenv");
const envs = updateParsedEnvsWithProcessEnvs(dotenv.load().parsed);

// we are combining the NODE_ENV variable with the local variables from the .env file
// we can't simply pass all envs from process.env because they would become part of the bundle
const allEnvs = mapValues(
  Object.assign(
    {},
    {
      NODE_ENV: process.env.NODE_ENV || "development",
    },
    envs
  ),
  JSON.stringify
);

const devEntryPoints = isProduction
  ? []
  : [
      "react-hot-loader/patch",
      "webpack-dev-server/client?https://localhost:9090",
      "webpack/hot/only-dev-server",
    ];

module.exports = {
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: "localhost",
    port: 9090,
    historyApiFallback: true,
    // respond to 404s with index.html
    hot: true,
    // display errors on page
    overlay: true,
    // enable HMR on the server
    proxy: {
      "/node": {
        target: "http://localhost:8545",
        pathRewrite: { "^/node": "" },
      },
      "/pdfrenderer": {
        target: "https://neufund.net/pdfrender/",
        pathRewrite: { "^/pdfrenderer": "" },
        changeOrigin: true
      },
    },
    staticOptions: {
      extensions: ['html'],
    }
  },
  entry: {
    main: [...devEntryPoints, "./app/index.tsx"],
    commit: [...devEntryPoints, "./app/commit.tsx"],
    page: "./page/ts/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isProduction ? "[name]-[hash].js" : "[name].js",
  },
  devtool: isProduction ? "(none)" : "inline-source-map",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CommonsChunkPlugin({ name: "common", chunks: ["main", "commit"] }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
    new RobotstxtPlugin({
      policy: [
        {
          userAgent: "*",
          allow: "/",
        },
      ],
    }),
    new webpack.DefinePlugin({
      "process.env": allEnvs,
    }),
  ],
  node: {
    __filename: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              minimize: isProduction,
              importLoaders: 1,
              modules: true,
              localIdentName: "[name]__[local]___[hash:base64:5]",
              camelCase: "dashesOnly",
            },
          },
          { loader: "sass-loader" },
        ],
      },
      { test: /\.json$/, use: "json-loader" },
      {
        test: /\.(tsx?|jsx?)$/,
        loader: "awesome-typescript-loader",
        exclude: {
          test: path.resolve(__dirname, 'node_modules'),
          exclude: [
            path.resolve(__dirname, 'node_modules/eth-sig-util'),
            path.resolve(__dirname, 'node_modules/web3-provider-engine'),
            path.resolve(__dirname, 'node_modules/ledger-wallet-provider/node_modules/web3-provider-engine'),
          ]
        },
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(jpg|png)$/,
        loader: "url-loader",
        options: {
          limit: 25000,
        },
      },
      {
        test: /\.(ttf|svg|eot|otf)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[hash].[ext]",
        },
      },
    ],
  },
};

if (isProduction) {
  module.exports.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    })
  );
} else {
  module.exports.plugins.push(
    new OpenBrowserPlugin({ url: 'https://localhost:9090/' })
  )
}

function updateParsedEnvsWithProcessEnvs(envs){
  const processEnvs = process.env;
  const result = {};

  keys(envs).forEach(k => {
    result[k] = (k in processEnvs)? processEnvs[k] : envs[k];
  })

  return result;
}
