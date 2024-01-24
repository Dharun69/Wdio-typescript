import * as fs from "fs";

const ANDROID_CAPABILITIES = [
    {
        "appium:platformName": "Android",
        "appium:deviceName": "Pixel_6_Pro_API_33",
        "appium:automationName": "UiAutomator2",
        "appium:udid": "emulator-5554",
        "appium:autoGrantPermissions": true,
        "appium:app": `${process.cwd()}/app/apk/android/android_sauce_lab_app.apk`,
        "appium:chromedriverExecutable": `${process.cwd()}/chromedriver-mobile/chromedriver`
    }
];

const IOS_CAPABILITIES = [
    {
        "appium:platformName": "ios",
        "appium:deviceName": "iPhone 15",
        "appium:automationName": "XCUITest",
        "appium:udid": "86244DD5-5BBC-47C3-9469-90094D7D8646",
        "appium:platformVersion": "17.0",
        "appium:app": `${process.cwd()}/app/apk/ios/ios_sauce_app.app`,
    }
];

exports.config = {
    runner: "local",
    port: 4723,
    specs: [`${process.cwd()}/test/specs/**/*.test.ts`],
    capabilities: process.env.PLATFORM === "ANDROID" ? ANDROID_CAPABILITIES : IOS_CAPABILITIES,
    maxInstances: 1,
    logLevel: "info",
    waitforTimeout: 30000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ["appium"],
    framework: "mocha",
    reporters: [
        "spec",
        [
            "allure",
            {
                outputDir: "allure-results",
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
                disableMochaHooks: true
            },
        ],
    ],
    mochaOpts: {
        ui: "bdd",
        timeout: 60000,
    },
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (!fs.existsSync("./errorShots")) {
            fs.mkdirSync("./errorShots");
        }
        if (!passed) {
            await driver.saveScreenshot(`./errorShots/${test.title.replaceAll(" ", "_")}.png`);
        }
    }
};