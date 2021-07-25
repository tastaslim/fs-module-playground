import { existsSync, mkdirSync, readdirSync, statSync, unlinkSync, rmdirSync } from "fs-extra";
import { makeFile } from 'fake-file-generator';

/*
 ***************************************** Generate Fake file and folder *******************************
*/
function GenerateFolderAndFakeFile(fileSize, fileType, filePath, fileName) {
  /*
   ***************** Creates folder if it does not exists ************************
  */
  if (!existsSync(filePath)) {
    mkdirSync(filePath);
    console.log('Folder created');
  }
  const options = { type: fileType }
  /* 
   ***************************** Creates Fake File *****************************
  */
  makeFile(`${filePath}/${fileName}`, fileSize, options);
  console.log('file generated!');
}

function RemoveFileAndFolder(filePath) {
  /*
   ************************************** Remove File and Folder *******************************************                   
  */
  if (existsSync(filePath)) {
    const files = readdirSync(filePath)
    /*
      ******************** If 1 or more folders/files exist inside directory ****************************
    */
    if (files.length > 0) {
      files.forEach((fileName)=> {
        /*
         ********************* If it is a directory ****************************
        */
        if (statSync(`${filePath}/${fileName}`).isDirectory()) {
          /*
           ******************* Recursive call until all the sub folders are deleted inside a folder ************************
          */
          RemoveFileAndFolder(`${filePath}/${fileName}`)
          console.log('Removed File and Folders of Sub Folder');
        }
        /*
         ********************* If it is a file ****************************
        */
        else {
          unlinkSync(`${filePath}/${fileName}`)
          console.log('Removed File');
        }
      })
      rmdirSync(filePath);
      console.log('Removed Folder');
    } else {
      rmdirSync(filePath);
      console.log('Removed Root Folder');
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