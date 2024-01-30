import { LoggerHelper, LOGGER } from '../../../utilities/customLogger/loggerHelper';
import { LoginPage } from "../../../pages/login/loginPage";
import { ProductPage } from "../../../pages/product/productsPage";
import { AddToCartPage } from "../../../pages/cart/addToCartPage";
import { MyCartPage } from '../../../pages/cart/myCartPage';
import { LoginDetails } from '../../../resources/customTypes/loginDetais';
import * as loginDetailsJson from '../../../resources/testData/loginDetails.json';
import { FileUtils } from '../../../utilities/file/fileUtils';
import { CheckOutPage } from "../../../pages/checkout/checkoutPage";
import * as productDetailsJson from '../../../resources/testData/productsDetails.json';
import { ProductDetails } from '../../../resources/customTypes/productDetails';
import { CartUtilPage } from '../../../commonFunctions/cartUtilPage';
import * as cardDetailsJson from "../../../resources/testData/cardDetails.json";
import * as shippingAddressDetailsJson from "../../../resources/testData/shippingAddress.json";
import { ShippingAddressUi } from "../../../resources/customTypes/shippingAddressUi";
import { CardDetails } from "../../../resources/customTypes/cardDetails";

let loginPage : LoginPage;
let productPage: ProductPage;
let addToCartPage: AddToCartPage;
let myCartPage: MyCartPage;
let loginDetails: LoginDetails;
let productDetailsList: ProductDetails[];
let cartUtilPage: CartUtilPage;
let checkOutPage: CheckOutPage;
let cardDetails: CardDetails;
let shippingAddressUi: ShippingAddressUi;

const specName = 'Add Multiple Product';
describe("Should able to add multiple product", () => {
    before(async () => {
        LoggerHelper.setupLogger(specName);
        loginPage = new LoginPage();
        productPage = new ProductPage();
        addToCartPage = new AddToCartPage();
        myCartPage = new MyCartPage();
        cartUtilPage = new CartUtilPage();
        loginDetails = FileUtils.convertJsonToCustomType(loginDetailsJson);
        productDetailsList = FileUtils.convertJsonToCustomType(productDetailsJson);
        await loginPage.login(loginDetails.username, loginDetails.password);
        checkOutPage = new CheckOutPage();
        shippingAddressUi = FileUtils.convertJsonToCustomType(shippingAddressDetailsJson);
        cardDetails = FileUtils.convertJsonToCustomType(cardDetailsJson);

    });

it("should add multiple products to cart and place the order", async () => {
    try {
        // Product 1
        const product1Quantity = 2;
        await cartUtilPage.addToCart(productDetailsList[0].name, product1Quantity);
        await driver.back();

        // Product 2
        const product2Quantity = 3;
        await cartUtilPage.addToCart(productDetailsList[1].name, product2Quantity);
        await driver.back();

        // Product 3
        const product3Quantity = 1;
        await cartUtilPage.addToCart(productDetailsList[2].name, product3Quantity);
        await driver.back();

    
        // Click on the cart icon.
        await addToCartPage.clickCartIcon();
        const cartItems = await cartUtilPage.getCartItems();
        LOGGER.info(`Number of cart items found: ${cartItems.length}`);

        LOGGER.info(`Actual Cart Items:", ${cartItems}`);
        expect(cartItems.length).toBe(3);

        expect(cartItems).toContain(productDetailsList[0].name);
        expect(cartItems).toContain(productDetailsList[1].name);
        expect(cartItems).toContain(productDetailsList[2].name);

        await myCartPage.clickProceedToCheckoutButton();
        await checkOutPage.enterShippingAddressDetails(shippingAddressUi);
        await checkOutPage.clickToPaymentButton();
        await checkOutPage.enterCardDetails(cardDetails);
        await checkOutPage.clickReviewOrderButton();
        await checkOutPage.clickPlaceOrderButton();
        const orderConfirmationEle = await checkOutPage.getOrderConfirmationEle();
        const orderConfirmationText = await orderConfirmationEle.getText();
        expect(orderConfirmationText).toBe(' Your order has been dispatched and will arrive as fast as the pony gallops!');
        await checkOutPage.clickContinueShoppingButton();

    } catch (error) {
        // Log and rethrow the error
        LOGGER.error(`Error during test execution: ${(error as Error).message}`);
        throw error;
    }
});

})