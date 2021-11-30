/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const config = {
  mode: 'production',
  entry: path.resolve(__dirname, './src/index.ts'),
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: 'html-loader' }
      },
      {
        test: /\.s[ac]ss$/i,
        include: /src/,
        use: [
          {
            loader: "style-loader",
            options: {
              injectType: "lazyStyleTag",
              insert: function insertIntoTarget(element, options) {
                var parent = options.target || document.head;

                parent.appendChild(element);
              },
            },
          },
          "css-loader",
          "sass-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  ["postcss-preset-env", "autoprefixer"],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.css', '.scss'],
    plugins: [
      new TsconfigPathsPlugin({})
    ]
  },
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html')
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets', noErrorOnMissing: true },
        { from: 'legacy/app', to: 'legacy/firefox', noErrorOnMissing: true },
        { from: 'legacy/firefox', to: 'legacy/firefox', noErrorOnMissing: true },
        { from: 'legacy/app', to: 'legacy/chrome', noErrorOnMissing: true },
        { from: 'legacy/chrome', to: 'legacy/chrome', noErrorOnMissing: true },
      ],
    }),
  ],
};

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
  }

  if (argv.mode === 'production') {
    //...
  }

  return config;
};
