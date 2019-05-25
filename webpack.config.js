require('dotenv').config();

const env = 'stage';
const Dotenv = require('dotenv-webpack');

let config = {
  mode: 'development',
  node: {
    fs: "empty"
  },
  entry: 
  [
    '@babel/polyfill',
    './client-src/app.js'
  ],
  output: {
    path: __dirname + '/views/assets',
    publicPath: '/',
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            [
              '@babel/preset-env',
              {
                'targets': {
                  'browsers': [
                    ">0.25%",
                    "not ie 11",
                    "not op_mini all"
                  ]
                }
              }
            ],
            '@babel/preset-react',
          ],
          plugins: [
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-syntax-import-meta',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-json-strings',
            '@babel/plugin-transform-async-to-generator',
            [
              '@babel/plugin-proposal-decorators',
              {
                "legacy": true
              }
            ],
            '@babel/plugin-proposal-function-sent',
            '@babel/plugin-proposal-export-namespace-from',
            '@babel/plugin-proposal-numeric-separator',
            '@babel/plugin-proposal-throw-expressions',
            ...(
              env === 'stage' || env === 'prod'
                ? ['transform-react-remove-prop-types']
                : []
            )
          ],
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ],
  },
  performance: { hints: false },
  plugins: [
    new Dotenv()
  ]
};

// if(env === 'staged' || env === 'production') {
//   config.devtool = 'source-map';
// }
// if (env === 'staged' || env === 'production') {
//   config.devtool = 'nosources-source-map';

//   config.plugins.push(
//     // new webpack.DefinePlugin({
//     //   'process.env': {
//     //     NODE_ENV: JSON.stringify('production')
//     //   }
//     // }),
//     new webpack.LoaderOptionsPlugin({
//       minimize: true,
//       debug: false
//     }),
//     new webpack.EnvironmentPlugin({
//       NODE_ENV: 'prod',
//       DEBUG: false,
//       ...process.env
//     }),
//     new webpack.optimize.ModuleConcatenationPlugin(),
//     // new CompressionPlugin({
//     //   include: /.*\.(css|js)/,
//     //   asset: '[file]',
//     // })
//   );
// }
module.exports = config;
