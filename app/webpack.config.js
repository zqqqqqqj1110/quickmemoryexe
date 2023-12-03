const path = require('path');

module.exports = {
  // ...其他配置

  module: {
    rules: [
      // ...其他规则

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'Font/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
};
