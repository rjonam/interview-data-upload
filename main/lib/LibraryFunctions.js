const XLSX = require('xlsx');
const fs = require('fs');
const { debug  } = require('codeceptjs/lib/output');

class LibraryFunctions {


    getRowsBySheetName(sheetName, filePath) {
        let data;
        try {
            if (filePath.toString().endsWith('.xlsx')) {
                const workbook = XLSX.readFile(filePath);
                data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                debug('Excel Data ' + data);
            }
        }
        catch (e) {
            throw new Error('Exception in reading all rows from excel' + e);
        }
        return data;
    }

    getAllRows(testDataFilePath) {
        const excelData = [];
        try {
            if (testDataFilePath.toString().endsWith('.xlsx')) {
                const workbook = XLSX.readFile(testDataFilePath);
                if (workbook.SheetNames.length > 1) {
                    const sheetName = workbook.SheetNames[0];
                    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                    for (const excelDatum of sheetData) {
                        const ed = {};
                        for (const prop in excelDatum) {
                            if (excelDatum.hasOwnProperty(prop)) { // eslint-disable-line no-prototype-builtins
                                if (workbook.Sheets[prop]) {
                                    const workSheetData = XLSX.utils.sheet_to_json(workbook.Sheets[prop]);
                                    ed[prop] = JSON.stringify(workSheetData[excelDatum[prop] - 1]);
                                }
                            }
                        }
                        excelData.push(ed);
                    }
                }
                else {
                    const sheetName = workbook.SheetNames[0];
                    debug('sheetName' + sheetName);
                    return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
                }
            }

        }
        catch (e) {
            throw new Error('Exception in reading all rows from excel' + e);
        }
        return excelData;
    }



    getJsonData(fileName) {
        let jsonData;
        if (fs.existsSync(fileName)) {
            const rawData = fs.readFileSync(fileName);
            try {
                jsonData = JSON.parse(rawData);
            }
            catch (e) {
                throw new Error('Exception in getJsonData Method ' + fileName);
            }
            return jsonData;
        }
        else {
            throw new Error(('File Not Found: ' + fileName));
        }
    }

    sendNotificationEmail(){
        console.log("manoj is send");
        I.sendEmail({
            to: ['ramanoj@athenahealth.com'],
            subject: 'Upload Notifications',
            body: 'Hi, Upload is done'
        });
    }




}

module.exports = LibraryFunctions;
