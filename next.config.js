// next.config.js
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  /* config options here */
  cssModules: true,
  env: {
    API_URL: 'https://store.1998.dev',
    JWT_SECRET: 'Huychi2511',
    MONGO_URI: '',
  },
});
