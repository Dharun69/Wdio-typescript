import { $ } from "@wdio/globals"
import { ProductPage } from "../product/productsPage";
import { LeftSideMenuScreenPage } from "../hamburgerMenu/leftSideMenuScreenPage";


export class LogoutPage {

    productPage : ProductPage;
    leftSideMenuScreenPage: LeftSideMenuScreenPage;

    constructor() {
        this.productPage = new ProductPage();
        this.leftSideMenuScreenPage = new LeftSideMenuScreenPage();
    }

    private locators = {
        logOutButton: "//android.widget.Button[@text='LOG OUT']",
        logOutSucessMsg: "//android.widget.TextView[@text='You are successfully logged out.']",
        logOutOkButton: "//android.widget.Button[@text='OK']"
    
    }


    public async getLogOutButtonEle() {
        return await $(this.locators.logOutButton);
    }

    public async getLogOutOkButtonEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.logOutOkButton);
    }

    public async getLogOutSucessMsgEle(): Promise<WebdriverIO.Element> {
        return await $(this.locators.logOutSucessMsg);
    }


    public async logout() : Promise<void> {

        (await this.productPage.getHamburgerIconEle()).click();
        (await this.leftSideMenuScreenPage.getMenuItemLogOutEle()).click();
        await (await this.getLogOutButtonEle()).waitForDisplayed();
        await (await this.getLogOutButtonEle()).click();
        (await this.getLogOutSucessMsgEle()).waitForDisplayed();
        await (await this.getLogOutOkButtonEle()).waitForDisplayed();
        await (await this.getLogOutOkButtonEle()).click();
        (await this.productPage.getProductTextOnHomeScreenEle()).waitForDisplayed();

    }

}