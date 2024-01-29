


import { LoggerHelper, LOGGER } from '../../../utilities/customLogger/loggerHelper';
import { LoginPage } from "../../../pages/loginPage";
import { ProductPage } from "../../../pages/productsPage";
import { AddToCartPage } from "../../../pages/addToCartPage";
import { MyCartPage } from '../../../pages/myCartPage';
import { LoginDetails } from '../../../resources/customTypes/loginDetais';
import * as loginDetailsJson from '../../../resources/testData/loginDetails.json';
import { FileUtils } from '../../../utilities/file/fileUtils';

import { ERROR_MESSAGES } from '../../../constants/constants';
import * as productDetailsJson from '../../../resources/testData/productsDetails.json';
import { ProductDetails } from '../../../resources/customTypes/productDetails';
import { CartUtilPage } from '../../../commonFunctions/cartUtilPage';


// const NO_ITEMS_LABEL = 'No Items';
// const CART_IS_EMPTY_MESSAGE = 'Oh no! Your cart is empty. Fill it up with swag to complete your purchase.';


let loginPage : LoginPage;
let productPage: ProductPage;
let addToCartPage: AddToCartPage;
let myCartPage: MyCartPage;
let loginDetails: LoginDetails;
let productDetails: ProductDetails;
let cartUtilPage: CartUtilPage;

const specName = 'Product price scenarios';
describe("Product Price Comparison", () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        loginPage = new LoginPage();
        productPage = new ProductPage();
        addToCartPage = new AddToCartPage();
        myCartPage = new MyCartPage();
        cartUtilPage = new CartUtilPage();
        loginDetails = FileUtils.convertJsonToCustomType(loginDetailsJson);
        productDetails = FileUtils.convertJsonToCustomType(productDetailsJson);
        await loginPage.login(loginDetails.username, loginDetails.password);
    });

    it("should be able to empty cart",async () => {

        try {
            const addedQuantity = 1;
            const initialQuantity = 1;
            await cartUtilPage.addToCart(productDetails.name, addedQuantity);

            // Calculate expected total price.
            const individualProductPrice = 15.99;
            const expectedTotalPrice = individualProductPrice * (initialQuantity + addedQuantity);

            // Click on the cart icon.
            await addToCartPage.clickCartIcon();


            // Verify the total price in the cart.
            await verifyTotalPriceInCart(expectedTotalPrice);


            // Click on the "Remove Item" button.
            await myCartPage.clickRemoveItem();

            // Assert that the "No Items" label is displayed.
            const noItemsLabel = await (await myCartPage.getNoItemsLabel()).getText();
            expect(noItemsLabel).toBe(ERROR_MESSAGES.NO_ITEMS_LABEL);

            // Assert that the "Cart is empty" message is displayed.
            const cartIsEmptyMsg = await (await myCartPage.getCartIsEmptyMessage()).getText();
            expect(cartIsEmptyMsg).toBe(ERROR_MESSAGES.CART_IS_EMPTY_MESSAGE);
           
            // Click on the "Go Shopping" button.
            (await myCartPage.getGoShoppingButton()).click();
        } catch (error) {
                // Log the error using your custom logger
                LOGGER.error(`Error during test execution: ${(error as Error).message}`);
                // Rethrow the error to mark the test as failed
                throw error;
        }
    });


    async function verifyTotalPriceInCart(expectedTotalPrice: number) {
        // Retrieve actual total price from the cart.
        const actualTotalPriceBeforeRemove = await (await myCartPage.getTotalPriceEle()).getText();
        const actualTotalPrice = Number(actualTotalPriceBeforeRemove.replace('$', ''));
      
        // Assert that the actual total price matches the expected total price.
        expect(actualTotalPrice).toEqual(expectedTotalPrice);
      }

})