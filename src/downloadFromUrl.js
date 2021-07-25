import { createWriteStream } from 'fs-extra';   
import { get } from 'axios';
import { pipeline,finished } from 'stream';
import { promisify } from "util";
import * as zlib from 'zlib';
const Finished = promisify(finished).bind(finished);
/*
This is totally false. It may seem correct because it will work… most of the time! And if you have a 
fast connection, the problems that this solution will bring you will remain hidden from you until you 
download a larger than usual file, or if you happen to use a less than ideal connection. 
The issue is that this method will not take into account the time it takes for the data to be streamed to the disk.
The function (response) is called when the connection is established and a stream has been opened, not when the 
file has been downloaded to the disk. This means, that we should modify the method in order to wait for the 
final byte to be written to the disk before we return our promise and let the execution flow resume.
*/
async function downloadImageWrongWayButMostPeopleUseItWithoutKnowledge(url, fileName){  
  const headers = {
    Authorization: `Bearer token`
  };
  const response=await get(url, { responseType: 'stream' });
  const writer = createWriteStream(fileName)
  response.data.pipe(writer);
}

/*
 *********************************** Right Way *******************************************
 Here We have encapsulated the streaming part inside a Promise, and we have ensured that it won’t be resolved before 
 the write stream has finished. This will make sure that promise will return when the file stream has been closed.
*/
async function downloadImage(url, fileName) {
  const headers = {
    Authorization: `Bearer ya29.a0ARrdaM8gBXdOZHkEBFFP7PcVKDST_dljn0OWZ26_OmpAciauiu1064im25uHJb0tQx65_UPaZPA9hGk9Q2YrS-eJ8QljAAE0prfXC9f7UtQfpf49XHwEm_JuMbeUC9yuOmL8hQlEeN9ZzgRfczCTzX1PCpuPwqc`,
    "Content-Type":"application/vnd.google-apps.file"
  };
  /* 
   ************************** Read Stream ******************************
  */
  const readStream = await get(url, { headers, responseType: 'stream' });

  /*
  Transformer to transform stream b/w read and write. Can be used when required by chaining pipe
  First read then transformer and then write
  const transformer = zlib.createGunzip(); // can implement own transformer or can use zlib any functions according to need.
  */
  /*
   ********************* Write Stream ************************************
  */
  const writeStream = createWriteStream(fileName);
  readStream.data.pipe(writeStream);
  /*
   ****************** Here we are taking care of the problem ***********************************  
  */
  return await Finished(writeStream);
}

// const url = "https://media0.giphy.com/media/4SS0kfzRqfBf2/giphy.gif";

downloadImage("https://www.googleapis.com/drive/v3/files/125PLCCFhZRsh8u0vu_IfPLZ-zdGkA2lC?alt=media","download.png")