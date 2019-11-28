const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
require('dotenv').config();
const webpack = require('webpack');


// module.exports = {
//   env: {
//     // Reference a variable that was defined in the .env file and make it available at Build Time
//     TEST_VAR: process.env.TEST_VAR,
//   }
// }

// module.exports = withCSS({
//   cssModules: true,
//   env: {
//     // Reference a variable that was defined in the .env file and make it available at Build Time
//     PROD_ENDPOINT: process.env.PROD_ENDPOINT,
//   },
// });


// module.exports = withCSS({
//   cssModules: true,

//   webpack: (config) => {
//     /**
//      * Returns environment variables as an object
//      */
//     const env = Object.keys(process.env).reduce((acc, curr) => {
//       // console.log('webpack:config process.env[curr]: ', process.env[curr]);
//       acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
//       return acc;
//     }, {});
//     // Fixes npm packages that depend on `fs` module
//     config.node = {
//       fs: 'empty',
//     };

//     /** Allows you to create global constants which can be configured
//     * at compile time, which in our case is our environment variables
//     */
//     config.plugins.push(new webpack.DefinePlugin(env));
//     return config;
//   },
// });

module.exports = withPlugins(
  [
    [
      withCSS({
        cssModules: true,
      }),
    ],
    [
      {
        webpack: (config) => {
        /**
         * Returns environment variables as an object
         */
          const env = Object.keys(process.env).reduce((acc, curr) => {
          // console.log('webpack:config process.env[curr]: ', process.env[curr]);
            acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
            return acc;
          }, {});
          // Fixes npm packages that depend on `fs` module
          config.node = {
            fs: 'empty',
          };

          /** Allows you to create global constants which can be configured
        * at compile time, which in our case is our environment variables
        */
          config.plugins.push(new webpack.DefinePlugin(env));
          return config;
        },
      },
    ],
  ],
);
