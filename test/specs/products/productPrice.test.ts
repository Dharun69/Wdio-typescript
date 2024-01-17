import { LoggerHelper, LOGGER } from '../../../utilities/customLogger/loggerHelper';
import * as assert from 'assert';
import { LoginPage } from "../../../pages/loginPage";
import { ProductPage } from "../../../pages/productsPage";
import { AddToCartPage } from "../../../pages/addToCartPage";
import { MyCartPage } from '../../../pages/myCartPage';
import { LoginDetails } from '../../../resources/customTypes/loginDetais';
import * as loginDetailsJson from '../../../resources/testData/loginDetails.json';
import { FileUtils } from '../../../utilities/fileUtils';


let loginPage : LoginPage;
let productPage: ProductPage;
let addToCartPage: AddToCartPage;
let myCartPage: MyCartPage;
let loginDetails: LoginDetails;

const specName = 'Product price scenarios';
describe("Product Price Comparison", () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        loginPage = new LoginPage();
        productPage = new ProductPage();
        addToCartPage = new AddToCartPage();
        myCartPage = new MyCartPage();
        loginDetails = FileUtils.convertJsonToCustomType(loginDetailsJson);
        await loginPage.login(loginDetails.username, loginDetails.password);
    });

    it("Assert the prices from both the pages", async() => {
        (await productPage.getBoltTshirtProductEle()).click();
        const boltTshirtPrice = await productPage.getBoltTshirtPrice();
        const cartPagePrice = await addToCartPage.getProductPriceLabel();
        assert.equal(boltTshirtPrice, cartPagePrice, 'Product prices do not match');
        await driver.back();

    })

    it(" Add the product to the item and remove",async () => {

        try {
            (await productPage.getBoltTshirtProductEle()).click();
            await addToCartPage.increaseQuantity(3);
            await addToCartPage.addToCart();
            await addToCartPage.clickCartIcon();
            await myCartPage.clickRemoveItem();
            const noItemsLabel = await (await myCartPage.getNoItemsLabel()).getText();
            expect(noItemsLabel).toBe('No Items');
            const cartIsEmptyMsg = await (await myCartPage.getCartIsEmptyMessage()).getText();
            expect(cartIsEmptyMsg).toBe('Oh no! Your cart is empty. Fill it up with swag to complete your purchase.');
            (await myCartPage.getGoShoppingButton()).click();
        } catch (error) {
                // Log the error using your custom logger
                LOGGER.error(`Error during test execution: ${(error as Error).message}`);
                // Rethrow the error to mark the test as failed
                throw error;
        }
        
       

    })
})