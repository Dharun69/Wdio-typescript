import { $ } from "@wdio/globals";
import { XpathUtil } from "../../utilities/xpath/xpathUtil";
import { LOGGER } from "../../utilities/customLogger/loggerHelper";


const platform = process.env.PLATFORM;

export class ProductPage {

    private selectors = {

        hamburgerIcon: platform === 'ANDROID' ? "~open menu": "~tab bar option menu",
        productTextOnHomeScreen: "//android.widget.TextView[@text='Products']",
        footer: "//android.widget.TextView[@text='© 2024 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy.']/parent::android.view.ViewGroup",
        products: "(//android.widget.TextView[@content-desc='store item text'])",
        sortButton: "~sort button",
        sortType: "~##PLACEHOLDER##"
    }

    public async getHamburgerIconEle() {
        return await $(this.selectors.hamburgerIcon);
    }

    public async getSortButtonEle() {
        return await $(this.selectors.sortButton);
    }

    public async getSortTypeEle(type: string) {
        return await $(XpathUtil.getPlaceholderReplaced(this.selectors.sortType, type));
    }

    public async getAllProductElements() {
        return await $$(this.selectors.products);
    }

    public async getProductTextOnHomeScreenEle() {
        return await $(this.selectors.productTextOnHomeScreen);
    }

    async getFooterEle() {
        return await $(this.selectors.footer);
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

        return allProductElements.find(async (element) => {
            const elementName = await element.getText();
            return elementName === productName;
        });
    }

    async sortOrder(type: string) {
        try {
            (await this.getSortButtonEle()).click();
            (await this.getSortTypeEle(type)).click();
        } catch (error) {
            LOGGER.error(`Error while sorting orders\n${error.stack}`);
            throw error;
        }
    }
}