import {LoginPage} from '../../../pages/loginPage';
import { LoggerHelper, LOGGER } from '../../../utilities/customLogger/loggerHelper';
import { LoginDetails } from '../../../resources/customTypes/loginDetais';
import * as loginDetailsJson from '../../../resources/testData/loginDetails.json';
import { FileUtils } from '../../../utilities/fileUtils';


let loginPage : LoginPage;
let loginDetails: LoginDetails;

const specName = 'Test login scenarios';
describe("Login to the application", () => {
    before(() => {
        loginPage = new LoginPage();
        LoggerHelper.setupLogger(specName);
    });
    
    it("should able to login with valid credentials", async () => {
        try {
            LOGGER.info("Starting the test");
            loginDetails = FileUtils.convertJsonToCustomType(loginDetailsJson);
            await loginPage.login(loginDetails.username, loginDetails.password);
            LOGGER.info("Ending the test");
        } catch (error) {
            LOGGER.error(`Error during test execution: ${(error as Error).message}`);
            throw error;
        }
    });
})
