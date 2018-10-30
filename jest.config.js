module.exports = {
  "preset": "react-native",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
  ],
  "transform": {
    "src\/.*.(js|jsx)$": "babel-jest",
    "src\/.*.(ts|tsx)$": "ts-jest",
  },
  "testRegex": "src\\/.*\\.spec\\.(ts|tsx)$",
};