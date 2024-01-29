import { $ } from "@wdio/globals"



export class AddToCartPage {

    private selectors = {

        cartBadge: "~cart badge",
        addToCartButton: "~Add To Cart button",
        productPriceLabel: "~product price",
        increaseQuantity: '//android.view.ViewGroup[@content-desc="counter plus button"]/android.widget.ImageView',


    }


    async getAddToCartButtonEle() {
        return await $(this.selectors.addToCartButton);
    }

    async addToCart() {
        const addToCartButton = await this.getAddToCartButtonEle();
        await addToCartButton.waitForDisplayed();
        await addToCartButton.click();
    }

    async clickCartIcon() {
        const cartIconEle = $(this.selectors.cartBadge);
        await cartIconEle.click();
    }

    async getProductPriceLabel() {
        const productPriceLabelEle = await $(this.selectors.productPriceLabel);
        await productPriceLabelEle.waitForDisplayed();
        return await productPriceLabelEle.getText();
    }

    async increaseQuantity(qty: number) {
        for(let i=1; i<=qty; i++) {
            (await $(this.selectors.increaseQuantity)).click();
        }
    }
}