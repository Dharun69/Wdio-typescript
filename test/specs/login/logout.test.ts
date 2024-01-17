import {LogoutPage} from '../../../pages/logutPage';
import {LoginPage} from '../../../pages/loginPage';
import { LoginDetails } from '../../../resources/customTypes/loginDetais';
import * as loginDetailsJson from '../../../resources/testData/loginDetails.json';
import { FileUtils } from '../../../utilities/fileUtils';
import { LoggerHelper, LOGGER } from '../../../utilities/customLogger/loggerHelper';


let loginPage : LoginPage;
let logoutPage : LogoutPage;
let loginDetails: LoginDetails;

const specName = 'Test logout scenarios';
describe("Logout to the application", () => {
    before(() => {
        loginPage = new LoginPage();
        logoutPage = new LogoutPage();
        LoggerHelper.setupLogger(specName);
    });
    
    it("should able to login and logout", async () => {
        loginDetails = FileUtils.convertJsonToCustomType(loginDetailsJson);
        await loginPage.login(loginDetails.username, loginDetails.password);
        await logoutPage.logout();
    });
})
