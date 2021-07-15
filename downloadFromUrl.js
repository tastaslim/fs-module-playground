'use strict'
const Fs = require('fs-extra')   
const axios = require('axios')
// 4157063925513094414
async function downloadImage() {
  const url="https://www.googleapis.com/drive/v3/files/18OsQSt4WUSYqZqcJT1FTkdBUoWcsIKd_?alt=media"
  // const url = 'https://3d3c95b8-a-96eac429-s-sites.googlegroups.com/feeds/media/content/reallyheaven.info/ambrose47/2430119723369785659'
  
  const headers = {
    Authorization: `Bearer ya29.a0ARrdaM9Q_YBUCqoduFYwlrWms1PvI89W26L4mPU9J47VwyHLKcxZpKGbyitqX70G2NPjF0rHEsRTx-2qZ8XOuLADBmFjexOOMPMjPoj4UO3f02H1LV-ZbjxjNZrT-jjAN6uINA9W9ICgu-xE0aSuhqTjQ4M4ylTaR6KEu8iIhFglqS6xzOwqvphUaEkwMcRnbvqFbWWrA1I1g48sp8s1Z7LKN1CfOtinX_SxiFMf0hQC5BeW`,
  };
  return await axios.get(url, { headers, responseType: 'stream' });
}

async function downloadImage1() {

  const writer = Fs.createWriteStream('code2.png')
  const response = await downloadImage();
  response.data.pipe(writer)
}

downloadImage1()  