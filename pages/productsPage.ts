import { $ } from "@wdio/globals";


const platform = process.env.PLATFORM;

export class ProductPage {

    private selectors = {

        hamburgerIcon: platform === 'ANDROID' ? "~open menu": "~tab bar option menu",
        productTextOnHomeScreen: "//android.widget.TextView[@text='Products']",
        sauceLabsBackPackProduct: "(//android.widget.TextView[@content-desc='store item text'])[1]",
        firstItem: "(//android.view.ViewGroup[@content-desc='store item'])[1]/android.view.ViewGroup[1]/android.widget.ImageView",
        boltTshirtProduct: "//android.widget.TextView[@text='Sauce Labs Bolt T-Shirt']",
        boltTshirtProductPrice: "//android.widget.TextView[@text='$15.99']",
        footer: "//android.widget.TextView[@text='© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy.']/parent::android.view.ViewGroup",
        products: "(//android.widget.TextView[@content-desc='store item text'])"
    }

    public async getHamburgerIconEle() {
        return await $(this.selectors.hamburgerIcon);
    }

    public async getAllProductElements() {
        return await $$(this.selectors.products);
    }

    public async getBoltTshirtProductEle() {
        return await $(this.selectors.boltTshirtProduct);
    }

    public async getProductTextOnHomeScreenEle() {
        return await $(this.selectors.productTextOnHomeScreen);
    }

    public async getSauceLabsBackPackProductEle() {
        return await $(this.selectors.sauceLabsBackPackProduct);
    }

    async getFooterEle() {
        return await $(this.selectors.footer);
    }

    async clickOnFirstProduct() {
        const productElement = await this.getSauceLabsBackPackProductEle();
        await productElement.waitForDisplayed();
        await productElement.click();
    }

    async getBoltTshirtPrice() {
        const boltTshirtPrice = await $(this.selectors.boltTshirtProductPrice);
        await boltTshirtPrice.waitForDisplayed();
        return await boltTshirtPrice.getText();
    }
}