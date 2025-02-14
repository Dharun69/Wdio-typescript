


import { LeftSideMenuScreenPage } from "../../../pages/hamburgerMenu/leftSideMenuScreenPage";
import { QrScannerPage } from "../../../pages/qr/qrscannerpage";
import { ProductPage } from "../../../pages/product/productsPage";
import { AddToCartPage } from "../../../pages/cart/addToCartPage";
import { LoggerHelper, LOGGER } from '../../../utilities/customLogger/loggerHelper';

let leftSideMenuScreenPage: LeftSideMenuScreenPage;
let qrscannerpage: QrScannerPage;
let productPage: ProductPage;
let addToCartPage: AddToCartPage;
const specName = 'Checking the permissions ';
describe("checking the notification permissions", ()=> {
    before(async()=> {
        LoggerHelper.setupLogger(specName);
        qrscannerpage = new QrScannerPage();
        productPage = new ProductPage();
        leftSideMenuScreenPage = new LeftSideMenuScreenPage();
        addToCartPage = new AddToCartPage();
    })

    it('checking the android notification',async () => {
        (await productPage.getHamburgerIconEle()).click();
        await leftSideMenuScreenPage.clickQRScanner();
        (await qrscannerpage.getQrHeader()).waitForDisplayed();
        await addToCartPage.clickCartIcon();
        LOGGER.info('Ending the test')
    })
})