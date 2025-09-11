// babel.config.js
module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        // add any other plugins you need here
        'react-native-reanimated/plugin', // 👈 must always be last
      ],
    };
  };
  