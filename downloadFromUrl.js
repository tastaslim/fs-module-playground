'use strict'
const Fs = require('fs-extra')   
const axios = require('axios')
async function downloadImage() {
  const url="your image url"
  const headers = {
    Authorization: `Bearer token`
  };
  return await axios.get(url, { headers, responseType: 'stream' });
}

async function downloadImage1() {

  const response = await downloadImage();
  const writer = Fs.createWriteStream('filename with extension')
  response.data.pipe(writer)
}

downloadImage1()  