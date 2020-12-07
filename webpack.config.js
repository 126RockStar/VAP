var HtmlWebpackPlugin = require("html-webpack-plugin");

const webpack = require("webpack");
const dotenv = require("dotenv");
const fs = require("fs"); // to check if the file exists
const path = require("path"); // to get the current path

module.exports = (env) => {
  // Get the root path (assuming your webpack config is in the root of your project!)
  const currentPath = path.join(__dirname);

  // Create the fallback path (the production .env)
  const basePath = currentPath + "/.env";

  // We're concatenating the environment name to our filename to specify the correct env file!
  const envPath = basePath + "." + env.ENVIRONMENT;

  // Check if the file exists, otherwise fall back to the production .env
  const finalPath = fs.existsSync(envPath) ? envPath : basePath;

  // Set the path parameter in the dotenv config
  const fileEnv = dotenv.config({ path: finalPath }).parsed;

  // reduce it to a nice object, the same as before (but with the variables from the file)
  const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
    return prev;
  }, {});

  return {
    entry: "./src/index.jsx",
    output: {
      publicPath: "/",
    },

    resolve: {
      extensions: [".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              {
                plugins: ["@babel/plugin-proposal-class-properties"],
              },
            ],
          },
        },
        {
          test: /\.(mp4|mov|webm)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'videos/',
              publicPath: 'videos/'
            }
          }
        },
        {
          test: /\.(png|PNG|jpg|gif)$/,
          loader: "url-loader?[name].[ext]",
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader?mimetype=image/svg+xml",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.scss$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
            { loader: "sass-loader" },
          ],
        },
      ],
    },
    devServer: {
      historyApiFallback: true,
      compress: true,
      disableHostCheck: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "index.html",
      }),
      new webpack.DefinePlugin(envKeys),
    ],
    externals: {
      // global app config object
      config: JSON.stringify({
        apiUrl: "http://localhost:9000",
      }),
    },
  };
};
