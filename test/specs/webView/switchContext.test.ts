

import { ProductPage } from "../../../pages/productsPage";
import { LeftSideMenuScreenPage } from "../../../pages/leftSideMenuScreenPage";
import { WebViewPage } from "../../../pages/webViewPage";
import { SwitchContextUtils } from "../../../utilities/actions/switchContextUtils";
import { LoggerHelper, LOGGER } from '../../../utilities/customLogger/loggerHelper';

let productPage : ProductPage;
let leftSideMenuScreenPage: LeftSideMenuScreenPage;
let webViewPage: WebViewPage;
let switchContextUtils: SwitchContextUtils;


const specName = 'Switching between contexts';
describe('Switching between native to web views', () => {

    before(async()=> {
        LoggerHelper.setupLogger(specName);
        productPage = new ProductPage();
        leftSideMenuScreenPage = new LeftSideMenuScreenPage();
        webViewPage = new WebViewPage();
        switchContextUtils = new SwitchContextUtils();
    })
    
    afterEach(async () => {
        await driver.terminateApp("com.saucelabs.mydemoapp.rn");
        await driver.activateApp("com.saucelabs.mydemoapp.rn");
    });

    it('switching between native to web', async () => {
        const url: string = 'https://www.ultralesson.ai';
        (await productPage.getHamburgerIconEle()).click();
        await leftSideMenuScreenPage.clickMenuItemWebview();
        await webViewPage.enterUrl(url);
        await webViewPage.clickGoToSiteButton();
        await driver.waitUntil(
            async () => {
                return ((await driver.getContexts()).length) > 1;
            },
            { timeout: 50000, }
        );

        const contexts = await driver.getContexts();
        const nativeView = contexts[0];
        const webviewContext = contexts[1];
        await driver.switchContext(webviewContext.toString());
        // perform any actions in the webview page    
        await driver.switchContext(nativeView.toString());
        await driver.back();
    });


    it('Switching between native and web using utils',async () => {
        const url: string = 'https://www.ultralesson.ai';
        (await productPage.getHamburgerIconEle()).click();
        await leftSideMenuScreenPage.clickMenuItemWebview();
        await webViewPage.enterUrl(url);
        await webViewPage.clickGoToSiteButton();
        await switchContextUtils.switchToWebContext();
        console.log('The webview url: ' + await browser.getUrl());
        
        await switchContextUtils.switchToNativeContext();

        await driver.back();
        
        (await productPage.getHamburgerIconEle()).click();
    })
})