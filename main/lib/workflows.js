const {I} = inject();


class Workflow {

    navigateToJobSearch(url){
        I.amOnPage(url);
        I.waitForElement("(//input[@value='Apply Online'])[1]");
        I.click("(//input[@value='Apply Online'])[1]");
        I.waitForElement("//input[@value='I Accept']");
        I.click("//input[@value='I Accept']");
    }

    newUserRegistration(){
        I.waitForElement("//input[@value='New User']");
        I.click("//input[@value='New User']");
    }

    async completeNewUSerRegistration(newUserData){
        I.waitForElement("//input[@id='dialogTemplate-dialogForm-userName']");
        I.fillField("//input[@id='dialogTemplate-dialogForm-userName']",newUserData.Username);
        I.fillField("//input[@id='dialogTemplate-dialogForm-password']",newUserData.password);
        I.fillField("//input[@id='dialogTemplate-dialogForm-passwordConfirm']",newUserData.password);
        I.fillField("//input[@id='dialogTemplate-dialogForm-email']",newUserData.Email);
        I.fillField("//input[@id='dialogTemplate-dialogForm-emailConfirm']",newUserData.Email);
        I.click("//input[@id='dialogTemplate-dialogForm-defaultCmd']");
    }

    acceptManualDataEntry(){
        I.waitForElement("//input[contains(@name,'SkipRadio')]");
        I.click("//input[contains(@name,'SkipRadio')]");
        I.waitForElement("(//input[@value='Save and Continue'])[2]");
        I.wait(5);
        I.click("(//input[@value='Save and Continue'])[2]");
    }

    completePersonalInformation(newUserData){
        I.waitForElement("(//select[@class='input-select'])[1]",120);
        I.selectOption("(//select[@class='input-select'])[1]",newUserData.Title.charAt(0).toUpperCase() + newUserData.Title.slice(1).toLowerCase() + '.');
        I.fillField("//input[contains(@name,'FirstName')]",newUserData.Firstname);
        I.fillField("//input[contains(@name,'LastName')]",newUserData.Lastname);
        I.fillField("//input[contains(@name,'EmailAddress')]",newUserData.Email);
        I.selectOption("(//select[@title='Month'])[1]",newUserData['Date of birth (month)']);
        let bday = JSON.stringify(newUserData['Date of birth (day)']);
        //bday = ("0" + bday).slice(-2);
        I.selectOption("(//select[@title='Day'])[1]",bday);
        let bYear = JSON.stringify(newUserData['Date of birth (year)']);
        I.selectOption("(//select[@title='Year'])[1]",bYear);
        I.fillField("(//input[contains(@name,'info_Address')])[1]",newUserData['Street address']);
        I.fillField("//input[contains(@name,'info_City')]",newUserData.City);
        I.selectOption("(//select[contains(@name,'ResidenceLocation')])[1]",newUserData.Country.charAt(0).toUpperCase() + newUserData.Country.slice(1).toLowerCase());
        I.selectOption("(//select[contains(@name,'ResidenceLocation')])[2]",newUserData.State.charAt(0).toUpperCase() + newUserData.State.slice(1).toLowerCase());
        I.selectOption("(//select[contains(@name,'ResidenceLocation')])[3]",newUserData.Region.charAt(0).toUpperCase() + newUserData.Region.slice(1).toLowerCase());
        I.selectOption("//select[contains(@name,'PreferredPhone')]",'Cellular Phone');
        I.fillField("//input[contains(@name,'Mobile')]",newUserData['Cellular number']);
        I.fillField("//input[contains(@name,'ZipCode')]",newUserData['zip code']);
        I.selectOption("//select[contains(@name,'AdvanceNotice')]",'4 Weeks');
        I.selectOption("(//select[@title='Month'])[2]",
            (newUserData['Date of Avaliability (Month)'].charAt(0).toUpperCase() + newUserData['Date of Avaliability (Month)'].slice(1).toLowerCase()).trim());
        let avDay = JSON.stringify(newUserData['Date of Avaliability (day)']);
        //avDay = ("0" + bday).slice(-2);
        I.selectOption("(//select[@title='Day'])[2]",avDay);
        let avYear = JSON.stringify(newUserData['Date of Avaliability (Year)']);
        I.selectOption("(//select[@title='Year'])[2]",avYear);
        I.fillField("//input[contains(@name,'Current')]",newUserData['Current Annual CTC']);
        I.fillField("//input[contains(@name,'Expected')]",newUserData['Expected Annual CTC']);
        I.selectOption("//select[contains(@name,'SourceType')]",'Apollo Career Site');
        I.click("(//input[@value='Save and Continue'])[2]");
        I.wait(5);
        let flag = I.seeNumberOfVisibleElements("//select[contains(@name,'SourceType')]", 1);
        if(flag){
            I.click("(//input[@value='Save and Continue'])[2]");
        }
    }

    fillGeneralQuestion(){
        I.waitForElement("(//span[text()='General Questions'])[2]");
        I.click("(//input[@type='radio'])[1]");
        I.click("(//input[@type='radio'])[4]");
        I.click("(//input[@type='radio'])[5]");
        I.click("(//input[@type='radio'])[8]");
        I.click("(//input[@value='Save and Continue'])[2]");
    }

    fillEducationDetails(newUserData){
        I.waitForElement("//h1//span[contains(text(),'Education')]");
        I.selectOption("//select[contains(@name,'StudyLevel')]",'Graduate');
        I.fillField("(//input[contains(@name,'Institution')])[1]",newUserData.Institution);
        I.fillField("(//input[contains(@name,'Program')])[1]",newUserData.Program);
        I.selectOption("//select[contains(@name,'startDate.month')]",
            (newUserData['Startdate (month)'].charAt(0).toUpperCase() + newUserData['Startdate (month)'].slice(1).toLowerCase()).trim());
        let stYear = JSON.stringify(newUserData['Startdate (year)']);
        I.selectOption("//select[contains(@name,'startDate.year')]",stYear);
        I.selectOption("//select[contains(@name,'graduationDate.month')]",
            (newUserData['Enddate (month)'].charAt(0).toUpperCase() + newUserData['Enddate (month)'].slice(1).toLowerCase()).trim());
        let gradYear = JSON.stringify(newUserData['Enddate (year)']);
        I.selectOption("//select[contains(@name,'graduationDate.year')]",stYear);
        I.click("(//input[@value='Save and Continue'])[2]");
    }

    updateEmployementHistory(){
        I.waitForElement("(//input[@value='Save and Continue'])[2]");
        I.click("(//input[@value='Save and Continue'])[2]");
    }

    updateCertificates(){
        I.waitForElement("(//input[@value='Save and Continue'])[2]");
        I.click("(//input[@value='Save and Continue'])[2]");
    }

    updateFile(filePath){
        I.waitForElement("(//span[text()='File Attachments'])[2]");
        I.attachFile("//input[contains(@name,'uploadedFile')]",filePath);
        I.click("//input[@value='Attach']");
        I.waitForElement("(//span[contains(text(),'Relevant Files')])[2]");
        I.click("(//input[@value='Save and Continue'])[2]");
    }

    async reviewAndSubmit(){
        I.waitForElement("//input[contains(@name,'submitCmd')]");
        I.click("//input[contains(@name,'submitCmd')]");
        I.waitForElement("//span[contains(text(),'Process completed')]");
        const processCompleteFlag = await I.grabNumberOfVisibleElements("//span[contains(text(),'Process completed')]");
        if(processCompleteFlag > 0){
            console.log("Application Submitted Successfully")
        }
    }

}

module.exports = Workflow;