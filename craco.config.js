// craco.config.js

const path = require('path');

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  webpack: {
    alias: {
      '~': path.join(path.resolve(__dirname, './src')),
    }
  },
}
