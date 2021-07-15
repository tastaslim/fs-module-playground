const fs = require("fs-extra")
const path = require("path")
const FakeFileGenerator = require('fake-file-generator');
const filePath = 'output';
const fileName = "hello.txt";
if (!fs.existsSync(filePath)){
    fs.mkdirSync(filePath);
}
const size = 10000000;
const options = { type: 'txt' }
FakeFileGenerator.makeFile(filePath+'/'+fileName, size, options)
    .then(() => {
      console.log('file generated!');
      setTimeout(() => {
        const removeDir = function(path) {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path)

    if (files.length > 0) {
      files.forEach(function(filename) {
        if (fs.statSync(path + "/" + filename).isDirectory()) {
          removeDir(path + "/" + filename)
        } else {
          fs.unlinkSync(path + "/" + filename)
        }
      })
      fs.rmdirSync(path)
    } else {
      fs.rmdirSync(path)
    }
  } else {
    console.log("Directory path not found.")
  }
}

removeDir(filePath)
      },2000);
    })
    .catch(console.error);
