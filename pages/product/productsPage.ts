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


    async getBoltTshirtPrice() {
        const boltTshirtPrice = await $(this.selectors.boltTshirtProductPrice);
        await boltTshirtPrice.waitForDisplayed();
        return await boltTshirtPrice.getText();
    }

    public async selectProductByName(productName: string): Promise<void> {
        const productElement = await this.findProductElementByName(productName);
        if (productElement) {
            await productElement.click();
        } else {
            throw new Error(`Product not found: ${productName}`);
        }
    }

    public async findProductElementByName(productName: string): Promise<WebdriverIO.Element | undefined> {
        const allProductElements = await this.getAllProductElements();

        // Find the product element by name
        return allProductElements.find(async (element) => {
            const elementName = await element.getText();
            return elementName === productName;
        });
    }

}