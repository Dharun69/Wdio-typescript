
import { LOGGER } from '../../utilities/customLogger/loggerHelper';

export class KeyActions {

    keycodes = {
        CAMERA: 27,
    }

    async pressKey(keyCode: number) {
        try {
            await driver.pressKeyCode(keyCode);
        } catch (error) {
            LOGGER.error(`Error pressing keycode ${keyCode}\n${error.stack}`);
            throw error;
        }
    }

    async pressCamera(): Promise<void> {
        await this.pressKey(this.keycodes.CAMERA);
    }

}

