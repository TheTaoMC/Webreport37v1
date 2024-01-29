// webpack.config.js
//const path = require('path');
import path from 'path'

export default {
  // ... other webpack configurations

  module: {
    rules: [
      // ... other rules

      // Rule for font files
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          },
        },
      },

      // Rule for ESBuild
      {
        test: /\.(js|jsx)$/,
        loader: 'esbuild-loader',
        exclude: /node_modules/,
        options: {
          loader: 'jsx',  // Or 'tsx' if using TypeScript
          target: 'es2015', // Set your target version of ECMAScript
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Add '.jsx' extension
  },
};
