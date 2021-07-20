'use strict'
const Fs = require('fs-extra')   
const axios = require('axios')
async function downloadImage() {
  const url="your image url"
  const headers = {
    Authorization: `Bearer your access token`
  };
  return await axios.get(url, { headers, responseType: 'stream' });
}

async function downloadImage1() {

  const response = await downloadImage();
  const writer = Fs.createWriteStream('code2.jpg')
  response.data.pipe(writer)
}

downloadImage1()  