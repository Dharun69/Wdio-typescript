export class LeftSideMenuScreenPage {

    private selectors = {
        loginButtonFromSideMenu: "~menu item log in",
        menuItemLogOut: '~menu item log out',
        webViewButton: "~menu item webview",
        qrCodeScanner: "~menu item qr code scanner"
    }

    public async getLoginButtonFromSideMenu() {
        return await $(this.selectors.loginButtonFromSideMenu);
    }

    public async getMenuItemLogOutEle() {
        return await $(this.selectors.menuItemLogOut);
    }

    async clickMenuItemWebview() {
        const menuItemWebviewEle = await $(this.selectors.webViewButton);
        await menuItemWebviewEle.waitForDisplayed();
        await menuItemWebviewEle.click();
    }

    async clickQRScanner() {
        const qrScannerEle = await $(this.selectors.qrCodeScanner);
        await qrScannerEle.waitForDisplayed();
        await qrScannerEle.click();
    }
}