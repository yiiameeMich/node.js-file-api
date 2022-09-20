const  fs = require('fs');
const path = require('path')

const extensions = ['.txt', '.log', '.json', '.yaml', '.xml'];

//checking if file exists
const existanceCheck = (data, err) => {
  if (err) {
    if (err.code=== 'ENOENT') {
      data.status(400).send({
        'message': 'No such file exist',
        status: 400})
    } else {
      data.status(500).send({
        'message': 'Server Error',
        status: 500})
    }
    return true;
  }
}

//checking an array if it contains extension of file
const isAllowedExt = (ext) => extensions.includes(ext)

function createFile (req, res, next) {

  const {filename, content} = req.body
  //extension check
  if (!isAllowedExt(path.extname('./files/'+filename))){
    res.status(400).send({
      'message': 'This extension is not allowed',
      status: 400
    })
    return;
  }
  //file creating
  fs.writeFile('./files/'+filename, content,(err) => {
    if (err) throw err

    res.status(200).send({
      'message': 'File was successfully created',
      status: 200
    })
 })

}

function getFiles (req, res, next) {
  const allFiles = []

  fs.readdirSync('./files/').forEach(file => {
    allFiles.push(file)
  })

  res.status(200).send({
    "message": "Success",
    "files": allFiles,
    status: 200,
  });
}

const getFile = (req, res, next) => {
  const { filename, content } = req.body

  res.status(200).send({
    "message": "Success",
    "filename": filename,
    "content": content,
    "extension": path.extname(filename),
    "uploadedDate": fs.statSync('./files/'+filename).mtime //new Date()
  });
}

const editFile = (req, res, next) => {
  const {filename, content} = req.body;

  fs.writeFile('./files/'+filename, content, (err) => {
    if (existanceCheck(res, err)) return;
    else if (err) throw err;
    res.status(200).send({
      'message': 'File was successfully updated',
      'filename': filename,
      'content': content,
      'extension': path.extname(filename),
      'uploadDate': fs.statSync('./files/'+filename).mtime, //new Date()
    })
  })
}

const deleteFile = (req, res, next) => {
  const {filename} = req.body;

  fs.unlink('./files/'+filename, err => {
    if (existanceCheck(res, err)) return;
    res.status(200).send({
      'message': 'File was successfully deleted'
    })
  })
}


// fs.writeFile ({ flag: 'a' }) ---> adds content to the file

module.exports = {
  createFile,
  getFiles,
  getFile,
  editFile,
  deleteFile
}
