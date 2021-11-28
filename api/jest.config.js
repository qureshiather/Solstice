module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ['dotenv/config'],
};

// A list of paths to directories that Jest should use to search for files in
roots: [
  "./test"
]