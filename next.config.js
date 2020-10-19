// next.config.js
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  /* config options here */
  cssModules: true,
  env: {
    API_URL: 'http://localhost:3000',
  },
});
