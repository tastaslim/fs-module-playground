const fs = require("fs-extra")
const FakeFileGenerator = require('fake-file-generator');

/*
 ***************************************** Generate Fake file and folder *******************************
*/
function GenerateFolderAndFakeFile(fileSize, fileType, filePath, fileName) {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
    console.log('Folder created');
  }
  const options = { type: fileType }
  FakeFileGenerator.makeFile(filePath + '/' + fileName, fileSize, options);
  console.log('file generated!');
}

function RemoveFileAndFolder(filePath) {
  /*
   ************************************** Remove File and Folder *******************************************                   
  */
  if (fs.existsSync(filePath)) {
    const files = fs.readdirSync(filePath)
    /*
      ******************** If 1 or more folders/files exist inside directory ****************************
    */
    if (files.length > 0) {
      files.forEach((filename)=> {
        /*
         ********************* If it is a directory ****************************
        */
        if (fs.statSync(filePath + "/" + filename).isDirectory()) {
          /*
           ******************* Recursive call until all the sub folders are deleted inside a folder ************************
          */
          RemoveFileAndFolder(filePath + "/" + filename)
          console.log('Removed Folder');
        }
        /*
         ********************* If it is a file ****************************
        */
        else {
          fs.unlinkSync(filePath + "/" + filename)
          console.log('Removed File');
        }
      })
      fs.rmdirSync(filePath);
      console.log('Removed Folder');
    } else {
      fs.rmdirSync(filePath);
    }
  }
   /*
      ******************** If no files/folder exist inside directory ****************************
    */
  else {
    console.log("Directory path not found.")
  }
}

// GenerateFolderAndFakeFile(100000, 'txt', 'tas', 'test.txt');
// RemoveFileAndFolder('tas');