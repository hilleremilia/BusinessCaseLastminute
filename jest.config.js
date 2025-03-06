module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-navigation|@react-native-community|react-native-paper|@react-native)/)',
  ],
};
