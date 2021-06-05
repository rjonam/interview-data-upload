const fs = require('fs');
const path = require('path');
const {google} = require('googleapis');
var child = require('child_process');

const SCOPES = ['https://www.googleapis.com/auth/drive'];
let credPath = path.join(__dirname,'../../credentials.json');
const auth = new google.auth.GoogleAuth({
    keyFile: credPath,
    scopes: SCOPES
});


const drive = google.drive({version: 'v2', auth});


const getFilesFromDrive = async function getFiles(fileStr,userName) {
    let fileId = (fileStr.toLocaleString().split('='))[1];
    const filePath = path.join(__dirname, "./../../images/"+userName+".jpg");
    const dest = fs.createWriteStream(filePath);
    drive.files.get(
        {fileId, alt: 'media'}, {responseType: 'stream'},
        function (err, res) {
        res.data
            .on('end', () => {
            })
            .on('error', err => {
                console.log('Error', err);
            })
            .pipe(dest);
        });
};

module.exports = getFilesFromDrive;