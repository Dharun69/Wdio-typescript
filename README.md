# WebDriverIO TypeScript POM Project with Allure Report and BrowserStack Integration

This project demonstrates a WebDriverIO setup using TypeScript, Page Object Model (POM) design, Allure report integration, and BrowserStack for mobile Android automation.

## Prerequisites

- Node.js and npm installed.
- WebDriverIO and TypeScript configured.
- BrowserStack account for mobile Android automation.
- Install Appium desktop
- Install Android studio
- Setup Emulator

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rdharun/Wdio-typescript.git


## Getting started with APP Automation

1. **Start the Emulator:**
   - Ensure that your Android emulator is started and running.

2. **Chromedriver Compatibility:**
   - The version of Chromedriver used in your Appium setup should be compatible with the Chrome browser version on your Android emulator/device.
   - Check the Chrome browser version on your emulator/device and make sure it matches the version supported by the Chromedriver you are using.

3. **Updating Chromedriver:**
   - If needed, update the Chromedriver version to match the Chrome browser version on your emulator/device. You can download the appropriate version of Chromedriver from the [Chromedriver Downloads](https://sites.google.com/chromium.org/driver/) page.

4. **Appium Capabilities:**
   - In your test script, ensure that the Appium capabilities are correctly set to match the desired emulator/device, including the `platformName`, `deviceName`, `app`, and other relevant capabilities.

5. **Executing on Mobile Emulator/Device**
   - To run a single test case, update the relative path in the npm script for the test-local command. For example: 
    "test-local": "wdio run ./wdio.conf.ts --spec test/specs/webView/your-single-test-case-file.ts",
   - Run the updated script using:
    ```base 
          npm run test-local 
    ```

   - Executing All Test Cases:
   ```  
   npm run wdio

6. Executing on BrowserStack Mobile Device:

   1. **Check BrowserStack Credentials:**
    - Make sure your BrowserStack username and access key are correctly set. Verify the values in your WebDriverIO configuration file (wdio.browserstack.config.ts):

  ```typescript
   user: process.env.BROWSERSTACK_USERNAME || 'your-username',
   key: process.env.BROWSERSTACK_ACCESS_KEY || 'your-access-key',
  ```

    -  You can obtain your BrowserStack username and access key from the BrowserStack dashboard.

   2. **Run a Single Test Case on BrowserStack:**
     - Update the relative path in the npm script for the bs-android command in the package.json file:

     ```bash
     "bs-android": "PLATFORM=ANDROID npx wdio run ./config/wdio.browserstack.config.ts --spec test/specs/webView/your-single-test-case-file.ts"


   3. Replace 'your-single-test-case-file.ts' with the path to your specific test case file.

   ```
   npm run bs-android
   ```
 - This command will execute the specified test case on a BrowserStack Android device.



## Allure Report Integration

1. **Run Tests with Allure Report Locally:**

   After executing your tests locally or on BrowserStack, you can generate and serve the Allure Report. Make sure you have Allure Command Line installed globally:

   ```bash
   npm install -g allure-commandline


- Once the test case has been executed, view the Allure results by running:

   ```
   allure serve
- This command will serve the Allure report locally, and you can access it by visiting the provided URL in your browser.

 