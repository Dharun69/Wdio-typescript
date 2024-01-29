


import { AddToCartPage } from "../pages/cart/addToCartPage";
import { MyCartPage } from "../pages/cart/myCartPage";
import { ProductPage } from "../pages/product/productsPage";


export class CartUtilPage {

    addToCartPage: AddToCartPage;
    myCartPage: MyCartPage;
    productPage: ProductPage;


    constructor() {
        this.addToCartPage = new AddToCartPage();
        this.myCartPage = new MyCartPage();
        this.productPage = new ProductPage();
    }


    async addToCart(productName: string, addedQuantity:number) {
        const productElement = await this.productPage.findProductElementByName(productName);

        if (productElement) {
            await productElement.click();
            const addToCartButton = await this.addToCartPage.getAddToCartButtonEle();

            if(addToCartButton) {
                await addToCartButton.waitForDisplayed();
                await this.addToCartPage.increaseQuantity(addedQuantity);
                await addToCartButton.click();
            } else {
                throw new Error(`Add to Cart button not found for product: ${productName}`);
            }    
        } else {
            throw new Error(`Product not found: ${productName}`);
        }
    }

    async getCartItems() {
        const cartItemsElements = await this.myCartPage.getCartItemsEle();
        const cartItems: string[] = [];
        for (const cartItemElement of cartItemsElements) {
            const itemName = await cartItemElement.getText();
            cartItems.push(itemName);
        }

        return cartItems;

    }

}