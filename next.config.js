// next.config.js
const withSass = require('@zeit/next-sass');

module.exports = withSass({
  /* config options here */
  cssModules: true,
  env: {
    API_URL: process.env.API_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
  },
});
