module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    './setup.jest.js',
  ],
};
