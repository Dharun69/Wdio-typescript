import { LeftSideMenuScreenPage } from "../hamburgerMenu/leftSideMenuScreenPage";
import { ProductPage } from "../product/productsPage";


export class LoginPage {

    productPage : ProductPage;
    leftSideMenuScreenpage: LeftSideMenuScreenPage;

    constructor() {
        this.productPage = new ProductPage();
        this.leftSideMenuScreenpage = new LeftSideMenuScreenPage();
    }

    private selectors = {
        userNameInputField: '~Username input field',
        passwordInputField: '~Password input field',
        loginButton: '~Login button',
    }

    public async getUserNameInputFieldEle() {
        return await $(this.selectors.userNameInputField);
    }

    public async getPasswordInputFieldEle() {
        return await $(this.selectors.passwordInputField);
    }

    public async getLoginButtonEle() {
        return await $(this.selectors.loginButton);
    }

    public async login(username : string, password : string) {

        await (await this.productPage.getHamburgerIconEle()).click();
        const menuItemLoginEle = await this.leftSideMenuScreenpage.getLoginButtonFromSideMenu();
        await menuItemLoginEle.waitForDisplayed();
        await menuItemLoginEle.click();
        const userNameInputFieldEle = await $(this.selectors.userNameInputField);
        await userNameInputFieldEle.waitForDisplayed();
        await userNameInputFieldEle.addValue(username);
        await userNameInputFieldEle.setValue(username);
        const passwordInputFieldEle = await $(this.selectors.passwordInputField);
        await passwordInputFieldEle.waitForDisplayed();
        await passwordInputFieldEle.setValue(password);
        const loginButtonEle = await $(this.selectors.loginButton);
        await loginButtonEle.click();

    }

}