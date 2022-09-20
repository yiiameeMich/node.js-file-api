const express = require('express');
const router = express.Router();
const { createFile, getFiles, getFile, editFile, deleteFile } = require('./filesService.js');

router.post('/', createFile);

router.get('/', getFiles);

router.get('/:filename', getFile);

router.put('/:filename', editFile)

router.delete('/:filename', deleteFile)

module.exports = {
  filesRouter: router
};
