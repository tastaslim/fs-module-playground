'use strict'
const Fs = require('fs-extra')   
const axios = require('axios')
async function downloadImage() {
  const url="https://lh6.googleusercontent.com/-haCvlJ0Zu-E/W2mXeOnMjoI/AAAAAAAAAAA/Hp5RP-0IB8cuxN5vUMR86fQF5xkYYZ0TACOQCEAE/s100/photo.jpg"
  const headers = {
    Authorization: `Bearer ya29.a0ARrdaM_axcvt-EmUd3d4pwSQTnWidXCwBJqsPIRhfJUzBS6bKaIFseZqg5GHrD_ntbpRKAx2ChI3dqUKuiby8a2qa2rneR5UR3ZW2BPAhbwq1W0IJQqt8RUddiKzEGqQPX4u-3dM44g5z7yJo-saSUzPPPR85inoQh_1r8Ww5Z2IjhH_TCUo7xgzGNSq5yXbAd1xTlR_nj9EW_cgZIIs8svAXoUjInhDlIcHUWS67G16XOHvnfaY8Eya`,
  };
  return await axios.get(url, { headers, responseType: 'stream' });
}

async function downloadImage1() {

  const response = await downloadImage();
  const writer = Fs.createWriteStream('code2.jpg')
  response.data.pipe(writer)
}

downloadImage1()  