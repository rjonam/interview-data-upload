const EmailNotify = require('../interview-data-upload/main/lib/LibraryFunctions');
const notify = new EmailNotify();

exports.config = {
  tests: './main/runner/*.js',
  output: './output',
  timeout: 60000,

  helpers: {
    Webdriver: {
      url: 'google.com',
      browser: 'chrome',
      desiredCapabilities: {
        'goog:chromeOptions': {
          args: [
            '--start-maximized',
          ]
        },
      },
      host: 'localhost',
      port: 4444,
      timeouts: {
        script: 60000,
        'page Load': 60000
      },
      smartWait: 60000,
      waitForTimeout: 60000
    },
  },

  include: {
    I: './steps_file.js',
  },
  bootstrap: null,
  mocha: {},
  name: 'UploadData',

  plugins: {
    wdio: {
      enabled: true,
      services: ['selenium-standalone'],
    },
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    },
    allure: {
      enabled: true
    }
  }
};
