import { ShippingAddressUi } from "../../../resources/customTypes/shippingAddressUi";
import {LoginPage} from '../../../pages/loginPage';
import { ProductPage } from "../../../pages/productsPage";
import { CardDetails } from "../../../resources/customTypes/cardDetails";
import { AddToCartPage } from "../../../pages/addToCartPage";
import { CheckOutPage } from "../../../pages/checkoutPage";
import { MyCartPage } from "../../../pages/myCartPage";
import * as cardDetailsJson from "../../../resources/testData/cardDetails.json";
import * as shippingAddressDetailsJson from "../../../resources/testData/shippingAddress.json";
import * as loginDetailsJson from '../../../resources/testData/loginDetails.json';
import { LoginDetails } from '../../../resources/customTypes/loginDetais';
import { FileUtils } from '../../../utilities/fileUtils';
import { LoggerHelper, LOGGER } from '../../../utilities/customLogger/loggerHelper';



let loginPage : LoginPage;
let productPage: ProductPage;
let addToCartPage: AddToCartPage;
let checkOutPage: CheckOutPage;
let myCartPage: MyCartPage;
let loginDetails: LoginDetails;


const specName = 'Test complete e2e purchase scenarios';
describe('Add item to cart', () => {
    before(async () => {
        loginPage = new LoginPage();
        productPage = new ProductPage();
        addToCartPage = new AddToCartPage();
        checkOutPage = new CheckOutPage();
        myCartPage = new MyCartPage();
        LoggerHelper.setupLogger(specName);
    });

    it('Add first item to cart', async () => {

        loginDetails = FileUtils.convertJsonToCustomType(loginDetailsJson);
        const shippingAddressDetails: ShippingAddressUi = FileUtils.convertJsonToCustomType(shippingAddressDetailsJson);
        const cardDetails: CardDetails = FileUtils.convertJsonToCustomType(cardDetailsJson);
        await loginPage.login(loginDetails.username, loginDetails.password);
        await productPage.clickOnFirstProduct();
        await addToCartPage.addToCart();
        await addToCartPage.clickCartIcon();
        await myCartPage.clickProceedToCheckoutButton();
        await checkOutPage.enterShippingAddressDetails(shippingAddressDetails);
        await checkOutPage.clickToPaymentButton();
        await checkOutPage.enterCardDetails(cardDetails);
        await checkOutPage.clickReviewOrderButton();
        await checkOutPage.clickPlaceOrderButton();
        await checkOutPage.clickContinueShoppingButton();
        
    });
});