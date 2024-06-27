module.exports = {
  transform: {
    '^.+\\.vue$': 'vue3-jest',
    '^.+\\.js$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'json', 'vue'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
    '^vue-router$': '<rootDir>/__mocks__/router.js',
    '^axios$': '<rootDir>/__mocks__/axios.js',
  },
  transformIgnorePatterns: ['/node_modules/(?!axios).+\\.js$'],
}
