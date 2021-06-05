const path = require('path');
const fs = require('fs');
const responseData = path.join(__dirname,'../resources/Response.xlsx');
const JsonfilePath = path.join(__dirname,'../resources/hospitalDetails.json');
const excelProvider = require('./../../main/lib/LibraryFunctions');
const eProv = new excelProvider();
const Workflows = require('../lib/workflows');
const workflows = new Workflows();

const initialData = eProv.getAllRows(responseData);
const hospitalData = eProv.getJsonData(JsonfilePath);
const getFile = require('./../lib/getAccess');


Feature('Data Upload');
Data(initialData).Scenario('Upload The Interview Data', async ({ I,current }) => {

    workflows.navigateToJobSearch(hospitalData.url);
    workflows.newUserRegistration();
    const isNewCandidate = await workflows.completeNewUSerRegistration(current);
    workflows.acceptManualDataEntry();
    workflows.completePersonalInformation(current);
    workflows.fillGeneralQuestion();
    workflows.fillEducationDetails(current);
    workflows.updateEmployementHistory();
    workflows.updateCertificates();
    await getFile(current.Image,current.Username);
    let filePath = "./images/"+current.Username+".jpg";
    workflows.updateFile(filePath);
    await workflows.reviewAndSubmit();
  }
);