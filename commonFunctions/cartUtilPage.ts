


import { AddToCartPage } from "../pages/addToCartPage";
import { MyCartPage } from "../pages/myCartPage";
import { ProductPage } from "../pages/productsPage";


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
            const addToCartButton = await this.addToCartPage.getAddToCartButtonEle();

            if(addToCartButton) {
                await productElement.click();
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
}