const FileSystem = require('./filesystem');
const fileSystem = new FileSystem;

fileSystem.on('fileCreated', () => {
    console.log('TP completed');
});

fileSystem.createFile();