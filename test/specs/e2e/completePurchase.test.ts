import { ShippingAddressUi } from "../../../resources/customTypes/shippingAddressUi";
import {LoginPage} from '../../../pages/login/loginPage';
import { ProductPage } from "../../../pages/product/productsPage";
import { CardDetails } from "../../../resources/customTypes/cardDetails";
import { AddToCartPage } from "../../../pages/cart/addToCartPage";
import { CheckOutPage } from "../../../pages/checkout/checkoutPage";
import { MyCartPage } from "../../../pages/cart/myCartPage";
import * as cardDetailsJson from "../../../resources/testData/cardDetails.json";
import * as shippingAddressDetailsJson from "../../../resources/testData/shippingAddress.json";
import * as loginDetailsJson from '../../../resources/testData/loginDetails.json';
import { LoginDetails } from '../../../resources/customTypes/loginDetais';
import { FileUtils } from '../../../utilities/file/fileUtils';
import { LoggerHelper, LOGGER } from '../../../utilities/customLogger/loggerHelper';
import { ProductDetails } from '../../../resources/customTypes/productDetails';
import * as productDetailsJson from '../../../resources/testData/productsDetails.json';
import { CartUtilPage } from "../../../commonFunctions/cartUtilPage";


let loginPage : LoginPage;
let productPage: ProductPage;
let addToCartPage: AddToCartPage;
let checkOutPage: CheckOutPage;
let myCartPage: MyCartPage;
let loginDetails: LoginDetails;
let productDetailsList: ProductDetails[];
let cartUtilPage: CartUtilPage;

const specName = 'Test complete e2e purchase scenarios';
describe('Add item to cart', () => {
    before(async () => {
        loginPage = new LoginPage();
        productPage = new ProductPage();
        addToCartPage = new AddToCartPage();
        checkOutPage = new CheckOutPage();
        myCartPage = new MyCartPage();
        LoggerHelper.setupLogger(specName);
        productDetailsList = FileUtils.convertJsonToCustomType(productDetailsJson);
        cartUtilPage = new CartUtilPage();
    });

    it('Add first item to cart', async () => {

        loginDetails = FileUtils.convertJsonToCustomType(loginDetailsJson);
        const shippingAddressDetails: ShippingAddressUi = FileUtils.convertJsonToCustomType(shippingAddressDetailsJson);
        const cardDetails: CardDetails = FileUtils.convertJsonToCustomType(cardDetailsJson);
        await loginPage.login(loginDetails.username, loginDetails.password);
        await cartUtilPage.addToCart(productDetailsList[0].name, 1);
        await addToCartPage.clickCartIcon();
        await myCartPage.clickProceedToCheckoutButton();
        await checkOutPage.enterShippingAddressDetails(shippingAddressDetails);
        await checkOutPage.clickToPaymentButton();
        await checkOutPage.enterCardDetails(cardDetails);
        await checkOutPage.clickReviewOrderButton();
        await checkOutPage.clickPlaceOrderButton();
        const orderConfirmationEle = await checkOutPage.getOrderConfirmationEle();
        const orderConfirmationText = await orderConfirmationEle.getText();
        expect(orderConfirmationText).toBe(' Your order has been dispatched and will arrive as fast as the pony gallops!');
        await checkOutPage.clickContinueShoppingButton();
        
    });
});