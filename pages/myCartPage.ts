
 

export class MyCartPage {

    private selectors = {
        proceedToCheckoutButton: "~Proceed To Checkout button",
        removeItem: '//android.widget.TextView[@text="Remove Item"]',
        cartIsEmptyMessage: '//android.widget.TextView[@text="Oh no! Your cart is empty. Fill it up with swag to complete your purchase."]',
        goShoppingButton: '//android.view.ViewGroup[@content-desc="Go Shopping button"]',
        myCartLabel: '//android.widget.TextView[@text="My Cart"]',
        noItemsLabel: '//android.widget.TextView[@text="No Items"]',
        totalPrice: "~total price"

    }

    async getProccedTOCheckoutButtonEle() {
        return await $(this.selectors.proceedToCheckoutButton);
    }

    async getCartIsEmptyMessage() {
        return await $(this.selectors.cartIsEmptyMessage);
    }

    async getNoItemsLabel() {
        return await $(this.selectors.noItemsLabel);
    }

    async getGoShoppingButton() {
        return await $(this.selectors.goShoppingButton);
    }

    async getTotalPriceEle() {
        return await $(this.selectors.totalPrice);
    }


    async clickRemoveItem() {
        const clickRemoveItemButtonEle = await $(this.selectors.removeItem);
        await clickRemoveItemButtonEle.waitForDisplayed();
        await clickRemoveItemButtonEle.click();
    }

    async clickProceedToCheckoutButton() {
        const proceedToCheckoutButtonEle = await $(this.selectors.proceedToCheckoutButton);
        await proceedToCheckoutButtonEle.waitForDisplayed();
        await proceedToCheckoutButtonEle.click();
    }

}