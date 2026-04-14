const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');
const frontendDirectory = path.join(projectRoot, 'frontend');
const frontendDistDirectory = path.join(frontendDirectory, 'dist');
const publicDirectory = path.join(projectRoot, 'public');

const removeDirectoryIfExists = (directoryPath) => {
  fs.rmSync(directoryPath, { recursive: true, force: true });
};

const copyFrontendBuildToPublic = () => {
  removeDirectoryIfExists(publicDirectory);
  fs.mkdirSync(publicDirectory, { recursive: true });
  fs.cpSync(frontendDistDirectory, publicDirectory, { recursive: true });
};

copyFrontendBuildToPublic();
