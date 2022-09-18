const withReactSvg = require('next-react-svg')
const path = require('path')

module.exports = withReactSvg({
  reactStrictMode: true,
  include: path.resolve(__dirname, 'public/svgs'),
  webpack(config, options) {
    config.module.rules.push({
      test: /\.md$/,
      loader: 'file-loader',
      options: {
        name: 'dist/[path][name].[ext]',
      },
    })
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  },
})
