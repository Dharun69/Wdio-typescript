import { LoggerHelper } from '../../../utilities/customLogger/loggerHelper';
import { KeyActions } from '../../../utilities/actions/keyActions';


let keyActions: KeyActions;

const specName: string = 'Switching between the apps';


describe(specName, ()=> {

    before(async () => {
        LoggerHelper.setupLogger(specName);
        keyActions = new KeyActions();
    });

    afterEach(async () => {
        await driver.terminateApp("com.saucelabs.mydemoapp.rn");
        await driver.activateApp("com.saucelabs.mydemoapp.rn");
    });

    it('Switch between two apps (activateApp())', async () => {
        const sauceLabAppPackage: string = await driver.getCurrentPackage();
        const sauceLabAppPackageActivity = "com.saucelabs.mydemoapp.rn.MainActivity";
    
        const cameraAppPackage = 'com.android.camera2';
        const cameraAppActivity = "com.android.camera.CameraLauncher";
    
    
        await driver.startActivity(cameraAppPackage, cameraAppActivity);
    
        await keyActions.pressCamera();
        await driver.pause(5000);
    
        await driver.startActivity(sauceLabAppPackage, sauceLabAppPackageActivity);
    
        // Terminating camera apps
        await driver.terminateApp(cameraAppPackage);
    
        await driver.pause(1000);
    });
    

})


