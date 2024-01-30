


import { LoggerHelper, LOGGER } from '../../../utilities/customLogger/loggerHelper';
import { LoginPage } from "../../../pages/login/loginPage";
import { ProductPage } from "../../../pages/product/productsPage";
import { AddToCartPage } from "../../../pages/cart/addToCartPage";
import { MyCartPage } from '../../../pages/cart/myCartPage';
import { LoginDetails } from '../../../resources/customTypes/loginDetais';
import * as loginDetailsJson from '../../../resources/testData/loginDetails.json';
import { FileUtils } from '../../../utilities/file/fileUtils';
import * as productDetailsJson from '../../../resources/testData/productsDetails.json';
import { ProductDetails } from '../../../resources/customTypes/productDetails';
import { CartUtilPage } from '../../../commonFunctions/cartUtilPage';


const NO_ITEMS_LABEL = 'No Items';
const CART_IS_EMPTY_MESSAGE = 'Oh no! Your cart is empty. Fill it up with swag to complete your purchase.';


let loginPage : LoginPage;
let addToCartPage: AddToCartPage;
let myCartPage: MyCartPage;
let loginDetails: LoginDetails;
let productDetailsList: ProductDetails[];
let cartUtilPage: CartUtilPage;

const specName = 'Empty Cart';
describe("Should able to empty the cart", () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        loginPage = new LoginPage();
        addToCartPage = new AddToCartPage();
        myCartPage = new MyCartPage();
        cartUtilPage = new CartUtilPage();
        loginDetails = FileUtils.convertJsonToCustomType(loginDetailsJson);
        productDetailsList = FileUtils.convertJsonToCustomType(productDetailsJson);
        await loginPage.login(loginDetails.username, loginDetails.password);
    });

    it("should be able to empty cart",async () => {

        try {
            const addedQuantity = 1;
            const initialQuantity = 1;
            await cartUtilPage.addToCart(productDetailsList[0].name, addedQuantity);

            // Calculate expected total price.
            const expectedTotalPrice = productDetailsList[0].price * (initialQuantity + addedQuantity);

            // Click on the cart icon.
            await addToCartPage.clickCartIcon();

            // Verify the total price in the cart.
            await cartUtilPage.verifyTotalPriceInCart(expectedTotalPrice);

            // Click on the "Remove Item" button.
            await myCartPage.clickRemoveItem();

            // Assert that the "No Items" label is displayed.
            const noItemsLabel = await (await myCartPage.getNoItemsLabel()).getText();
            expect(noItemsLabel).toBe(NO_ITEMS_LABEL);

            // Assert that the "Cart is empty" message is displayed.
            const cartIsEmptyMsg = await (await myCartPage.getCartIsEmptyMessage()).getText();
            expect(cartIsEmptyMsg).toBe(CART_IS_EMPTY_MESSAGE);
           
            (await myCartPage.getGoShoppingButton()).click();
        } catch (error) {
                // Log the error using your custom logger
                LOGGER.error(`Error during test execution: ${(error as Error).message}`);
                // Rethrow the error to mark the test as failed
                throw error;
        }
    });

})