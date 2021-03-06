import admZip from 'adm-zip';
import { readdirSync, statSync, createWriteStream } from "fs-extra";
const zip = new admZip();
function performZip(dirname, zipFileName) {
    
    const to_zip = readdirSync(dirname);
    for (let i = 0; i < to_zip.length; i++){
        const fileOrFolderName = to_zip[i];
        /*
          Checks if the file is a directory.
        */
        if (statSync(fileOrFolderName).isDirectory()) {
            zip.addLocalFolder(dirname, fileOrFolderName);
        } else {
            zip.addLocalFile(dirname + '/' + fileOrFolderName);
        }
    }
  
    /* 
      toBuffer() is used to read the data and save it for downloading process.
    */
    const data = zip.toBuffer();
    createWriteStream(zipFileName).write(data);
}
 
function performUnZip(zipFilePath,UnZipFoldername) {
    const unZip = new admZip(zipFilePath);
    unZip.extractAllTo(UnZipFoldername, true);
}
// performZip("../src", "test.7z");
// performUnZip("../src/test.7z","output");