module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  transform: {
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^Router(.*)$": "<rootDir>/src/router/$1",
    "^Store(.*)$": "<rootDir>/src/store/$1",
    "^Views(.*)$": "<rootDir>/src/views/$1",
    "^Components(.*)$": "<rootDir>/src/components/$1",
    "^Api(.*)$": "<rootDir>/src/api/$1",
    "^Helper(.*)$": "<rootDir>/src/helper/$1",
    "^Models(.*)$": "<rootDir>/src/models/$1",
    "^Styles(.*)$": "<rootDir>/src/styles/$1"
  },
  snapshotSerializers: ["jest-serializer-vue"],
  testMatch: [
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],
  testURL: "http://localhost/",
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ],
  setupFiles: ["<rootDir>/tests/helpers.js"]
};
