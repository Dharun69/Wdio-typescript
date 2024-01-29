import { $ } from "@wdio/globals";


export class WebViewPage {

    private selectors = {

        urlInputField: "~URL input field",
        goToSiteButton: "~Go To Site button",

    }

    async enterUrl(url: string) {
        const urlInputFieldEle = await $(this.selectors.urlInputField);
        await urlInputFieldEle.waitForDisplayed();
        await urlInputFieldEle.setValue(url);
        await driver.hideKeyboard();
    }

    async clickGoToSiteButton() {
        const goToSiteButtonEle = await $(this.selectors.goToSiteButton);
        await goToSiteButtonEle.waitForDisplayed();
        await goToSiteButtonEle.click();
    }

}